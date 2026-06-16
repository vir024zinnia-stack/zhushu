# 《筑书》学徒游览路线实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 以建筑学徒视角，通过京晋苏徽闽粤川海游览路线，串联八大派系展馆，打造沉浸式文化寻访体验。

**Architecture:** 
- 单页面HTML应用，采用Tailwind CSS进行移动端优化
- 使用localStorage管理游览进度和印章收集状态
- 通过Tab切换实现页面导航，增强用户体验

**Tech Stack:** 
- HTML5 + Tailwind CSS + Vanilla JavaScript
- Font Awesome图标库
- LocalStorage数据持久化

---

## 文件结构

```
c:\Users\1\Desktop\zhushu\
├── zhushu.html                    # 主网站文件
└── assets\
    ├── pavilions\                 # 展馆图片
    │   ├── 京派.jpg
    │   ├── 晋派.jpg
    │   ├── 苏派.jpg
    │   ├── 徽派.jpg
    │   ├── 闽派.jpg
    │   ├── 粤派.jpg
    │   ├── 川派.jpg
    │   └── 海派.jpg
    ├── journey\                   # 游览路线相关
    │   └── 学徒游览路线.png
    ├── stamps\                    # 印章设计（预留）
    └── common\                    # 公共素材（预留）
```

---

## 任务清单

### 任务 1: 优化首页 - 添加学徒故事引导卡片

**Files:**
- Modify: `zhushu.html:78-196` (首页区域)

**Steps:**

- [ ] **Step 1: 添加学徒故事引导卡片**

在首页Hero区域下方，功能入口上方添加：

```html
<!-- 学徒故事引导卡片 -->
<div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 shadow-md">
    <div class="flex items-center mb-4">
        <div class="w-14 h-14 bg-vermilion/10 rounded-full flex items-center justify-center mr-4">
            <i class="fa fa-user-graduate text-vermilion text-2xl"></i>
        </div>
        <div>
            <h4 class="font-bold text-lg">建筑学徒的寻访之旅</h4>
            <p class="text-sm text-wood/70">踏上寻找八大派系建筑奥秘的旅程</p>
        </div>
    </div>
    <p class="text-sm text-wood/80 leading-relaxed mb-4">
        一位年轻的建筑学徒，怀揣着对传统建筑的热爱，从皇城北京出发，
        穿越晋商大院、苏州园林、徽派古村、闽南土楼、岭南碉楼、
        川西吊脚楼，最终抵达海派上海。这不仅是一段建筑之旅，
        更是一次文化的寻根与传承。
    </p>
    <button onclick="startJourney()" class="w-full bg-vermilion text-white py-3 rounded-xl font-medium flex items-center justify-center">
        <i class="fa fa-play mr-2"></i>
        开始游览
    </button>
</div>
```

- [ ] **Step 2: 在功能入口下方添加游览地图展示**

```html
<!-- 游览地图展示 -->
<div class="bg-white rounded-2xl p-4 mb-6 shadow-md">
    <h4 class="font-bold mb-3 flex items-center">
        <i class="fa fa-map text-vermilion mr-2"></i>
        学徒游览路线
    </h4>
    <div class="relative rounded-xl overflow-hidden mb-3">
        <img src="assets/journey/学徒游览路线.png" 
             alt="学徒游览路线图" 
             class="w-full h-auto">
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-3">
            <p class="text-white text-sm font-medium">京 → 晋 → 苏 → 徽 → 闽 → 粤 → 川 → 海</p>
        </div>
    </div>
    <p class="text-xs text-wood/70 text-center">
        从皇城北京到海派上海 · 跨越南北的建筑文化之旅
    </p>
</div>
```

- [ ] **Step 3: 添加开始游览JavaScript函数**

在 `<script>` 标签内添加：

```javascript
function startJourney() {
    // 重置游览进度到第一站
    localStorage.setItem('currentStation', 0);
    switchTab('pavilions');
}
```

- [ ] **Step 4: 测试首页展示效果**

打开浏览器检查：
- 学徒故事卡片是否正常显示
- 游览地图图片是否加载成功
- "开始游览"按钮是否正常工作

---

