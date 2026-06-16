# 《筑书》UI素材需求清单

## 一、项目概述

基于新拟物主义（Neomorphism）风格，打造极简、优雅的古建筑文化博物馆移动端网站。

### 设计风格要点
- **配色**：温暖中性色调，奶油白、米色、浅灰、金色点缀
- **质感**：柔和光影、微妙阴影、圆润边角
- **风格**：极简主义、新拟物风格、优雅克制

---

## 二、按钮与交互元素

### 2.1 主要按钮（Primary Button）
| 元素 | 尺寸 | 用途 | 风格要求 |
|------|------|------|----------|
| 主按钮 | 全屏宽度 | 开始游览、提交预约等 | 渐变背景（暖棕→金色），圆角16px，柔和阴影 |
| 次按钮 | 自适应 | 返回、取消等 | 白色背景，浅灰边框，圆角12px |
| 图标按钮 | 44x44px | 导航、操作 | 圆形，白色背景，阴影效果 |

### 2.2 按钮图标需求（Font Awesome已覆盖）
- `fa-arrow-right` - 前进
- `fa-arrow-left` - 返回
- `fa-stamp` - 盖章
- `fa-map-marker` - 地点
- `fa-user-graduate` - 学徒
- `fa-book-open` - 书本
- `fa-route` - 路线
- `fa-home` - 首页
- `fa-building-o` - 展馆
- `fa-passport` - 护照
- `fa-calendar` - 预约
- `fa-info` - 关于

---

## 三、图片素材需求

### 3.1 展馆图片（8张）
| 编号 | 派系 | 尺寸 | 风格要求 | AI提示词参考 |
|------|------|------|----------|--------------|
| 1 | 京派 | 800x640px | 故宫或四合院，对称构图，红墙黄瓦 | `Chinese traditional architecture, Beijing style, Forbidden City, red walls, yellow roof tiles, symmetrical composition, minimalist photography, soft morning light, architectural details` |
| 2 | 晋派 | 800x640px | 山西大院，砖雕木雕，深宅大院 | `Chinese courtyard house, Shanxi style, traditional courtyard, exquisite wood carving, brick architecture, warm sunset light, minimalist composition` |
| 3 | 苏派 | 800x640px | 苏州园林，小桥流水，亭台楼阁 | `Chinese classical garden, Suzhou style, tranquil pond, traditional pavilion, stone bridge, misty morning, minimalist landscape photography` |
| 4 | 徽派 | 800x640px | 白墙黛瓦，马头墙，水墨意境 | `Huizhou architecture, white walls black tiles, horse-head walls, traditional village, ink painting style, minimalist, foggy atmosphere` |
| 5 | 闽派 | 800x640px | 土楼圆形建筑，客家民居 | `Fujian Tulou, round earth building, Hakka architecture, unique circular structure, aerial view, minimalist photography, soft light` |
| 6 | 粤派 | 800x640px | 岭南骑楼，镬耳屋 | `Lingnan architecture, Cantonese style, qilou arcade, wok ear roof, vibrant colors, minimalist composition` |
| 7 | 川派 | 800x640px | 吊脚楼，依山傍水 | `Sichuan stilt house, wooden architecture, mountain village, riverside, misty mountains, minimalist landscape` |
| 8 | 海派 | 800x640px | 石库门，老上海风情 | `Shanghai shikumen, art deco style, old Shanghai architecture, nostalgic atmosphere, minimalist photography` |

### 3.2 游览路线图
| 元素 | 尺寸 | 风格要求 | AI提示词参考 |
|------|------|----------|--------------|
| 路线图 | 800x400px | 简约地图风格，标注8个地点 | `minimalist travel map, Chinese architecture journey, 8 locations marked, elegant line art, warm color palette, modern flat design, journey path visualization` |

### 3.3 印章图标（8个）
| 元素 | 尺寸 | 风格要求 | AI提示词参考 |
|------|------|----------|--------------|
| 派系印章 | 128x128px | 传统印章风格，每个派系一个 | `Chinese traditional seal stamp, minimalist design, calligraphy style, elegant, each with unique character, red ink on white background` |

### 3.4 背景装饰
| 元素 | 尺寸 | 风格要求 | AI提示词参考 |
|------|------|----------|--------------|
| 纹理背景 | 1200x1200px | 宣纸/书卷纹理，淡雅 | `Chinese rice paper texture, subtle pattern, minimalist background, warm beige tone, vintage paper, elegant` |

---

## 四、配色方案

