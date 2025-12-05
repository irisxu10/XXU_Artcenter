// ============================================
// NIGHT CAMPSITE
// ============================================

// ============================================
// 配置常量
// ============================================
const CONFIG = {
  maxWidth: 1200,
  skyGradient: {
    top: { r: 15, g: 25, b: 55 },        // 顶部：深蓝色
    mid: { r: 45, g: 50, b: 85 },        // 中间：蓝紫色
    bottom: { r: 95, g: 70, b: 75 }      // 地平线：橙红紫色
},
  
  groundColor: { r: 15, g: 18, b: 16 },
  firePosition: { yOffset: 120 }
};

// ============================================
// 全局变量 
// ============================================
let stars = [];
let fireTime = 0;
let embers = [];
let smoke = [];
let innerSparks = [];
let ashParticles = [];
let fireIntensity = 1;
let windOffset = 0;
let groundRocks = [];      //石头
let grassTufts = [];       //草丛
let moon;                  //月亮
let mountains = [];        //远山
let rockImages = [];       //石头
let treeImages = [];       //树
let backgroundTrees = [];  //树
let foregroundBushes = []; //灌木
let flameOffsetY = 18;     //火焰位置修正

// === 背包系统 ===
let backpackIcon = {
  x: 0,
  y: 0,
  size: 45,
  sceneScale: 1,
  isOpen: false,
  items: []  // 背包中的物品
};
let backpackPanel = {
  x: 0,
  y: 0,
  width: 320,
  height: 450,
  visible: false,
  scrollOffset: 0,      // 👈 新增：滚动偏移量
  maxScroll: 0          // 👈 新增：最大滚动量
};
// === 放置系统（新增） ===
let placementMode = {
  active: false,        // 是否在放置模式
  item: null,           // 当前要放置的物品
  previewAlpha: 150     // 预览透明度
};
// === 已放置的物品（新增） ===
let placedItems = [];  // 存储已放置到场景中的物品
// === 物品列表 ===
let availableItems = [
  { name: '泰迪熊', emoji: '🧸', description: '毛绒玩具' },
  { name: '旧相机', emoji: '📷', description: '相机' },
  { name: '日记本', emoji: '📔', description: '笔记' },
  { name: '贝壳', emoji: '🐚', description: '贝壳' },
  { name: '明信片', emoji: '📮', description: '明信片' },
  { name: '地图', emoji: '🗺️', description: '地图' },
  { name: '枫叶', emoji: '🍁', description: '秋天采集的标本' },
  { name: '羽毛', emoji: '🪶', description: '山中捡到的鸟羽' },
  { name: '石头', emoji: '🪨', description: '登山纪念石' },
  { name: '手表', emoji: '⌚', description: '手表' },
  { name: '钥匙', emoji: '🔑', description: '钥匙' },
  { name: '围巾', emoji: '🧣', description: '保暖围巾' },
  { name: '书', emoji: '📖', description: '一本书' },
  { name: '木柴', emoji: '🪵', description: '木柴' },
  { name: '花朵', emoji: '🌸', description: '花朵' },
  { name: '蘑菇', emoji: '🍄', description: '蘑菇' },
  { name: '树叶', emoji: '🍃', description: '树叶' }
];
// === 详情面板相关 ===
let selectedItem = null; // 当前选中的物品
let detailPanel = {
  visible: false,
  x: 0,
  y: 0,
  width: 300,
  height: 600
};

// 场景启动标志
let campsiteStarted = false;

// 暴露启动函数给 HTML
window.startCampsite = function() {
  campsiteStarted = true;
};


// ============================================
// Preload&Setup ➕➕➕➕➕➕➕➕➕➕➕➕➕
// ============================================
function preload() {
  rockImages.push(loadImage('asset/rock.png'));
  rockImages.push(loadImage('asset/rock1.png'));
  
  treeImages.push(loadImage('asset/tree1.png'));
  treeImages.push(loadImage('asset/tree2.png'));
  
}

function setup() {
  // ✅ 只创建一次画布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('campsite-screen');
  
  initializeStars();
  initializeMoon();
  initializeMountains();
  initializeGroundDetails();
  initializeEmbers(30);
  initializeSmoke(18);
  initializeInnerSparks(15);
  initializeAsh(10);
  initializeBackgroundTrees();  //树
  initializeForegroundBushes();//灌木
  initializeBackpack();  // 👈 新增：初始化背包位置
  
  pixelDensity(1);
  
}


// ============================================
// function draw 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️
// ============================================
function draw() {
      // 等待场景启动
  if (!campsiteStarted) {
    return;
  }
  
    background(135, 206, 235); // ← 这行必须有！
  // == 背景层 ==
  drawNightSky();
  drawMoon();
  drawStars();
  drawMountains();
  drawMountainFog();  
  drawBackgroundTrees();
  
  // == 中景层 ==
  drawGround();
  drawForegroundBushes();   
  
  // 环境光照（影响所有物体）
  let fireX = width / 2;
  let fireY = height / 2 + CONFIG.firePosition.yOffset;
  
  drawEnvironmentalLighting(fireX, fireY);
  
  // == 前景 ==
  drawGroundDetails(fireX, fireY);  

  // == 篝火 ==
  drawCampfire(fireX, fireY);
  
  // 👇 绘制已放置的物品
  drawPlacedItems(fireX, fireY);
  
  // 👇 绘制放置预览（如果在放置模式）
  if (placementMode.active) {
    drawPlacementPreview();
  }
  
  // 绘制场景中的背包
  drawSceneBackpack(fireX, fireY);
  
  // 绘制背包面板
  if (backpackPanel.visible) {
    drawBackpackPanel();
  }
  
  updateAndDrawPlacedItems();
  
  // == 动画更新 ==
  fireTime += 0.018;
  // 火焰强度：主波动 + 细微震颤 + 偶尔"爆发"
  let mainPulse = sin(fireTime * 0.3) * 0.12;
  let microFlutter = noise(fireTime * 2) * 0.08;
  let burst = (noise(fireTime * 0.15) > 0.85) ? 0.15 : 0; 
  // 偶尔突然变亮
  fireIntensity = 0.85 + mainPulse + microFlutter + burst;
  // 风向变化
  windOffset = sin(fireTime * 0.35) * 10 + noise(fireTime * 0.18) * 6;
  
  // 绘制选中物品的高亮圈
  if (selectedItem && !selectedItem.isDropping) {
    push();
    noFill();
    stroke(100, 150, 255);
    strokeWeight(3);
    circle(selectedItem.x, selectedItem.y, selectedItem.size + 10);
    pop();
  }
  
  // 绘制详情面板（最后绘制，保证在最上层）
  drawDetailPanel();

}


// ============================================
// 背景：天空、月亮、星星、远山🌄🌄🌄🌄🌄🌄🌄
// ============================================

// == 天空 ==
function drawNightSky() {
  noFill();
  for (let y = 0; y < height; y++) {
    let t = y / height;
    let r, g, b;
    
    if (t < 0.5) {
      // 上半部分：从深蓝到中蓝
      let localT = t / 0.5;
      r = lerp(CONFIG.skyGradient.top.r, CONFIG.skyGradient.mid.r, localT);
      g = lerp(CONFIG.skyGradient.top.g, CONFIG.skyGradient.mid.g, localT);
      b = lerp(CONFIG.skyGradient.top.b, CONFIG.skyGradient.mid.b, localT);
    } else {
      // 下半部分：从中蓝到地平线浅蓝
      let localT = (t - 0.5) / 0.5;
      r = lerp(CONFIG.skyGradient.mid.r, CONFIG.skyGradient.bottom.r, localT);
      g = lerp(CONFIG.skyGradient.mid.g, CONFIG.skyGradient.bottom.g, localT);
      b = lerp(CONFIG.skyGradient.mid.b, CONFIG.skyGradient.bottom.b, localT);
    }
    
    stroke(r, g, b);
    line(0, y, width, y);
  }
  noStroke();
}

// == 月亮 ==
function initializeMoon() {
  moon = {
    x: width * 0.75,
    y: height * 0.2,
    size: 55, 
    craters: []  // 👈 存储环形山位置
  };
  
  // 生成随机的环形山位置
  for (let i = 0; i < 12; i++) {
    let angle = random(TWO_PI);
    let distance = random(moon.size * 0.15, moon.size * 0.4);  // 距离月心的距离
    moon.craters.push({
      x: cos(angle) * distance,
      y: sin(angle) * distance,
      size: random(4, 12),
      depth: random(0.3, 0.7)  // 深浅程度
    });
  }
}