### 任务 2: 更新展馆页面 - 按游览顺序排列

**Files:**
- Modify: `zhushu.html:198-457` (展馆页区域)

**Steps:**

- [ ] **Step 1: 调整展馆卡片顺序**

确保展馆按京晋苏徽闽粤川海顺序排列，每个卡片添加：

1. 顺序编号标识（第 X/8 站）
2. 旅程进度指示
3. 展馆间导航箭头

修改每个展馆卡片HTML结构，例如：

```html
<div class="pavilion-card bg-white rounded-2xl shadow-lg overflow-hidden mb-6" 
     data-station="1" 
     data-pavilion="京派">
    
    <!-- 顺序编号标识 -->
    <div class="bg-vermilion text-white px-4 py-2 text-sm font-medium">
        <i class="fa fa-map-marker mr-2"></i>
        第 1/8 站 · 京派
    </div>
    
    <img src="assets/pavilions/京派.jpg" 
         alt="京派建筑" 
         class="w-full h-48 object-cover">
    
    <!-- 展馆内容 -->
    <div class="p-6">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h3 class="text-2xl font-bold">京派</h3>
                <p class="text-wood/70">以北京为中心</p>
            </div>
            <span class="bg-vermilion/10 text-vermilion px-3 py-1 rounded-full text-sm">
                皇城气象
            </span>
        </div>
        
        <!-- 旅程提示 -->
        <div class="bg-amber-50 rounded-lg p-3 mb-4 text-sm">
            <p class="text-amber-800">
                <i class="fa fa-location-arrow mr-1"></i>
                起点站 · 下一站：晋派
            </p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-medium mb-2">核心特征</h4>
            <p class="text-sm text-wood/80">气势恢宏、对称严谨、红墙黄瓦</p>
        </div>
        
        <div class="mb-6">
            <h4 class="font-medium mb-2">代表建筑</h4>
            <p class="text-sm text-wood/80">故宫、天坛、四合院</p>
        </div>
        
        <button onclick="stampPavilion('京派', 1)" 
                class="w-full bg-vermilion text-white py-3 rounded-xl font-medium active:bg-vermilion/90 transition-colors">
            <i class="fa fa-stamp mr-2"></i>
            盖章打卡
        </button>
    </div>
    
    <!-- 展馆间导航 -->
    <div class="flex justify-between p-4 bg-paper border-t">
        <button onclick="prevPavilionFrom(1)" class="text-vermilion">
            <i class="fa fa-chevron-left mr-1"></i>
            上一站
        </button>
        <span class="text-wood/50">1 / 8</span>
        <button onclick="nextPavilionFrom(1)" class="text-vermilion">
            下一站
            <i class="fa fa-chevron-right ml-1"></i>
        </button>
    </div>
</div>
```

- [ ] **Step 2: 更新stampPavilion函数**

修改盖章函数，添加站点编号参数：

```javascript
function stampPavilion(pavilion, stationNumber) {
    const modal = document.getElementById('stampModal');
    const stampText = document.getElementById('stampText');
    const stampImage = document.getElementById('stampImage');
    
    stampText.textContent = `已获得 ${stationNumber}/8 ${pavilion}建筑印章`;
    stampImage.innerHTML = `<i class="fa fa-stamp text-6xl text-vermilion stamp-animation"></i>`;
    modal.classList.remove('hidden');
    
    // 保存到localStorage
    let stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    if (!stamps.includes(pavilion)) {
        stamps.push(pavilion);
        localStorage.setItem('stamps', JSON.stringify(stamps));
    }
    
    // 更新当前站点
    localStorage.setItem('currentStation', stationNumber);
}
```

- [ ] **Step 3: 添加展馆导航函数**

```javascript
function nextPavilionFrom(current) {
    if (current < 8) {
        scrollToPavilion(current);
    }
}

function prevPavilionFrom(current) {
    if (current > 1) {
        scrollToPavilion(current - 2);
    }
}
```

- [ ] **Step 4: 更新展馆页面底部指示器**

确保8个指示点对应8个派系：