### 主色调
| 颜色名 | 色值 | 用途 |
|--------|------|------|
| Paper | #fafafa | 页面背景 |
| Cream | #f5f5f0 | 卡片背景 |
| Sand | #e8e4dc | 分隔线/次要背景 |
| Wood | #4a4a4a | 正文文字 |
| Charcoal | #2d2d2d | 标题文字 |
| Warm | #8b7355 | 主色调（棕） |
| Gold | #c9a962 | 强调色（金） |
| Soft Gold | #d4b87a | 次强调色 |
| Mint | #8fb9a8 | 成功状态 |
| Stone | #9a9a9a | 辅助文字 |

### 阴影配置
- **Soft Shadow**: `0 4px 20px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
- **Elevated Shadow**: `0 8px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)`
- **Button Shadow**: `0 4px 14px rgba(139, 115, 85, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)`

---

## 五、字体配置

### 中文字体
- 主标题：SF Pro Display / 思源黑体 Light
- 正文字体：SF Pro Display / 思源黑体 Regular
- 字号范围：12px - 48px

### 字重使用
- 标题：300 (Light)
- 正文：400 (Regular)
- 强调：500 (Medium)

---

## 六、圆角配置

| 元素 | 圆角值 |
|------|--------|
| 卡片 | 20px |
| 按钮 | 16px |
| 图片/头像 | 12px |
| 小圆点 | 50% |

---

## 七、动画效果

### 已实现动画
1. **淡入** - 页面切换
2. **上滑** - 元素入场
3. **缩放** - 卡片展示
4. **弹跳** - 印章盖章
5. **脉冲** - 加载提示

### 交互反馈
- 按钮按下：缩放0.95 + 阴影内凹
- 卡片悬停：上移4px + 阴影增强
- 印章收集：缩放动画

---

## 八、素材文件结构

```
assets/
├── pavilions/          # 展馆图片
│   ├── 京派.jpg
│   ├── 晋派.jpg
│   ├── 苏派.jpg
│   ├── 徽派.jpg
│   ├── 闽派.jpg
│   ├── 粤派.jpg
│   ├── 川派.jpg
│   └── 海派.jpg
├── journey/            # 游览路线
│   └── 学徒游览路线.png
├── stamps/             # 印章图标
│   ├── stamp-京派.png
│   ├── stamp-晋派.png
│   ├── stamp-苏派.png
│   ├── stamp-徽派.png
│   ├── stamp-闽派.png
│   ├── stamp-粤派.png
│   ├── stamp-川派.png
│   └── stamp-海派.png
└── textures/           # 纹理背景
    └── paper-texture.png
```

---

## 九、AI生图提示词模板

### 通用结构
```
[主题], [风格], [构图], [光线], [氛围], [细节描述], minimalist, elegant, high quality
```

### 示例 - 京派建筑
```
Chinese traditional architecture, Beijing Forbidden City style, red walls and yellow roof tiles, symmetrical composition, soft morning light, minimalist architectural photography, clean background, professional lighting, high detail, elegant aesthetic
```

### 示例 - 印章设计
```
Chinese traditional seal stamp design, single Chinese character, red ink on white background, calligraphy style, minimalist, elegant, high contrast, professional graphic design
```

---

## 十、待补充素材清单

| 序号 | 素材名称 | 类型 | 尺寸 | 状态 |
|------|----------|------|------|------|
| 1 | 京派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 2 | 晋派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 3 | 苏派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 4 | 徽派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 5 | 闽派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 6 | 粤派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 7 | 川派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 8 | 海派展馆图 | 图片 | 800x640px | ✅ 已有 |
| 9 | 游览路线图 | 图片 | 800x400px | ⚠️ 需要优化 |
| 10 | 印章图标(8个) | 图标 | 128x128px | ❌ 缺失 |
| 11 | 背景纹理 | 图片 | 1200x1200px | ❌ 缺失 |

---

## 十一、设计规范总结

### 核心原则
1. **极简至上**：减少视觉干扰，突出内容本身
2. **柔和质感**：避免尖锐边缘和强烈对比
3. **温暖色调**：使用大地色系营造舒适感
4. **优雅动效**：动画细腻不夸张

### 移动端适配
- 最小触控区域：44px
- 文字最小字号：12px
- 间距单位：8px倍数
- 圆角最小：8px

---

*文档版本: 1.0*  
*创建日期: 2026年6月*  
*适用项目: 筑书 - 中国古建筑八大派系数字展馆*