function drawMoon() {
  push();
  
  // === 1. 柔和的外光晕（大范围渐变） ===
  drawingContext.save();
  let outerGlow = drawingContext.createRadialGradient(
    moon.x, moon.y, moon.size * 0.5,
    moon.x, moon.y, moon.size * 3.5
  );
  outerGlow.addColorStop(0, 'rgba(230, 235, 245, 0.15)');
  outerGlow.addColorStop(0.3, 'rgba(220, 230, 245, 0.08)');
  outerGlow.addColorStop(0.6, 'rgba(210, 225, 240, 0.03)');
  outerGlow.addColorStop(1, 'rgba(200, 220, 240, 0)');
  
  drawingContext.fillStyle = outerGlow;
  drawingContext.fillRect(
    moon.x - moon.size * 4,
    moon.y - moon.size * 4,
    moon.size * 8,
    moon.size * 8
  );
  drawingContext.restore();
  
  // === 2. 月亮本体（带渐变） ===
  drawingContext.save();
  let moonGradient = drawingContext.createRadialGradient(
    moon.x - moon.size * 0.15,  // 光源偏左上
    moon.y - moon.size * 0.15,
    0,
    moon.x,
    moon.y,
    moon.size * 0.5
  );
  moonGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');  // 中心亮
  moonGradient.addColorStop(0.7, 'rgba(240, 242, 245, 0.9)');
  moonGradient.addColorStop(1, 'rgba(220, 225, 230, 0.85)');  // 边缘稍暗
  
  drawingContext.fillStyle = moonGradient;
  drawingContext.beginPath();
  drawingContext.arc(moon.x, moon.y, moon.size * 0.5, 0, TWO_PI);
  drawingContext.fill();
  drawingContext.restore();
  
  // === 3. 月球表面细节（环形山和阴影） ===
  noStroke();
  
  // 绘制环形山
  for (let crater of moon.craters) {
    let craterX = moon.x + crater.x;
    let craterY = moon.y + crater.y;
    
    // 检查是否在月球范围内
    let distFromCenter = dist(crater.x, crater.y, 0, 0);
    if (distFromCenter > moon.size * 0.45) continue;  // 太靠边的不画
    
    // 环形山阴影（深色圆形）
    let shadowAlpha = map(crater.depth, 0.3, 0.7, 25, 55);
    fill(180, 185, 195, shadowAlpha);
    circle(craterX, craterY, crater.size);
    
    // 环形山边缘高光（亮色小圆）
    fill(255, 255, 255, 20);
    circle(craterX - crater.size * 0.15, craterY - crater.size * 0.15, crater.size * 0.4);
  }
  
  // 大的暗斑（月海）
  fill(205, 210, 220, 35);
  circle(moon.x - 8, moon.y - 5, 14);
  circle(moon.x + 7, moon.y + 6, 10);
  circle(moon.x - 3, moon.y + 12, 8);
  
  // === 4. 月球边缘的柔和光（Limb Darkening 效果） ===
  drawingContext.save();
  drawingContext.globalCompositeOperation = 'source-atop';  // 只在月球内部绘制
  
  let limbDarkening = drawingContext.createRadialGradient(
    moon.x, moon.y, 0,
    moon.x, moon.y, moon.size * 0.5
  );
  limbDarkening.addColorStop(0, 'rgba(255, 255, 255, 0)');
  limbDarkening.addColorStop(0.7, 'rgba(220, 225, 235, 0)');
  limbDarkening.addColorStop(1, 'rgba(200, 210, 225, 0.25)');  // 边缘变暗
  
  drawingContext.fillStyle = limbDarkening;
  drawingContext.beginPath();
  drawingContext.arc(moon.x, moon.y, moon.size * 0.5, 0, TWO_PI);
  drawingContext.fill();
  drawingContext.restore();
  
  // === 5. 近距离光晕（柔和的白色光圈） ===
  for (let i = 2; i > 0; i--) {
    let alpha = map(i, 0, 2, 0, 15);
    fill(240, 245, 250, alpha);
    circle(moon.x, moon.y, moon.size + i * 18);
  }
  
  pop();
}

// == 星星 ==
function initializeStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.65),
      size: random(0.8, 3),
      twinkleSpeed: random(0.015, 0.04), 
      twinkleOffset: random(TWO_PI),
      brightness: random(0.5, 1),
      twinkleType: random() < 0.5 ? 'blink' : 'pulse' 
    });
  }
}

function drawStars() {
  push();
  noStroke();
  
  for (let s of stars) {
    // 计算闪烁值
    let t = fireTime * s.twinkleSpeed + s.twinkleOffset;
    let twinkle;
    
    if (s.twinkleType === 'blink') {
      // === 闪烁型：偶尔突然亮一下 ===
      let osc = (sin(t) + 1) / 2;  // 0~1
      // 大部分时间很暗，偶尔突然亮
      twinkle = pow(osc, 4.0);  // 👈 从 2.0 改成 4.0，更极端的对比
      twinkle = lerp(0.2, 1.0, twinkle);
      
    } else {
      // === 呼吸型：缓慢平滑地呼吸 ===
      let osc = (sin(t) + 1) / 2;  // 0~1
      twinkle = lerp(0.5, 1.0, pow(osc, 1.5));  // 👈 更柔和的曲线
    }
    
    // 最终亮度
    let alphaBase = 150;  // 👈 从 130 改成 150，稍微亮一点
    let alpha = alphaBase * s.brightness * twinkle;
    
    // 大小呼吸（微小变化）
    let size = s.size * (0.85 + 0.3 * twinkle);  
    
    // 颜色：更亮的星星带一点暖色
    if (s.brightness > 0.8) {
      fill(255, 250, 240, alpha);  // 暖白色
    } else {
      fill(255, 255, 255, alpha);  // 纯白色
    }
    
    circle(s.x, s.y, size);
    
    // === 可选：给最亮的星星加光芒 ===
    if (s.brightness > 0.85 && twinkle > 0.7) {
      fill(255, 250, 240, alpha * 0.15);
      circle(s.x, s.y, size * 3);  // 外圈光晕
    }
  }
  
  pop();
}

// == 山 ==
function initializeMountains() {
  mountains = [];
  let segments = 25;
  for (let i = 0; i <= segments; i++) {
    let x = (width / segments) * i;
    let baseHeight = height * 0.68;
    let variance = noise(i * 0.3) * 60 + noise(i * 0.8) * 30;
    mountains.push({ x: x, y: baseHeight - variance });
  }
}

function drawMountains() {
  fill(12, 18, 25, 180);
  beginShape();
  vertex(0, height);
  for (let m of mountains) {
    vertex(m.x, m.y);
  }
  vertex(width, height);
  endShape(CLOSE);
}


// ============================================
// 地面-地面-地面-地面
// ============================================

function drawGround() {
  // === 绘制不规则的地平线轮廓 ===
  noStroke();
  fill(CONFIG.groundColor.r, CONFIG.groundColor.g, CONFIG.groundColor.b);
  
  beginShape();
  vertex(0, height);  // 左下角
  
  // 地平线的起伏轮廓
  for (let x = 0; x <= width; x += 20) {
    let baseY = height * 0.7;
    // 用噪声制造自然起伏
    let noiseY = noise(x * 0.003, fireTime * 0.05) * 15;
    let y = baseY + noiseY - 5;
    vertex(x, y);
  }
  
  vertex(width, height);  // 右下角
  endShape(CLOSE);
  
  // === 地面渐变色块（模拟深度）===
  for (let i = 0; i < 12; i++) {
    let y = height * 0.7 + i * 15;
    let alpha = map(i, 0, 12, 20, 5);
    fill(CONFIG.groundColor.r - 8, CONFIG.groundColor.g - 8, CONFIG.groundColor.b - 8, alpha);
    let waveOffset = sin(i * 0.5 + fireTime * 0.5) * 3;
    ellipse(width / 2 + waveOffset, y, width * 1.2, 40);
  }
  
  // === 地面颗粒感 ===
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height * 0.7, height);
    let size = random(0.5, 2);
    fill(CONFIG.groundColor.r + random(-5, 5), CONFIG.groundColor.g + random(-5, 5), CONFIG.groundColor.b + random(-5, 5), random(30, 80));
    circle(x, y, size);
  }
}