```html
<div class="flex justify-center items-center gap-2 mb-6">
    <button onclick="prevPavilion()" class="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
        <i class="fa fa-chevron-left text-wood"></i>
    </button>
    <div class="flex gap-1">
        <span class="w-3 h-3 bg-vermilion rounded-full" title="京派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="晋派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="苏派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="徽派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="闽派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="粤派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="川派"></span>
        <span class="w-2 h-2 bg-accent rounded-full" title="海派"></span>
    </div>
    <button onclick="nextPavilion()" class="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
        <i class="fa fa-chevron-right text-wood"></i>
    </button>
</div>
```

- [ ] **Step 5: 测试展馆页面**

- 检查8个展馆是否按正确顺序排列
- 测试"盖章打卡"功能
- 测试展馆间导航按钮
- 验证印章收集后localStorage数据更新

---

### 任务 3: 增强护照页面 - 顺序印章展示

**Files:**
- Modify: `zhushu.html:509-593` (护照页区域)

**Steps:**

- [ ] **Step 1: 重构护照页面布局**

```html
<div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
    <div class="text-center mb-4">
        <div class="inline-block bg-vermilion text-white px-4 py-1 rounded-full text-sm mb-3">
            <i class="fa fa-passport mr-1"></i>
            第 <span id="currentStation">0</span>/8 站
        </div>
        <h3 class="text-lg font-bold">建筑学徒护照</h3>
        <p class="text-sm text-wood/70">收集八大派系印章 · 完成文化寻访之旅</p>
    </div>

    <!-- 游览进度条 -->
    <div class="bg-paper rounded-xl p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-wood/70">游览进度</span>
            <span id="stampCount" class="text-sm font-medium">0/8</span>
        </div>
        <div class="h-3 bg-accent rounded-full overflow-hidden">
            <div id="progressBar" class="h-full bg-gradient-to-r from-vermilion to-amber-500 rounded-full transition-all duration-500" style="width: 0%"></div>
        </div>
        <p class="text-xs text-wood/60 mt-2 text-center">
            京 → 晋 → 苏 → 徽 → 闽 → 粤 → 川 → 海
        </p>
    </div>

    <!-- 印章网格 - 按游览顺序 -->
    <div class="grid grid-cols-4 gap-3 mb-4">
        <!-- 印章1: 京派 -->
        <div id="stamp-京派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-vermilion font-bold absolute -top-2 -left-1 bg-white px-1">1</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">京派</span>
        </div>
        
        <!-- 印章2: 晋派 -->
        <div id="stamp-晋派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-amber-700 font-bold absolute -top-2 -left-1 bg-white px-1">2</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">晋派</span>
        </div>
        
        <!-- 印章3: 苏派 -->
        <div id="stamp-苏派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-green-600 font-bold absolute -top-2 -left-1 bg-white px-1">3</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">苏派</span>
        </div>
        
        <!-- 印章4: 徽派 -->
        <div id="stamp-徽派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-gray-600 font-bold absolute -top-2 -left-1 bg-white px-1">4</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">徽派</span>
        </div>
        
        <!-- 印章5: 闽派 -->
        <div id="stamp-闽派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-orange-600 font-bold absolute -top-2 -left-1 bg-white px-1">5</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">闽派</span>
        </div>
        
        <!-- 印章6: 粤派 -->
        <div id="stamp-粤派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-blue-600 font-bold absolute -top-2 -left-1 bg-white px-1">6</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">粤派</span>
        </div>
        
        <!-- 印章7: 川派 -->
        <div id="stamp-川派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-red-600 font-bold absolute -top-2 -left-1 bg-white px-1">7</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">川派</span>
        </div>
        
        <!-- 印章8: 海派 -->
        <div id="stamp-海派" class="stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative">
            <span class="text-xs text-purple-600 font-bold absolute -top-2 -left-1 bg-white px-1">8</span>
            <i class="fa fa-stamp text-xl mb-1"></i>
            <span class="text-xs text-center">海派</span>
        </div>
    </div>

    <!-- 称号系统 -->
    <div class="bg-gradient-to-r from-vermilion/5 to-amber-100 rounded-xl p-4">
        <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-wood/70">当前称号</span>
            <span id="titleBadge" class="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium">
                建筑学徒
            </span>
        </div>
        
        <div class="text-xs text-wood/70 space-y-1">
            <p><i class="fa fa-star text-vermilion mr-1"></i> 称号等级：初学者 → 建筑学徒 → 初级寻访者 → 中级寻访者 → 资深寻访者 → 建筑大师</p>
        </div>
    </div>
</div>

<!-- 收集指南 -->
<div class="bg-gradient-to-r from-vermilion/10 to-amber-100 rounded-xl p-4">
    <h4 class="font-medium mb-2 flex items-center">
        <i class="fa fa-lightbulb-o text-vermilion mr-2"></i>
        学徒收集指南
    </h4>
    <ul class="text-sm text-wood/70 space-y-1">
        <li>• <strong>起点：</strong>从京派开始你的建筑文化之旅</li>
        <li>• <strong>游览：</strong>依次参观八大派系展馆</li>
        <li>• <strong>打卡：</strong>每个展馆点击「盖章打卡」收集印章</li>
        <li>• <strong>完成：</strong>集齐8枚印章成为「建筑大师」</li>
    </ul>
</div>
```

