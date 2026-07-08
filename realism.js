// 茄子 X1 · 3D 渲染级拟真化共享模块(servo18-console / face3d-demo / avatar3d 三页共用)
// 单一真值源:灯光配方、材质升级、程序化毛孔法线全部在此,页面只 import 调用。
// 纯演示层参数(不涉及后端真值,不入 check_alignment);2026-07-04 经多轮实机截图调参定稿。
import * as THREE from 'three';

/* 拟真化三点光:暖主光带 PCFSoft 软阴影 + 冷补光 + 冷轮廓光。
   注意:主光保持默认 target(原点)——光线自上方斜掠才有面部立体光影;
   把 target 指到头部会变成正面平光(踩坑记录)。 */
export function addRealismLights(scene) {
  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x2a2018, 0.3));
  const key = new THREE.DirectionalLight(0xffe7d2, 2.9); key.position.set(1.1, 1.9, 1.5);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.015;
  key.shadow.camera.near = 0.5; key.shadow.camera.far = 5;
  key.shadow.camera.left = key.shadow.camera.bottom = -0.6;
  key.shadow.camera.right = key.shadow.camera.top = 0.6;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x9db8ff, 0.6); fill.position.set(-1.7, 0.9, 1.1); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xcfe6ff, 1.0); rim.position.set(-0.4, 1.6, -2.1); scene.add(rim);
}

/* 渲染器拟真化设置:ACES 色调映射 + 软阴影(页面创建 renderer 后调用一次) */
export function setupRealismRenderer(renderer) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

/* 程序化皮肤细节:毛孔高度场→平铺法线贴图。
   本地 mpfb 头模无法线贴图,微表面缺失是"塑料感"主因——此贴图为质变项。 */
export function makePoreNormalTexture(size = 512, strength = 2.2, repeat = 14) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const h = new Float32Array(size * size);
  for (let i = 0; i < h.length; i++) h[i] = (Math.random() - 0.5) * 0.10;   // 细噪声底
  for (let k = 0; k < size * size / 55; k++) {                              // 随机小凹坑=毛孔
    const cx = Math.random() * size, cy = Math.random() * size, r = 0.7 + Math.random() * 1.5;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const x = ((cx + dx + size) % size) | 0, y = ((cy + dy + size) % size) | 0;
      const d = Math.hypot(dx, dy); if (d < r) h[y * size + x] -= 0.30 * (1 - d / r);
    }
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {           // 高度→切线空间法线
    const l = h[y * size + (x - 1 + size) % size], r2 = h[y * size + (x + 1) % size];
    const u = h[((y - 1 + size) % size) * size + x], d = h[((y + 1) % size) * size + x];
    let nx = (l - r2) * strength, ny = (u - d) * strength, nz = 1;
    const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
    const i = (y * size + x) * 4;
    img.data[i] = (nx * 0.5 + 0.5) * 255; img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
    img.data[i + 2] = (nz * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat);
  return t;
}

/* 标准材质→物性材质。
   踩坑记录:不能用 MeshPhysicalMaterial.copy(标准材质)——copy 会读源上不存在的
   物性字段(clearcoatNormalScale 等)抛 TypeError,必须手动搬运共有属性。 */
export function toPhysicalMat(mesh) {
  const m = mesh.material; if (!m || m.isMeshPhysicalMaterial) return m;
  const p = new THREE.MeshPhysicalMaterial({
    name: m.name, color: m.color ? m.color.clone() : undefined, map: m.map,
    normalMap: m.normalMap, roughness: m.roughness, metalness: m.metalness,
    roughnessMap: m.roughnessMap, metalnessMap: m.metalnessMap, aoMap: m.aoMap,
    emissive: m.emissive ? m.emissive.clone() : undefined, emissiveMap: m.emissiveMap,
    alphaTest: m.alphaTest, transparent: m.transparent, opacity: m.opacity,
    side: m.side, alphaMap: m.alphaMap,
  });
  if (m.normalScale) p.normalScale.copy(m.normalScale);
  mesh.material = p; return p;
}

let poreTex = null;   // 惰性单例:仅在首个匹配到皮肤的模型加载时生成一次

/* 按材质名分类升级(本地 mpfb 头模;facecap 等回退源匹配不到则只开阴影)。
   踩坑记录:①头发保留原标准材质只调粗糙度——转物性或调低 alphaTest 都会出瑕疵
   (alphaTest 低于 glTF 原裁剪值会放出半透明浅色发丝);②头顶浅色块是该资产自带的
   发际头皮纹理,非渲染 bug(四象限二分确认)。 */
export function enhanceRealism(root) {
  root.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = true; o.receiveShadow = true;
    const n = ((o.material && o.material.name) || '') + ' ' + o.name;
    if (/body/i.test(n)) {                     // 皮肤:sheen 近似次表面 + 程序化毛孔法线
      const p = toPhysicalMat(o);
      p.roughness = 0.58; p.sheen = 0.12; p.sheenRoughness = 0.8;
      p.sheenColor = new THREE.Color(0xffb9a0);
      p.envMapIntensity = 0.55; p.specularIntensity = 0.55;
      if (!poreTex) poreTex = makePoreNormalTexture();
      p.normalMap = poreTex; p.normalScale = new THREE.Vector2(0.4, 0.4);
    } else if (/high-?poly/i.test(n)) {        // 眼:湿润角膜 + 压灰防虹膜发红
      const p = toPhysicalMat(o);
      p.roughness = 0.12; p.clearcoat = 1.0; p.clearcoatRoughness = 0.1;
      p.envMapIntensity = 0.85; p.color = new THREE.Color(0xb9c4cf);
    } else if (/eyebrow/i.test(n)) {           // 眉毛:深色半透,减轻几何硬感
      o.material.color = new THREE.Color(0x2b1d12); o.material.roughness = 0.95;
      o.material.transparent = true; o.material.opacity = 0.92; o.castShadow = false;
    } else if (/eyelash/i.test(n)) {           // 睫毛
      o.material.color = new THREE.Color(0x14100c); o.material.roughness = 0.9;
      o.material.transparent = true; o.material.opacity = 0.95; o.castShadow = false;
    } else if (/ponytail|hair/i.test(n)) {     // 头发:保留原材质,只调粗糙度
      o.material.roughness = 0.6; o.material.envMapIntensity = 0.5;
    } else if (/teeth/i.test(n)) {             // 牙:釉质
      const p = toPhysicalMat(o);
      p.roughness = 0.15; p.clearcoat = 0.6; p.clearcoatRoughness = 0.15;
    } else if (/tongue/i.test(n)) {
      const p = toPhysicalMat(o);
      p.roughness = 0.35; p.clearcoat = 0.5;
    } else if (/casualsuit|cloth/i.test(n)) {  // 衣物:亚光
      o.material.roughness = 0.92;
    }
  });
}
