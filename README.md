# 茄子 X1 · 3D 互动演示

> ### 数万元级实体情感交互机器人,全球免费申领。
> **OpenClaw 在虚拟世界长出了手和脚,我们在物理世界长出了头和手。**
> **黄仁勋说物理 AI 的 ChatGPT 时刻来了,就是我们。**

> **线下全球实体交付中心 · 全国陆续开放(敬请期待)**
>
> 我们全国线下智能机器人交付店。正在陆续落地、装修筹备中。后续将逐步公开全国各城市门店地址,欢迎国内用户线下实地到访,沉浸式体验情感交互实体机器人的全维度交互能力。
>
> 线下实景体验、真人交互实测、全功能现场演示,敬请期待。

> 项目官网:[CoreXbot.ai](https://CoreXbot.ai)
>
> 场景演示:[TikTok](https://www.tiktok.com/@alankwok516/video/7660736349024029959?is_from_webapp=1&sender_device=pc) ｜ [YouTube Shorts](https://youtube.com/shorts/mXssJ0xu4No?feature=share)
>
> 在线演示 & 申领登记页:https://corefusionbot.github.io/qiezi-x1-3d-demos/(3D 演示入口 + 就地填写申领表单)
>
> 免费领取机器人说明:[图文在线预览(双语 5 页)](#免费领取机器人说明双语图文预览) ｜ [下载原始 PDF](https://raw.githubusercontent.com/corefusionbot/qiezi-x1-3d-demos/main/docs/free-robot-guide-bilingual.pdf)

<p align="center">
  <a href="https://forms.gle/UL3ojft8bHjyTcW58" target="_blank" rel="noopener"><img src="assets/apply-badge.svg" alt="立即申领登记 · Apply Now" width="300" /></a>
</p>
<p align="center"><sub>免费申领登记:姓名 · 国家/地区 · 邮箱 · 联系电话(点击上方按钮跳转表单;中国大陆访问 Google 需自备网络环境)</sub></p>

<p align="center">
  <img src="assets/showcase-3.jpg" width="30%" alt="茄子 X1 结构外壳样机" />
  <img src="assets/showcase-2.jpg" width="30%" alt="茄子 X1 仿生头颈样机" />
  <img src="assets/showcase-1.jpg" width="30%" alt="茄子 X1 概念形象" />
</p>

## 联系方式

**海外联系:** AlanKwok@coreXbot.ai

**国内联系:** AlanKwok@corefusion.cn ｜ AlanKwok@corefusionbot.com

两个可离线运行的交互演示(算法/UI 无需联网;3D 头模需自备,见下),打开后先看落地页 `index.html`:

| 页面 | 内容 |
|---|---|
| `index.html` | **落地页**:两个演示的入口卡片 + 诚实边界说明(中/EN 切换) |
| `servo18-console.html` | **18 路舵机控制模拟台**:3D 女性头模实时表情、7+10 情绪预设、表情变体/自然度/心境层/对话迁移/遥测健康/轨迹三 profile、协议 v2 帧字节预览、急停-hold 全语义 |
| `arm-console.html` | **双臂 8 路控制台**:同款 3D 人物骨骼驱动、7 手势(挥手/指向/张臂/举手/鼓掌/敬礼/归位)、协调层(同步步进/预备跟随/颈-表情提示)、姿态互锁、镜像/急停、协议 v2 帧预览 |

## 3D 模型(需自备,本仓库不随附)

`models/` 目录本仓库**不包含** `avatar.glb`(第三方 CC0 女性头模,~35MB,未随仓库分发)。
按 [`models/README.md`](models/README.md) 的要求自行放置一个兼容 GLB 到 `models/avatar.glb` 才能看到 3D 效果——
没有模型时,`servo18-console.html` 会提示"头模未随附"且 3D 区域留空,`arm-console.html` 会自动回退到 2D 火柴人
示意;两页的滑杆/情绪/协议帧/手势等**算法演示不受影响**。

## 启动(Windows,零依赖)

**双击 `start-demo.bat`** —— 自动起本地服务(端口 8092)并打开浏览器(落地页)。
两个控制台顶部左上角可跳回落地页。关闭:关掉黑色命令行窗口即可。

- 端口被占用时:`powershell -ExecutionPolicy Bypass -File serve.ps1 8093`,再手动打开 `http://127.0.0.1:8093/`。
- 有 Python 的机器也可用:`python -m http.server 8092` 后打开同上地址。
- 不能直接双击 HTML 文件打开(浏览器对 file:// 拦截 ES 模块与模型加载,必须经本地 http)。

## 包内容与许可

- `vendor/` — three.js 0.160.0 本地副本(MIT 许可)及其加载器/转码器,离线渲染 3D。
- `realism.js` — 渲染级拟真化共享模块(皮肤物性/湿润角膜/程序化毛孔法线)。
- `servo18-console.html` / `arm-console.html` 为原项目 `avatar_sim/` 同名页面的离线化副本(CDN 引用改为本地 vendor,
  移除了需联网的回退头模;算法常量与原项目真值一致,快照日期见下)。`index.html` 落地页为本仓库专属页面
  (源文件 `avatar_sim/demos-landing.html`,打包时改名为 `index.html`)。

本仓库原创部分(`index.html`/`servo18-console.html`/`arm-console.html`/`realism.js`/`serve.ps1` 等)采用
[Apache License 2.0](LICENSE) 开源;`vendor/`(three.js,MIT)保留其上游许可证,不受本仓库 LICENSE 影响。

## 免费领取机器人说明(双语图文预览)

> 逐页图文预览(所有访客/手机均可直接查看,无需依赖 GitHub 的 PDF 预览器);需原始文件见 [下载原始 PDF](https://raw.githubusercontent.com/corefusionbot/qiezi-x1-3d-demos/main/docs/free-robot-guide-bilingual.pdf)。

<p align="center">
  <img src="docs/pages/guide-01.png" width="80%" alt="免费领取机器人说明 第1页" />
  <img src="docs/pages/guide-02.png" width="80%" alt="免费领取机器人说明 第2页" />
  <img src="docs/pages/guide-03.png" width="80%" alt="免费领取机器人说明 第3页" />
  <img src="docs/pages/guide-04.png" width="80%" alt="免费领取机器人说明 第4页" />
  <img src="docs/pages/guide-05.png" width="80%" alt="免费领取机器人说明 第5页" />
</p>

## 诚实边界

- 全部为**软件模拟**:未连接真实硬件,舵机角度/协议帧/遥测均为同式软件镜像;
  3D 人物为示意级骨骼驱动(方向对齐法,无碰撞体/前臂扭转控制)。
- **不随附 3D 头模文件**(见上一节);其余部分是原项目仓库某时点的**快照**(2026-07-08),后续原项目更新
  不会自动同步到本仓库。

—— 茄子 X1 项目 · 3D 演示子集(生成方式见原项目仓库 `docs/X1整机开发方案.md` §4)