- [ ] **Step 2: 更新updatePassport函数**

```javascript
function updatePassport() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    const pavilions = ['京派', '晋派', '苏派', '徽派', '闽派', '粤派', '川派', '海派'];
    
    // 更新印章状态
    pavilions.forEach((pavilion, index) => {
        const stampItem = document.getElementById(`stamp-${pavilion}`);
        if (stampItem) {
            if (stamps.includes(pavilion)) {
                stampItem.classList.add('collected');
                stampItem.classList.remove('border-dashed', 'border-accent', 'text-wood/40');
                
                // 根据派系特色设置印章颜色
                const colors = {
                    '京派': 'bg-gradient-to-br from-red-600 to-red-800',
                    '晋派': 'bg-gradient-to-br from-amber-500 to-amber-700',
                    '苏派': 'bg-gradient-to-br from-green-500 to-green-700',
                    '徽派': 'bg-gradient-to-br from-gray-400 to-gray-600',
                    '闽派': 'bg-gradient-to-br from-orange-500 to-orange-700',
                    '粤派': 'bg-gradient-to-br from-blue-500 to-blue-700',
                    '川派': 'bg-gradient-to-br from-red-500 to-red-700',
                    '海派': 'bg-gradient-to-br from-purple-500 to-purple-700'
                };
                
                stampItem.className = `stamp-item aspect-square rounded-lg flex flex-col items-center justify-center text-white relative ${colors[pavilion]}`;
            } else {
                stampItem.classList.remove('collected');
                stampItem.classList.add('border-dashed', 'border-accent', 'text-wood/40');
                stampItem.className = 'stamp-item aspect-square border-2 border-dashed border-accent rounded-lg flex flex-col items-center justify-center text-wood/40 bg-white relative';
            }
        }
    });
    
    // 更新进度
    const progress = (stamps.length / pavilions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('stampCount').textContent = `${stamps.length}/${pavilions.length}`;
    document.getElementById('currentStation').textContent = stamps.length;
    
    // 更新称号
    const titleBadge = document.getElementById('titleBadge');
    let title = '建筑学徒';
    let bgClass = 'bg-amber-100 text-amber-700';
    
    if (stamps.length === 0) {
        title = '初学者';
        bgClass = 'bg-gray-100 text-gray-600';
    } else if (stamps.length === 8) {
        title = '建筑大师';
        bgClass = 'bg-vermilion text-white';
    } else if (stamps.length >= 7) {
        title = '资深寻访者';
        bgClass = 'bg-purple-100 text-purple-700';
    } else if (stamps.length >= 5) {
        title = '中级寻访者';
        bgClass = 'bg-blue-100 text-blue-700';
    } else if (stamps.length >= 3) {
        title = '初级寻访者';
        bgClass = 'bg-green-100 text-green-700';
    } else if (stamps.length >= 1) {
        title = '建筑学徒';
        bgClass = 'bg-amber-100 text-amber-700';
    }
    
    titleBadge.textContent = title;
    titleBadge.className = `${bgClass} px-4 py-1 rounded-full text-sm font-medium`;
}
```

