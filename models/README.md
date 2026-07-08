# models/

本仓库**不随附** 3D 头模文件(`avatar.glb`)。

如需查看 3D 效果,请自行放置一个兼容的 GLB 模型到本目录,命名为 `avatar.glb`:

- 需含 ARKit-52 blendshape(morph target 命名遵循 ARKit 标准,如 `jawOpen`/`mouthSmileLeft` 等)
- 需含 `Head`/`Neck` 骨骼(颈部驱动)与 `LeftEye`/`RightEye` 骨骼(眼神驱动,可选)
- 双臂控制台(`arm-console.html`)额外需要全身骨架(`LeftShoulder`/`LeftArm`/`LeftForeArm`/`LeftHand` 等 Mixamo 式命名,右侧同名对称)

没有放置模型时:
- `servo18-console.html` 会显示"头模加载失败"提示,3D 区域为空(无 2D 回退)
- `arm-console.html` 会自动回退到 2D 火柴人示意,不影响功能演示

两个页面驱动的算法逻辑(表情合成、协议帧、限速、手势插值等)均不依赖模型本身,纯算法演示可正常查看
控制台的滑杆/数值/协议帧预览部分。