// == 雾气 ==
function drawMountainFog() {
  push();
  
  // 绘制多层半透明雾气，从远山底部向下渐变
  for (let i = 0; i < 5; i++) {
    let y = height * 0.68 + i * 8;
    let alpha = map(i, 0, 5, 30, 5);
    
    fill(15, 22, 30, alpha);
    
    // 用噪声制造不规则的雾气边缘
    beginShape();
    for (let x = 0; x <= width; x += 15) {
      let noiseOffset = noise(x * 0.005, i * 0.5, fireTime * 0.03) * 12;
      vertex(x, y + noiseOffset);
    }
    vertex(width, height * 0.72);
    vertex(0, height * 0.72);
    endShape(CLOSE);
  }
  
  pop();
}


// ============================================
// 灌木-灌木-灌木-灌木
// ============================================

function initializeForegroundBushes() {
  foregroundBushes = [];
  
  // 沿着地平线密集分布小灌木
  for (let i = 0; i < 25; i++) {
    foregroundBushes.push({
      x: random(width * 0.05, width * 0.95),
      y: height * 0.70 + random(-5, 5),   // 紧贴地平线
      width: random(30, 80),
      height: random(12, 30),
      noiseOffset: random(1000)            // 每个灌木的噪声偏移
    });
  }
  
  // 按 x 坐标排序
  foregroundBushes.sort((a, b) => a.x - b.x);
}

function drawForegroundBushes() {
  noStroke();
  
  for (let bush of foregroundBushes) {
    push();
    fill(6, 12, 10, 200);  // 深色剪影
    
    // 用噪声生成不规则的灌木轮廓（像真实草丛）
    beginShape();
    
    // 底部贴着地面
    vertex(bush.x - bush.width / 2, bush.y);
    
    // 顶部不规则轮廓
    let segments = 12;
    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let x = bush.x - bush.width / 2 + t * bush.width;
      
      // 用噪声制造不规则高度
      let noiseVal = noise(bush.noiseOffset + i * 0.3);
      let heightVariation = map(noiseVal, 0, 1, 0.5, 1);
      
      // 中间高，两边低（自然的灌木形状）
      let centerCurve = sin(t * PI) * 0.8 + 0.2;
      
      let y = bush.y - bush.height * heightVariation * centerCurve;
      vertex(x, y);
    }
    
    // 右下角
    vertex(bush.x + bush.width / 2, bush.y);
    
    endShape(CLOSE);
    pop();
  }
}

// ============================================
// 🌲树🌲树🌲树🌲树🌲树🌲树🌲树🌲树🌲树🌲
// ============================================

function initializeBackgroundTrees() {
  backgroundTrees = [];
  
  // === 远景树层（最远、最小、最透明）===
  for (let i = 0; i < 25; i++) {
    backgroundTrees.push({
      x: random(width * 0.05, width * 0.95),
      y: height * 0.60 + random(-25, 25),  // 更靠上
      size: random(50, 100),                // 最小
      type: floor(random(2)),
      alpha: random(100, 150),              // 最透明
      flipX: random() > 0.5,
      layer: 'far'                          // 标记为远景
    });
  }
  
  // === 中景树层（中等大小和透明度）===
  // 固定位置分布
  let positions = [0.08, 0.15, 0.25, 0.38, 0.52, 0.65, 0.78, 0.88, 0.94];
  for (let pos of positions) {
    backgroundTrees.push({
      x: width * pos,
      y: height * 0.68 + random(-15, 15),
      size: random(80, 160),                // 中等
      type: floor(random(2)),
      alpha: random(160, 220),              // 中等透明度
      flipX: random() > 0.5,
      layer: 'mid'                          // 标记为中景
    });
  }
  
  // === 近景树层（最大、最清晰、在画面边缘）===
  // 左右两侧各 2-3 棵大树
  let nearPositions = [
    { side: 'left', xRange: [0.02, 0.12] },   // 左侧区域
    { side: 'left', xRange: [0.05, 0.15] },
    { side: 'right', xRange: [0.85, 0.95] },  // 右侧区域
    { side: 'right', xRange: [0.88, 0.98] }
  ];
  
  for (let nearPos of nearPositions) {
    backgroundTrees.push({
      x: random(width * nearPos.xRange[0], width * nearPos.xRange[1]),
      y: height * 0.75 + random(-10, 10),  // 更靠下（更近）
      size: random(180, 280),               // 最大
      type: floor(random(2)),
      alpha: random(200, 255),              // 几乎不透明
      flipX: nearPos.side === 'left' ? false : true, 
      layer: 'near'                         // 标记为近景
    });
  }
  
  // 按 y 坐标排序，确保远的树在后面绘制
  backgroundTrees.sort((a, b) => a.y - b.y);
}

function drawBackgroundTrees() {
  for (let tree of backgroundTrees) {
    push();
    translate(tree.x, tree.y);
    
    // 水平翻转（增加多样性）
    if (tree.flipX) {
      scale(-1, 1);
    }
    
    // 根据层次设置不同的颜色
    if (tree.layer === 'far') {
      // 远景树：最暗、最蓝
      tint(4, 10, 16, tree.alpha);
    } else if (tree.layer === 'mid') {
      // 中景树：稍微亮一点
      tint(6, 12, 18, tree.alpha);
    } else if (tree.layer === 'near') {
      // 近景树：更清晰，有轻微的暖色（受火光影响）
      tint(8, 15, 20, tree.alpha);
    }
    
    imageMode(CENTER);
    // 绘制树，宽度 = 高度的 60%
    image(treeImages[tree.type], 0, 0, tree.size * 0.6, tree.size);
    
    noTint();
    pop();
  }
}


// ============================================
// 地面细节：石头 + 草丛
// ============================================

function initializeGroundDetails() {
  groundRocks = [];
  let fireX = width / 2;
  let fireY = height / 2 + CONFIG.firePosition.yOffset;
  let minDistanceFromFire = 120;  // 石头距离篝火的最小距离
  let minGrassDistance = 100;     // 草的最小距离
  
  for (let i = 0; i < 7; i++) {
    let rockType = floor(random(2));
    let rockSize;
    
    if (rockType === 0) {
      rockSize = random(30, 70);
    } else {
      rockSize = random(10, 25);
    }
    
    // 生成位置，直到找到不与篝火重叠的位置
    let rockX, rockY, attempts = 0;
    do {
      rockX = random(width * 0.05, width * 1);
      rockY = height * 0.72 + random(0, height * 0.15);
      attempts++;
      
      // 计算与篝火的距离
      let distToFire = dist(rockX, rockY, fireX, fireY);
      
      if (distToFire > minDistanceFromFire || attempts > 50) {
        break;
      }
    } while (true);
    
    groundRocks.push({
      x: rockX,
      y: rockY,
      size: rockSize,
      // rotation: random(TWO_PI),
      type: rockType
    });
  }
  
  // == 草丛生成（加入距离检测）==
  grassTufts = [];
  for (let i = 0; i < 70; i++){
    let grassX, grassY, attempts = 0;
    do {
      grassX = random(width * 0.12, width * 0.90);
      grassY = height * 0.72 + random(0, height * 0.16);
      attempts++;
      
      let distToFire = dist(grassX, grassY, fireX, fireY);
      if (distToFire > minGrassDistance || attempts > 50) {
        break;
      }
    } while (true);
    
    grassTufts.push({
      x: grassX,
      y: grassY,
      blades: floor(random(5, 9)),       // 每簇 5～9 根细草
      height: random(5, 10), 
      tuftWidth: random(10, 20),         // 一小撮的宽度
      swayPhase: random(TWO_PI),         // 每簇的相位
      swaySpeed: random(0.05, 0.15),     // 摇动速度：很慢
      swayAmp: random(0.01, 0.03)        // 摇动幅度：很小
    });
  }
}