- [ ] **Step 3: 测试护照页面**

- 打开护照页面检查印章网格布局
- 测试印章收集功能
- 验证进度条和称号更新
- 检查游览进度显示

---

### 任务 4: 更新关于页面 - 添加学徒故事和游览路线

**Files:**
- Modify: `zhushu.html:675-896` (关于页区域)

**Steps:**

- [ ] **Step 1: 重构关于页面**

在现有内容基础上添加学徒故事和游览路线说明：

```html
<!-- 学徒故事介绍 -->
<div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
    <h4 class="font-bold text-lg mb-4 flex items-center">
        <i class="fa fa-book text-vermilion mr-2"></i>
        学徒故事
    </h4>
    <div class="bg-white rounded-xl p-4 mb-4">
        <div class="flex items-center mb-3">
            <div class="w-12 h-12 bg-vermilion/10 rounded-full flex items-center justify-center mr-3">
                <i class="fa fa-user-graduate text-vermilion text-xl"></i>
            </div>
            <div>
                <h5 class="font-bold">建筑学徒</h5>
                <p class="text-xs text-wood/60">踏上寻找建筑文化根源的旅程</p>
            </div>
        </div>
        <p class="text-sm text-wood/80 leading-relaxed">
            怀揣着对中国传统建筑的热爱与敬畏，一位年轻的建筑学徒决定踏上一段非凡的旅程。
            从皇城北京出发，他将要探访晋商大院的厚重、苏州园林的精致、徽派古村的清雅、
            闽南土楼的雄奇、岭南建筑的包容、川西吊脚楼的灵动，最终抵达海派上海的多元。
            这不仅是一次建筑的巡礼，更是一场文化的寻根之旅。
        </p>
    </div>
    
    <!-- 游览路线展示 -->
    <div class="bg-white rounded-xl p-4">
        <h5 class="font-medium mb-3 flex items-center">
            <i class="fa fa-map text-amber-600 mr-2"></i>
            游览路线
        </h5>
        <div class="flex items-center justify-between text-xs mb-2">
            <span class="text-wood/60">起点</span>
            <span class="text-wood/60">终点</span>
        </div>
        <div class="flex items-center gap-1 overflow-x-auto pb-2">
            <span class="px-2 py-1 bg-red-100 text-red-700 rounded whitespace-nowrap">京派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-amber-100 text-amber-700 rounded whitespace-nowrap">晋派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-green-100 text-green-700 rounded whitespace-nowrap">苏派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded whitespace-nowrap">徽派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded whitespace-nowrap">闽派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap">粤派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-red-100 text-red-700 rounded whitespace-nowrap">川派</span>
            <i class="fa fa-arrow-right text-wood/40 text-xs"></i>
            <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded whitespace-nowrap">海派</span>
        </div>
        <p class="text-xs text-wood/60 mt-2 text-center">
            从北京皇城到上海海派 · 跨越南北的文化之旅
        </p>
    </div>
</div>
```

- [ ] **Step 2: 添加游览地图引用**

在作品信息卡片中添加游览地图：

```html
<!-- 游览地图展示 -->
<div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h4 class="font-bold text-lg mb-4 flex items-center">
        <i class="fa fa-map text-purple-500 mr-2"></i>
        学徒游览地图
    </h4>
    <div class="relative rounded-xl overflow-hidden mb-3">
        <img src="assets/journey/学徒游览路线.png" 
             alt="学徒游览路线图" 
             class="w-full h-auto">
    </div>
    <p class="text-xs text-wood/60 text-center">
        完整的学徒游览路线图，标注八大派系地理位置
    </p>
</div>
```

- [ ] **Step 3: 测试关于页面**

- 检查学徒故事内容是否正常显示
- 验证游览路线展示
- 检查游览地图图片加载
- 确保页面布局美观

---

### 任务 5: 完善交互和数据管理

**Files:**
- Modify: `zhushu.html:910-1100` (JavaScript区域)

**Steps:**

- [ ] **Step 1: 更新localStorage数据结构**

确保localStorage包含所有必要数据：