function drawGroundDetails(fireX, fireY) {
  // 石头
  for (let rock of groundRocks) {
    let distToFire = dist(rock.x, rock.y, fireX, fireY);
    let fireInfluence = constrain(map(distToFire, 50, 300, 1, 0), 0, 1);
    
    // 石头阴影
    fill(0, 0, 0, 40);
    ellipse(rock.x + 5, rock.y + rock.size * 0.3, rock.size * 1.2, rock.size * 0.4);
    
    // 使用 PNG 绘制石头
    push();
    translate(rock.x, rock.y);
    rotate(rock.rotation);
    
    // 🔥 火光影响：近处亮且暖色，远处暗且冷色
    let darkTint = color(80, 85, 90);        // 远处：暗灰蓝色
    let fireTint = color(255, 170, 110);     // 近处：暖橙色
    let currentTint = lerpColor(darkTint, fireTint, fireInfluence * fireIntensity * 0.8);
    
    tint(currentTint);
    
    imageMode(CENTER);
    image(rockImages[rock.type], 0, 0, rock.size * 2, rock.size * 2);
    
    noTint();
    pop();
  }
  
  // == 草丛 ==
  for (let grass of grassTufts) {
    let distToFire = dist(grass.x, grass.y, fireX, fireY);
    let fireInfluence = constrain(map(distToFire, 50, 300, 1, 0), 0, 1);
    
    push();
    translate(grass.x, grass.y);

    // 整簇草的基础轻微摇动（非常慢 + 偶尔动）
    let slowPhase = fireTime * grass.swaySpeed + grass.swayPhase;
    // 包一层 envelope，让它“偶尔才比较动一下”
    let envelope = (sin(fireTime * 0.08 + grass.swayPhase * 0.7) + 1) / 2; // 0~1
    envelope = pow(envelope, 3); // 大部分时间靠近 0，只有偶尔变大
    let baseSway = sin(slowPhase) * grass.swayAmp * envelope;

    for (let i = 0; i < grass.blades; i++) {
      // 范围变窄：更像小草，不是海草
      let angle = map(i, 0, grass.blades - 1, -PI / 14, PI / 14);
      let bladeLength = grass.height * random(0.85, 1.1);
      let bladeWidth = random(1, 2);
      
      // 草从暗绿到被火光照的暖黄色
      let baseGreen = color(15, 25, 20);
      let fireGreen = color(90, 75, 45);
      let bladeColor = lerpColor(baseGreen, fireGreen, fireInfluence * fireIntensity * 0.6);
      
      // 每一片叶子在 baseSway 上加一点点偏差
      let swayAmount = baseSway + i * 0.004;

      stroke(bladeColor);
      strokeWeight(bladeWidth);
      noFill();
      
      beginShape();
      vertex(0, 0);

      // 控制点不要太弯 → 更像小草
      let controlX1 = sin(angle) * bladeLength * 0.25 + swayAmount * bladeLength * 3;
      let controlY1 = -bladeLength * 0.45;
      let endX = sin(angle) * bladeLength * 0.4 + swayAmount * bladeLength * 2;
      let endY = -bladeLength;
      
      bezier(0, 0, controlX1, controlY1, controlX1, controlY1, endX, endY);
      endShape();
    }
    
    // 草根部的小椭圆
    noStroke();
    let baseGreen = color(18, 28, 22);
    let fireGreen = color(80, 68, 42);
    let baseColor = lerpColor(baseGreen, fireGreen, fireInfluence * fireIntensity * 0.5);
    fill(baseColor);
    ellipse(0, 1.5, grass.baseWidth, grass.baseWidth * 0.55);
    
    pop();
  }
  
  noStroke();
}


// ============================================
// 环境光照
// ============================================