```javascript
// 初始化localStorage数据结构
function initStorage() {
    if (!localStorage.getItem('stamps')) {
        localStorage.setItem('stamps', JSON.stringify([]));
    }
    if (!localStorage.getItem('currentStation')) {
        localStorage.setItem('currentStation', '0');
    }
    if (!localStorage.getItem('journeyStarted')) {
        localStorage.setItem('journeyStarted', 'false');
    }
}
```

- [ ] **Step 2: 添加重置功能**

```javascript
function resetJourney() {
    if (confirm('确定要重置游览进度吗？所有收集的印章将被清空。')) {
        localStorage.setItem('stamps', JSON.stringify([]));
        localStorage.setItem('currentStation', '0');
        localStorage.setItem('journeyStarted', 'false');
        
        // 更新所有页面状态
        if (document.getElementById('passport').classList.contains('active')) {
            updatePassport();
        }
        
        alert('游览进度已重置，可以重新开始啦！');
    }
}
```

- [ ] **Step 3: 更新window.onload**

```javascript
window.onload = function() {
    // 初始化数据
    initStorage();
    
    // 设置默认日期为明天
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('reserveDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('reserveDate').min = tomorrow.toISOString().split('T')[0];
    
    // 自动播放轮播
    setInterval(nextSlide, 4000);
    
    // 初始化护照状态
    updatePassport();
    
    // 绑定轮播点点击事件
    homeCarouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // 如果有游览进度，显示继续游览提示
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    if (stamps.length > 0 && stamps.length < 8) {
        console.log(`您已完成 ${stamps.length}/8 站，继续加油！`);
    }
}
```

- [ ] **Step 4: 添加游览状态持久化**

修改switchTab函数，确保游览状态正确更新：

```javascript
function switchTab(tabId) {
    // 隐藏所有tab内容
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示目标tab
    document.getElementById(tabId).classList.add('active');
    
    // 更新底部导航
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-vermilion');
        btn.classList.add('text-wood/60');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.remove('text-wood/60');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('text-vermilion');
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 根据切换的tab更新对应状态
    if (tabId === 'passport') {
        updatePassport();
    } else if (tabId === 'pavilions') {
        // 如果是从首页开始游览
        const journeyStarted = localStorage.getItem('journeyStarted');
        if (journeyStarted === 'false') {
            localStorage.setItem('journeyStarted', 'true');
        }
        
        // 滚动到当前进度位置
        const currentStation = parseInt(localStorage.getItem('currentStation') || '0');
        if (currentStation > 0) {
            scrollToPavilion(currentStation - 1);
        }
    }
}
```

- [ ] **Step 5: 测试完整交互流程**

1. 打开首页，点击"开始游览"
2. 浏览各个展馆并盖章
3. 查看护照页面验证印章收集
4. 刷新页面验证数据持久化
5. 测试重置功能

---

## 测试清单

完成所有任务后，进行以下测试：

- [ ] 首页学徒故事卡片正常显示
- [ ] 游览地图图片加载成功
- [ ] "开始游览"按钮正常工作
- [ ] 8个展馆按正确顺序排列
- [ ] 每个展馆显示顺序编号和站点信息
- [ ] 展馆间导航按钮正常工作
- [ ] 盖章功能正常，印章收集成功
- [ ] 护照页面印章按顺序显示
- [ ] 进度条和称号正确更新
- [ ] 印章具有派系特色颜色
- [ ] 关于页面学徒故事和游览路线展示正常
- [ ] 数据持久化正常（刷新页面数据保留）
- [ ] 手机端显示效果良好
- [ ] 所有页面切换流畅

---

## 注意事项

1. **图片路径：** 所有图片使用相对路径 `assets/pavilions/xxx.jpg` 和 `assets/journey/xxx.png`
2. **localStorage：** 使用JSON格式存储数据，键名为 `stamps`、`currentStation`、`journeyStarted`
3. **响应式设计：** 确保在手机端显示效果良好
4. **渐进增强：** 基础功能不依赖JavaScript，但增强功能需要JS支持
5. **数据一致性：** 所有页面共享localStorage数据，确保状态同步

---

**Plan created:** 2026-06-14
**Project:** 《筑书》学徒游览路线
**Total Tasks:** 5
**Estimated Time:** 2-3 hours