function drawEnvironmentalLighting(cx, cy) {
  drawingContext.save();
  drawingContext.globalCompositeOperation = 'lighter';
  
  // 大范围光晕
  let gradient = drawingContext.createRadialGradient(cx, cy, 0, cx, cy, 450);
  gradient.addColorStop(0, `rgba(255, 140, 50, ${0.18 * fireIntensity})`);
  gradient.addColorStop(0.2, `rgba(255, 110, 40, ${0.12 * fireIntensity})`);
  gradient.addColorStop(0.5, `rgba(200, 80, 30, ${0.05 * fireIntensity})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  drawingContext.fillStyle = gradient;
  drawingContext.fillRect(0, 0, width, height);
  
  drawingContext.restore();
  
  // 地面直接照亮区域
  for (let i = 8; i > 0; i--) {
    let alpha = map(i, 0, 8, 0, 45 * fireIntensity);
    let size = map(i, 0, 8, 80, 280);
    fill(255, 130, 50, alpha);
    ellipse(cx, cy + 40, size, size * 0.3);
  }
}


// ============================================
// 篝火系统
// ============================================

function drawCampfire(cx, cy) {
  noStroke();
  
  drawFirewoodWithEmbers(cx, cy);
  drawSmoke(cx, cy);
  
  // 6层火焰
  drawFlameLayer(cx, cy, 58, 110, [130, 35, 20], 170, 1.25);
  drawFlameLayer(cx, cy, 50, 98,  [195, 60, 28], 185, 1.15);
  drawFlameLayer(cx, cy, 40, 82,  [255, 115, 40], 205, 1.05);
  drawFlameLayer(cx, cy, 30, 65,  [255, 175, 75], 215, 0.95);
  drawFlameLayer(cx, cy, 20, 48,  [255, 225, 130], 205, 0.85);
  drawFlameLayer(cx, cy, 12, 32,  [255, 250, 210], 185, 0.75);
  
  drawInnerSparks(cx, cy);
  drawFlameGlow(cx, cy);
  drawEmbers(cx, cy);
  drawAsh(cx, cy);
}

function drawFlameBase(cx, cy) {
  push();
  
  // 绘制多层不规则的火焰基座
  for (let layer = 3; layer > 0; layer--) {
    let baseWidth = 70 - layer * 10;
    let baseHeight = 25 - layer * 5;
    let baseY = cy + 10 - layer * 3;
    
    // 颜色从深红到橙红
    let r = map(layer, 1, 3, 255, 150);
    let g = map(layer, 1, 3, 140, 50);
    let b = map(layer, 1, 3, 60, 20);
    let alpha = map(layer, 1, 3, 200, 140);
    
    fill(r, g, b, alpha);
    
    beginShape();
    let segments = 10;
    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let x = cx + map(t, 0, 1, -baseWidth, baseWidth);
      
      // 顶部不规则
      let topNoise = noise(fireTime * 2 + i * 0.5 + layer * 10) * 8;
      let y = baseY - baseHeight + topNoise;
      
      vertex(x, y);
    }
    
    // 底部连接到木柴
    vertex(cx + baseWidth, cy + 12);
    vertex(cx - baseWidth, cy + 12);
    endShape(CLOSE);
  }
  
  pop();
}

function drawFirewoodWithEmbers(cx, cy) {
  push();
  rectMode(CENTER);
  
  // === 木柴 1（左下） ===
  push();
  translate(cx - 25, cy + 35);
  rotate(radians(-30));
  
  // 木柴主体
  fill(45, 30, 20);
  rect(0, 0, 120, 18, 9);
  
  // 木柴纹理（深色条纹）
  fill(35, 22, 15);
  rect(-15, 0, 8, 18);
  rect(20, 0, 6, 18);
  
  // 木柴高光（受火光照亮的一侧）
  fill(65, 45, 30, 100);
  rect(-30, -3, 40, 8);
  pop();
  
  // === 木柴 2（右下） ===
  push();
  translate(cx + 20, cy + 32);
  rotate(radians(35));
  
  fill(42, 28, 18);
  rect(0, 0, 115, 17, 8);
  
  // 纹理
  fill(32, 20, 13);
  rect(-20, 0, 7, 17);
  rect(15, 0, 5, 17);
  
  // 高光
  fill(62, 42, 28, 100);
  rect(25, -2, 35, 7);
  pop();
  
  // === 木柴 3（后面，较暗） ===
  push();
  translate(cx - 5, cy + 38);
  rotate(radians(-10));
  
  fill(38, 25, 17);
  rect(0, 0, 100, 15, 7);
  
  fill(28, 18, 12);
  rect(-10, 0, 6, 15);
  pop();
  
  pop();
  
  // === 炭火效果（保持原有，稍微调整） ===
  for (let i = 0; i < 10; i++) {  // 从 8 增加到 10
    let glowX = cx + random(-50, 50);
    let glowY = cy + 30 + random(-12, 12);
    let glowSize = random(4, 14) * fireIntensity;
    let pulseAlpha = map(sin(fireTime * 2.5 + i * 0.8), -1, 1, 30, 100);
    
    // 炭火核心
    fill(255, 85, 20, pulseAlpha);
    circle(glowX, glowY, glowSize);
    
    // 炭火光晕
    fill(200, 50, 15, pulseAlpha * 0.3);
    circle(glowX, glowY, glowSize * 2.5);
  }
}

function drawFlameLayer(cx, cy, radiusBase, heightBase, colorRGB, alpha, intensityMult) {
  // 整体下移
  cy += flameOffsetY;

  // 高度和宽度：稍微“呼吸”一下，不要太死板
  let pulse = 1 + 0.05 * sin(fireTime * 3.0 + heightBase * 0.1);
  let h = heightBase * fireIntensity * intensityMult * 0.95 * pulse;
  let r = radiusBase * (1.35 + fireIntensity * 0.1);


  // 轻微左右晃动 + 风
  let sway = sin(fireTime * 1.8 + heightBase * 0.07) * 3;
  let topX = cx + sway + windOffset * 0.12;
  let topY = cy - h;

  // 底部基线（尽量靠近木柴）
  let baseY = cy + 6;

  // 顶部圆润程度
  let topRadius = r * 0.65;                       // 越大越圆
  let topCurveY = lerp(topY, baseY, 0.32);       // 数字越大，顶部越圆鼓、越不尖

  fill(colorRGB[0], colorRGB[1], colorRGB[2], alpha);

  beginShape();

  // ===== 顶部圆润尖（不是针一样的尖） =====
  // 先到火焰尖
  vertex(topX, topY);

  // 从尖往右侧的圆弧
  bezierVertex(
    topX + topRadius * 0.5, topCurveY,            // 控制点1
    topX + topRadius * 0.5, topCurveY,            // 控制点2
    cx + r * 0.55, lerp(topY, baseY, 0.55)        // 右侧中段
  );

  // ===== 右侧往下，到右下角 =====
  bezierVertex(
    cx + r * 0.9,  lerp(topY, baseY, 0.9),        // 靠近底部的控制点
    cx + r * 0.6,  baseY + 10,                    // 底部右控制点
    cx + r * 0.4,  baseY                          // 底部右端点
  );

  // ===== 圆圆的底部，从右到底左 =====
  bezierVertex(
    cx + r * 0.18, baseY + 10,                    // 右下弧控制点
    cx - r * 0.18, baseY + 10,                    // 左下弧控制点
    cx - r * 0.4,  baseY                          // 底部左端点
  );

  // ===== 左侧往上 =====
  bezierVertex(
    cx - r * 0.6,  baseY + 10,                    // 左下控制点
    cx - r * 0.9,  lerp(topY, baseY, 0.9),        // 靠近底部的左侧控制点
    cx - r * 0.55, lerp(topY, baseY, 0.55)        // 左侧中段
  );

  // ===== 左侧回到顶部圆弧，再收回尖端 =====
  bezierVertex(
    topX - topRadius * 0.5, topCurveY,            // 左上弧控制点1
    topX - topRadius * 0.2, topCurveY,            // 左上弧控制点2
    topX, topY                                    // 回到顶部尖端
  );

  endShape(CLOSE);
}

function drawFlameGlow(cx, cy) {
  drawingContext.save();
  drawingContext.globalCompositeOperation = 'lighter';
  drawingContext.filter = 'blur(15px)';
  
  fill(255, 190, 90, 50 * fireIntensity);
  ellipse(cx + windOffset * 0.25, cy - 45, 95, 135);
  
  drawingContext.filter = 'none';
  drawingContext.restore();
}



// ============================================
// 粒子（内部热点、烟雾、火星、灰烬）
// ============================================

function initializeInnerSparks(count) {
  innerSparks = [];
  for (let i = 0; i < count; i++) {
    innerSparks.push({
      angle: random(TWO_PI),
      radius: random(12, 38),
      speed: random(0.015, 0.045),
      size: random(2.5, 7),
      life: random(0.8, 1),
      orbitSpeed: random(0.8, 1.2)
    });
  }
}

function drawInnerSparks(cx, cy) {
  for (let spark of innerSparks) {
    spark.angle += spark.speed * spark.orbitSpeed;
    spark.life -= 0.008;
    
    if (spark.life <= 0) {
      spark.life = random(0.7, 1);
      spark.radius = random(12, 38);
      spark.angle = random(TWO_PI);
    }
    
    let x = cx + cos(spark.angle) * spark.radius * fireIntensity;
    let y = cy - 35 + sin(spark.angle) * spark.radius * 0.55;
    
    let alpha = spark.life * 220 * fireIntensity;
    
    fill(255, 245, 210, alpha);
    circle(x, y, spark.size * spark.life);
    
    fill(255, 200, 140, alpha * 0.35);
    circle(x, y, spark.size * spark.life * 2.2);
  }
}

function initializeSmoke(count) {
  smoke = [];
  for (let i = 0; i < count; i++) {
    smoke.push(createSmokeParticle());
  }
}

function createSmokeParticle() {
  return {
    x: random(-25, 25),
    y: -65,
    speed: random(0.25, 0.65),
    size: random(18, 45),
    life: random(0.65, 1),
    wobble: random(TWO_PI),
    wobbleSpeed: random(0.018, 0.038)
  };
}

function drawSmoke(cx, cy) {
  for (let s of smoke) {
    s.y -= s.speed;
    s.wobble += s.wobbleSpeed;
    s.size += 0.2;  
    s.life -= 0.005;  
    
    let drift = sin(s.wobble) * 20 + windOffset * 0.7;  
    let alpha = s.life * 35;  // 
    
    fill(85, 90, 95, alpha);  // 
    circle(cx + s.x + drift, cy + s.y, s.size);
    
    if (s.y < -220 || s.life <= 0) {  
      Object.assign(s, createSmokeParticle());
    }
  }
}

function initializeEmbers(count) {
  embers = [];
  for (let i = 0; i < count; i++) {
    embers.push(createEmber());
  }
}

function createEmber() {
  return {
    x: random(-35, 35),
    y: random(-12, 8),
    speed: random(0.4, 1.6),
    size: random(1.5, 5.5),
    life: random(0.4, 1),
    wobble: random(TWO_PI),
    brightness: random(0.65, 1),
    wobbleSpeed: random(0.04, 0.08)
  };
}

function drawEmbers(cx, cy) {
  for (let ember of embers) {
    ember.y -= ember.speed;
    ember.wobble += ember.wobbleSpeed;
    
    let drift = sin(ember.wobble) * 2.5 + cos(ember.wobble * 0.7) * 1.5 + windOffset * 0.35;
    let travelDistance = abs(ember.y);
    let maxDistance = 130;
    let fadeAlpha = map(travelDistance, 0, maxDistance, 250 * ember.life, 0);
    fadeAlpha = constrain(fadeAlpha, 0, 255);
    
    let colorProgress = pow(travelDistance / maxDistance, 0.7);
    let emberColor = lerpColor(
      color(255, 150, 70),
      color(255, 245, 230),
      colorProgress
    );
    
    fill(red(emberColor), green(emberColor), blue(emberColor), fadeAlpha * ember.brightness);
    circle(cx + ember.x + drift, cy + ember.y, ember.size);
    
    fill(red(emberColor), green(emberColor), blue(emberColor), fadeAlpha * 0.28);
    circle(cx + ember.x + drift, cy + ember.y, ember.size * 2.8);
    
    if (fadeAlpha <= 5 || ember.y < -maxDistance) {
      Object.assign(ember, createEmber());
    }
  }
}

function initializeAsh(count) {
  ashParticles = [];
  for (let i = 0; i < count; i++) {
    ashParticles.push(createAshParticle());
  }
}

function createAshParticle() {
  return {
    x: random(-40, 40),
    y: random(-5, 5),
    speed: random(0.15, 0.45),
    size: random(3.5, 10),
    rotation: random(TWO_PI),
    rotationSpeed: random(-0.025, 0.025),
    wobble: random(TWO_PI),
    life: random(0.55, 1)
  };
}

function drawAsh(cx, cy) {
  for (let ash of ashParticles) {
    ash.y -= ash.speed;
    ash.wobble += 0.025;
    ash.rotation += ash.rotationSpeed;
    
    let drift = sin(ash.wobble) * 3.5 + windOffset * 0.45;
    let travelDistance = abs(ash.y);
    let maxDistance = 110;
    let fadeAlpha = map(travelDistance, 0, maxDistance, 160 * ash.life, 0);
    
    push();
    translate(cx + ash.x + drift, cy + ash.y);
    rotate(ash.rotation);
    
    fill(170, 95, 55, fadeAlpha);
    rect(-ash.size / 2, -ash.size / 2, ash.size, ash.size * 0.75, 2);
    pop();
    
    if (fadeAlpha <= 5 || ash.y < -maxDistance) {
      Object.assign(ash, createAshParticle());
    }
  }
}

// ============================================
// 背包系统 - 完整代码
// ============================================
// 初始化背包
function initializeBackpack() {
  let fireX = width / 2;
  let fireY = height / 2 + CONFIG.firePosition.yOffset;
  
  // 背包在篝火右侧
  let angle = random(PI * 0.2, PI * 0.4);
  let distance = random(150, 180);
  
  backpackIcon.x = fireX + cos(angle) * distance;
  backpackIcon.y = fireY + sin(angle) * distance;
  
  backpackIcon.x = constrain(backpackIcon.x, 100, width - 100);
  backpackIcon.y = constrain(backpackIcon.y, height * 0.75, height - 50);
  
  // 背包面板位置（屏幕中央）
  backpackPanel.x = (width - backpackPanel.width) / 2;
  backpackPanel.y = (height - backpackPanel.height) / 2;
  
  // 初始化背包物品（所有物品都在背包里）
  backpackIcon.items = availableItems.slice();
}

// 绘制场景中的背包图标
function drawSceneBackpack(fireX, fireY) {
  push();
  
  // 计算背包到篝火的距离（用于火光影响）
  let distToFire = dist(backpackIcon.x, backpackIcon.y, fireX, fireY);
  let fireInfluence = constrain(map(distToFire, 80, 250, 1, 0), 0, 1);
  
  // 检测鼠标悬停
  let isHovering = isMouseOverBackpack();
  
  // 轻微的呼吸动画
  let breathe = sin(fireTime * 2) * 0.03 + 1;
  backpackIcon.sceneScale = lerp(backpackIcon.sceneScale, 
                                  isHovering ? 1.15 : breathe, 
                                  0.1);
  
  translate(backpackIcon.x, backpackIcon.y);
  scale(backpackIcon.sceneScale);
  
  // 背包阴影
  fill(0, 0, 0, 40);
  ellipse(3, backpackIcon.size * 0.35, backpackIcon.size * 0.9, backpackIcon.size * 0.3);
  
  // 背包主体（受火光影响）
  let backpackBaseColor = color(80, 70, 60);
  let backpackFireColor = color(140, 110, 80);
  let backpackColor = lerpColor(backpackBaseColor, backpackFireColor, 
                                 fireInfluence * fireIntensity * 0.5);
  
  fill(backpackColor);
  stroke(isHovering ? 255 : 200, isHovering ? 220 : 180, isHovering ? 150 : 120, 
         isHovering ? 255 : 180);
  strokeWeight(isHovering ? 3 : 2);
  circle(0, 0, backpackIcon.size);
  
  // 背包图标
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(backpackIcon.size * 0.6);
  text('🎒', 0, 0);
  
  // 物品数量标识
  if (backpackIcon.items.length > 0) {
    fill(255, 180, 60, 230);
    circle(backpackIcon.size * 0.35, -backpackIcon.size * 0.35, 18);
    
    fill(255);
    textSize(11);
    textStyle(BOLD);
    text(backpackIcon.items.length, backpackIcon.size * 0.35, -backpackIcon.size * 0.35);
    textStyle(NORMAL);
  }
  
  // 悬停提示
  if (isHovering && !backpackPanel.visible) {
    fill(40, 50, 60, 220);
    stroke(150, 160, 170);
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, -backpackIcon.size * 0.8, 100, 30, 5);
    
    noStroke();
    fill(255);
    textSize(13);
    text('打开背包', 0, -backpackIcon.size * 0.8);
    
    fill(40, 50, 60, 220);
    triangle(-8, -backpackIcon.size * 0.8 + 15,
             8, -backpackIcon.size * 0.8 + 15,
             0, -backpackIcon.size * 0.8 + 22);
  }
  
  pop();
}

// 检测鼠标是否在背包上
function isMouseOverBackpack() {
  let d = dist(mouseX, mouseY, backpackIcon.x, backpackIcon.y);
  return d < backpackIcon.size * backpackIcon.sceneScale / 2;
}

// 绘制背包面板
function drawBackpackPanel() {
  push();
  
  let px = backpackPanel.x;
  let py = backpackPanel.y;
  let pw = backpackPanel.width;
  let ph = backpackPanel.height;
  
  // 面板背景
  fill(30, 40, 50, 240);
  stroke(150, 160, 170);
  strokeWeight(2);
  rect(px, py, pw, ph, 10);
  
  // 标题栏
  fill(50, 60, 70);
  noStroke();
  rect(px, py, pw, 50, 10, 10, 0, 0);
  
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(20);
  textStyle(BOLD);
  text('🎒 背包', px + 20, py + 25);
  textStyle(NORMAL);
  
  // 关闭按钮
  let closeX = px + pw - 30;
  let closeY = py + 25;
  let closeSize = 25;
  let isHoveringClose = dist(mouseX, mouseY, closeX, closeY) < closeSize / 2;
  
  fill(isHoveringClose ? 220 : 150, isHoveringClose ? 80 : 60, isHoveringClose ? 80 : 60);
  circle(closeX, closeY, closeSize);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('×', closeX, closeY - 1);
  textStyle(NORMAL);
  
  // === 物品网格区域（带滚动） ===
  let gridStartX = px + 20;
  let gridStartY = py + 70;
  let itemSize = 70;
  let itemSpacing = 15;
  let cols = 3;
  let contentAreaHeight = ph - 100;  // 内容区域高度（减去标题栏和底部）
  
  // 计算总行数和总高度
  let rows = Math.ceil(backpackIcon.items.length / cols);
  let totalContentHeight = rows * (itemSize + itemSpacing);
  
  // 计算最大滚动量
  backpackPanel.maxScroll = max(0, totalContentHeight - contentAreaHeight);
  
  // 限制滚动偏移
  backpackPanel.scrollOffset = constrain(backpackPanel.scrollOffset, 0, backpackPanel.maxScroll);
  
  // 👇 开始裁剪区域（只显示内容区域）
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(px + 10, gridStartY, pw - 20, contentAreaHeight);
  drawingContext.clip();
  
  // 绘制物品（应用滚动偏移）
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < backpackIcon.items.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let itemX = gridStartX + col * (itemSize + itemSpacing);
    let itemY = gridStartY + row * (itemSize + itemSpacing) - backpackPanel.scrollOffset;  // 👈 应用滚动
    
    // 只绘制可见的物品（优化性能）
    if (itemY + itemSize < gridStartY || itemY > gridStartY + contentAreaHeight) {
      continue;
    }
    
    let isHovering = mouseX > itemX && mouseX < itemX + itemSize &&
                     mouseY > itemY && mouseY < itemY + itemSize &&
                     mouseY > gridStartY && mouseY < gridStartY + contentAreaHeight;  // 👈 确保在可见区域内
    
    // 物品格子背景
    fill(isHovering ? 60 : 45, isHovering ? 70 : 55, isHovering ? 80 : 65);
    stroke(100, 110, 120);
    strokeWeight(2);
    rect(itemX, itemY, itemSize, itemSize, 5);
    
    // 物品图标
    noStroke();
    textSize(36);
    text(backpackIcon.items[i].emoji, itemX + itemSize / 2, itemY + itemSize / 2 - 5);
    
    // 物品名称
    fill(200, 210, 220);
    textSize(11);
    text(backpackIcon.items[i].name, itemX + itemSize / 2, itemY + itemSize - 8);
    
    // 悬停提示
    if (isHovering) {
      fill(255, 255, 100, 200);
      textSize(12);
      text('点击放置', itemX + itemSize / 2, itemY - 10);
    }
  }
  
  drawingContext.restore();
  pop();
  
  // === 滚动条（如果需要） ===
  if (backpackPanel.maxScroll > 0) {
    let scrollbarX = px + pw - 15;
    let scrollbarY = gridStartY;
    let scrollbarHeight = contentAreaHeight;
    let scrollbarWidth = 6;
    
    // 滚动条背景
    fill(60, 70, 80);
    noStroke();
    rect(scrollbarX, scrollbarY, scrollbarWidth, scrollbarHeight, 3);
    
    // 滚动条滑块
    let thumbHeight = (contentAreaHeight / totalContentHeight) * scrollbarHeight;
    let thumbY = scrollbarY + (backpackPanel.scrollOffset / backpackPanel.maxScroll) * (scrollbarHeight - thumbHeight);
    
    fill(150, 160, 170);
    rect(scrollbarX, thumbY, scrollbarWidth, thumbHeight, 3);
  }
  
  // === 底部提示 ===
  if (backpackIcon.items.length === 0) {
    fill(150, 160, 170);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('背包是空的 🎒', px + pw / 2, py + ph / 2);
  } else {
    fill(100, 110, 120);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('点击物品放置到场景中', px + pw / 2, py + ph - 20);
    
    // 如果有滚动，显示滚动提示
    if (backpackPanel.maxScroll > 0) {
      fill(120, 130, 140);
      textSize(10);
      text('↕ 滚动查看更多', px + pw / 2, py + ph - 35);
    }
  }
  
  pop();
}

// 绘制已放置的物品
function drawPlacedItems(fireX, fireY) {
  push();
  
  for (let i = 0; i < placedItems.length; i++) {
    let item = placedItems[i];
    
    // 计算物品到篝火的距离（火光影响）
    let distToFire = dist(item.x, item.y, fireX, fireY);
    let fireInfluence = constrain(map(distToFire, 50, 300, 1, 0), 0, 1);
    
    // 检测鼠标悬停
    let isHovering = isMouseOverPlacedItem(item);
    
    push();
    translate(item.x, item.y);
    
    // 悬停时稍微放大
    if (isHovering) {
      scale(1.15);
    }
    
    // 物品阴影
    fill(0, 0, 0, 40);
    ellipse(2, item.size * 0.3, item.size * 0.8, item.size * 0.25);
    
    // 物品背景圆形（受火光影响）
    let itemBaseColor = color(90, 85, 80);
    let itemFireColor = color(150, 120, 90);
    let itemColor = lerpColor(itemBaseColor, itemFireColor, 
                               fireInfluence * fireIntensity * 0.4);
    
    fill(itemColor);
    stroke(isHovering ? 255 : 200, isHovering ? 220 : 180, isHovering ? 150 : 120, 
           isHovering ? 255 : 180);
    strokeWeight(isHovering ? 3 : 2);
    circle(0, 0, item.size);
    
    // 物品 emoji
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(item.size * 0.6);
    text(item.emoji, 0, 0);
    
    // 悬停提示
    if (isHovering) {
      fill(255, 255, 255, 200);
      textSize(11);
      text(item.name, 0, -item.size * 0.7);
    }
    
    pop();
  }
  
  pop();
}

// 检测鼠标是否在某个已放置的物品上
function isMouseOverPlacedItem(item) {
  let d = dist(mouseX, mouseY, item.x, item.y);
  return d < item.size / 2;
}

// 绘制放置预览（跟随鼠标）
function drawPlacementPreview() {
  if (!placementMode.item) return;
  
  push();
  
  translate(mouseX, mouseY);
  
  let previewSize = 40;
  
  // 背景圆形
  fill(255, 255, 255, placementMode.previewAlpha * 0.3);
  stroke(255, 255, 255, placementMode.previewAlpha);
  strokeWeight(2);
  circle(0, 0, previewSize);
  
  // 物品 emoji
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(previewSize * 0.6);
  fill(255, 255, 255, placementMode.previewAlpha);
  text(placementMode.item.emoji, 0, 0);
  
  // 提示文字
  fill(255, 255, 255, 200);
  textSize(13);
  text('点击放置', 0, previewSize * 0.8);
  
  pop();
  
  // 预览透明度动画（呼吸效果）
  placementMode.previewAlpha = 120 + sin(frameCount * 0.1) * 30;
}

// ============================================
// 鼠标交互事件
// ============================================

function mousePressed() {
  // 情况 1：在放置模式下，点击场景放置物品
  if (placementMode.active) {
    placeItemInScene();
    return;
  }
  
  // 情况 2：点击场景中的背包图标
  if (isMouseOverBackpack() && !backpackPanel.visible) {
    backpackPanel.visible = true;
    return;
  }
  
  // 情况 3：背包面板打开时的交互
  if (backpackPanel.visible) {
    let px = backpackPanel.x;
    let py = backpackPanel.y;
    let pw = backpackPanel.width;
    let ph = backpackPanel.height;
    
    // 点击面板外部 → 关闭面板
    if (mouseX < px || mouseX > px + pw || mouseY < py || mouseY > py + ph) {
      backpackPanel.visible = false;
      return;
    }
    
    // 点击关闭按钮
    let closeX = px + pw - 30;
    let closeY = py + 25;
    if (dist(mouseX, mouseY, closeX, closeY) < 12.5) {
      backpackPanel.visible = false;
      return;
    }
    
    // 点击物品 → 进入放置模式
    let gridStartX = px + 20;
    let gridStartY = py + 70;
    let itemSize = 70;
    let itemSpacing = 15;
    let cols = 3;
    
    for (let i = 0; i < backpackIcon.items.length; i++) {
      let col = i % cols;
      let row = floor(i / cols);
      
      // 原始（未滚动）位置
      let baseX = gridStartX + col * (itemSize + itemSpacing);
      let baseY = gridStartY + row * (itemSize + itemSpacing);
      
      // 实际屏幕上的位置：Y 轴减去滚动偏移
      let itemX = baseX;
      let itemY = baseY - backpackPanel.scrollOffset;
      
      if (mouseX > itemX && mouseX < itemX + itemSize &&
          mouseY > itemY && mouseY < itemY + itemSize) {
        
        startPlacementMode(backpackIcon.items[i]);
        backpackPanel.visible = false;
        return;
      }
    }
  }
    // 情况 4：详情面板打开时的交互
    if (detailPanel.visible) {
      if (checkDetailPanelButtons(mouseX, mouseY)) {
        return; // 如果点击了面板按钮，不继续检测
      }

      // 点击面板外部 → 关闭面板
      let px = detailPanel.x;
      let py = detailPanel.y;
      let pw = detailPanel.width;
      let ph = detailPanel.height;

      if (mouseX < px || mouseX > px + pw || mouseY < py || mouseY > py + ph) {
        detailPanel.visible = false;
        selectedItem = null;
        return;
      }

      return; // 面板打开时不检测其他物品
    }

    // 情况 5：点击已放置的物品
    for (let item of placedItems) {
      if (isMouseOverPlacedItem(item)) {
        selectedItem = item;
        showDetailPanel(item);
        console.log('点击了物品:', item.name);
        return;
      }
    }
}

function mouseWheel(event) {
  // 只在背包面板打开且鼠标在面板内时响应
  if (backpackPanel.visible) {
    let px = backpackPanel.x;
    let py = backpackPanel.y;
    let pw = backpackPanel.width;
    let ph = backpackPanel.height;
    
    if (mouseX > px && mouseX < px + pw && mouseY > py && mouseY < py + ph) {
      // event.delta 是滚动量（正数向下，负数向上）
      backpackPanel.scrollOffset += event.delta * 0.5;  // 0.5 是滚动速度
      
      // 限制滚动范围
      backpackPanel.scrollOffset = constrain(
        backpackPanel.scrollOffset, 
        0, 
        backpackPanel.maxScroll
      );
      
      return false;  // 阻止页面滚动
    }
  }
}

function mouseMoved() {
  // 在放置模式下，光标改为十字
  if (placementMode.active) {
    cursor(CROSS);
    return;
  }
  
  let shouldShowHand = false;
  
  // 检查是否悬停在背包图标上
  if (isMouseOverBackpack()) {
    shouldShowHand = true;
  }
  
  // 检查是否悬停在已放置的物品上
  for (let item of placedItems) {
    if (isMouseOverPlacedItem(item)) {
      shouldShowHand = true;
      break;
    }
  }
  
  // 检查是否悬停在面板内
  if (backpackPanel.visible) {
    let px = backpackPanel.x;
    let py = backpackPanel.y;
    let pw = backpackPanel.width;
    let ph = backpackPanel.height;
    
    if (mouseX > px && mouseX < px + pw && mouseY > py && mouseY < py + ph) {
      shouldShowHand = true;
    }
  }
  
  cursor(shouldShowHand ? HAND : ARROW);
}

// 进入放置模式
function startPlacementMode(item) {
  placementMode.active = true;
  placementMode.item = item;
  console.log('开始放置:', item.name);
}

// 放置物品到场景
function placeItemInScene() {
  if (!placementMode.item) return;
  
  let newItem = {
    id: Date.now(),
    name: placementMode.item.name,
    emoji: placementMode.item.emoji,
    description: placementMode.item.description,
    x: mouseX,
    y: mouseY -25, // 从更高处开始
    targetY: mouseY,
    velocityY: 0, // 初始速度
    gravity: 0.5, // 重力加速度
    bounce: 0.2, // 弹跳系数
    size: 50,
    dateAdded: new Date().toLocaleDateString(),
    isDropping: true
  };
  
  placedItems.push(newItem);
  placementMode.active = false;
  placementMode.item = null;
  
  console.log('物品已放置！当前场景有', placedItems.length, '个物品');
}

// 更新物品物理状态并绘制
function updateAndDrawPlacedItems() {
  for (let item of placedItems) {
    if (item.isDropping) {
      // 应用重力
      item.velocityY += item.gravity;
      item.y += item.velocityY;
      
      // 检测是否到达目标位置
      if (item.y >= item.targetY) {
        item.y = item.targetY;
        
        // 弹跳效果
        if (Math.abs(item.velocityY) > 0.5) {
          item.velocityY = -item.velocityY * item.bounce;
        } else {
          // 速度很小时停止
          item.velocityY = 0;
          item.isDropping = false;
        }
      }
    }
    
    // 绘制物品
    push();
    textSize(item.size);
    textAlign(CENTER, CENTER);
    text(item.emoji, item.x, item.y);
    pop();
  }
}

// ============================================
// 物品详情面板功能
// ============================================

// 显示物品详情面板
function showDetailPanel(item) {
  detailPanel.visible = true;
  
  // 计算面板位置（在物品旁边，避免超出画布）
  detailPanel.x = item.x + 60;
  detailPanel.y = item.y - detailPanel.height / 2;
  
  // 边界检测
  if (detailPanel.x + detailPanel.width > width) {
    detailPanel.x = item.x - detailPanel.width - 60;
  }
  if (detailPanel.y < 10) {
    detailPanel.y = 10;
  }
  if (detailPanel.y + detailPanel.height > height - 10) {
    detailPanel.y = height - detailPanel.height - 10;
  }
}

// 绘制物品详情面板
// 绘制物品详情面板
function drawDetailPanel() {
  if (!detailPanel.visible || !selectedItem) return;
  
  let px = detailPanel.x;
  let py = detailPanel.y;
  let pw = detailPanel.width;
  let ph = detailPanel.height;
  
  // 半透明背景遮罩
  push();
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, width, height);
  pop();
  
  // === 面板主体背景 ===
  push();
  
  // 外层发光效果
  for (let i = 8; i > 0; i--) {
    fill(100, 150, 200, 15 - i * 1.5);
    noStroke();
    rect(px - i, py - i, pw + i * 2, ph + i * 2, 15 + i);
  }
  
  // 主背景
  fill(45, 52, 64);
  stroke(80, 90, 110);
  strokeWeight(2);
  rect(px, py, pw, ph, 12);
  
  // 顶部装饰条
  fill(60, 70, 85);
  noStroke();
  rect(px, py, pw, 50, 12, 12, 0, 0);
  
  // 标题区域图标
  textSize(28);
  textAlign(LEFT, CENTER);
  text('📦', px + 15, py + 25);
  
  // 标题文字
  fill(255);
  textSize(18);
  textStyle(BOLD);
  text('物品详情', px + 55, py + 25);
  
  // === 关闭按钮 ===
  fill(180, 70, 70);
  stroke(220, 100, 100);
  strokeWeight(2);
  circle(px + pw - 25, py + 25, 28);
  
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('×', px + pw - 25, py + 24);
  
  // === 物品图标展示区 ===
  fill(35, 40, 50);
  stroke(70, 80, 95);
  strokeWeight(2);
  rect(px + pw/2 - 50, py + 70, 100, 100, 8);
  
  noStroke();
  textSize(60);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(selectedItem.emoji, px + pw / 2, py + 120);
  
  // === 物品名称 ===
  fill(255, 220, 150);
  textSize(22);
  textStyle(BOLD);
  text(selectedItem.name, px + pw / 2, py + 190);
  
  // 分隔线
  stroke(70, 80, 95);
  strokeWeight(1);
  line(px + 20, py + 215, px + pw - 20, py + 215);  // 👈 调整位置
  
  // === 描述区域（增加间距）===
  noStroke();
  fill(180, 180, 200);
  textSize(12);
  textAlign(LEFT);
  textStyle(BOLD);
  text('描述:', px + 20, py + 240);  // 👈 从 230 改为 240
  
  fill(200, 200, 220);
  textSize(13);
  textStyle(NORMAL);
  text(selectedItem.description || '暂无描述', px + 20, py + 262, pw - 40, 50);  // 👈 调整位置
  
  // === 记忆笔记区域（增加间距）===
  fill(180, 180, 200);
  textSize(12);
  textStyle(BOLD);
  text('记忆笔记:', px + 20, py + 320);  // 👈 从 295 改为 320
  
  // 笔记输入框（增加高度）
  fill(30, 35, 45);
  stroke(70, 80, 95);
  strokeWeight(2);
  rect(px + 20, py + 340, pw - 40, 80, 5);  // 👈 从 60 高度改为 80，位置从 310 改为 340
  
  // 笔记文字
  fill(150, 160, 180);
  noStroke();
  textSize(12);
  textStyle(NORMAL);
  let noteText = selectedItem.notes || '点击添加笔记...';
  text(noteText, px + 30, py + 352, pw - 60, 65);  // 👈 调整位置和高度
  
  // === 添加日期（向下移动）===
  fill(120, 130, 150);
  textSize(11);
  textAlign(CENTER);
  text('添加于: ' + selectedItem.dateAdded, px + pw / 2, py + 438);  // 👈 从 385 改为 438
  
  // === 收起按钮（保持在底部）===
  let buttonY = py + ph - 55;  // 👈 从 50 改为 55，留更多底部边距
  
  fill(150, 60, 60);
  stroke(180, 80, 80);
  strokeWeight(2);
  rect(px + 20, buttonY, pw - 40, 38, 8);  // 👈 高度从 35 改为 38
  
  fill(255);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('🗑️ 收起物品', px + pw / 2, buttonY + 19);
  
  pop();
}

// 检测详情面板按钮点击
function checkDetailPanelButtons(mx, my) {
  if (!detailPanel.visible || !selectedItem) return false;
  
  let px = detailPanel.x;
  let py = detailPanel.y;
  let pw = detailPanel.width;
  let ph = detailPanel.height;
  
  // 检测关闭按钮 (X)
  let closeDist = dist(mx, my, px + pw - 25, py + 25);
  if (closeDist < 14) {
    detailPanel.visible = false;
    selectedItem = null;
    return true;
  }
  
  // 检测收起按钮
  let buttonY = py + ph - 55;  // 👈 和上面保持一致
  if (mx > px + 20 && mx < px + pw - 20 &&
      my > buttonY && my < buttonY + 38) {  // 👈 高度改为 38
    removeItemFromScene(selectedItem);
    return true;
  }
  
  // 检测笔记区域点击
  if (mx > px + 20 && mx < px + pw - 20 &&
      my > py + 340 && my < py + 420) {  // 👈 调整检测范围
    editItemNotes(selectedItem);
    return true;
  }
  
  return false;
}

// 从场景中移除物品
function removeItemFromScene(item) {
  let index = placedItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    placedItems.splice(index, 1);
    console.log('物品已收起:', item.name);
    
    // 可选：将物品放回背包
    // backpackIcon.items.push({...item}); 
  }
  
  detailPanel.visible = false;
  selectedItem = null;
}

// 编辑物品笔记
function editItemNotes(item) {
  let newNote = prompt('为 ' + item.name + ' 添加记忆笔记:', item.notes || '');
  if (newNote !== null) {
    item.notes = newNote;
    console.log('笔记已更新');
  }
}
// ============================================
// 响应式画布
// ============================================

function windowResized() {
  let w = min(windowWidth, CONFIG.maxWidth);
  let h = min(windowHeight, w * 0.65);
  resizeCanvas(w, h);
  
  initializeStars();
  initializeMoon();
  initializeMountains();
  initializeBackgroundTrees();  
  initializeGroundDetails();
  initializeForegroundBushes();
}