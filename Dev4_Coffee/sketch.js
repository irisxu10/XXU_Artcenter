let particles = [];
let gravity = 0.1;
let isGenerating = false;  // 防止 `draw()` 运行时无效更新

function setup() {
    createCanvas(600, 400);
    background(255);
}

function generateVisualization() {
    // 获取用户输入数据
    let volume = parseFloat(document.getElementById("volume").value);
    let caffeine = parseFloat(document.getElementById("caffeine").value);
    let time = parseFloat(document.getElementById("time").value);
    let flavorDirection = document.getElementById("flavor").value;

    // 清空画布，重新生成背景
    background(255);

    // 清空粒子数组，防止旧数据干扰
    particles = [];

    // 计算风味方向的影响
    let angleOffset = 0;
    if (flavorDirection === "left") angleOffset = -PI / 4;
    if (flavorDirection === "right") angleOffset = PI / 4;
    if (flavorDirection === "up") angleOffset = -PI / 2;
    if (flavorDirection === "down") angleOffset = PI / 2;

    // 生成新的粒子
    for (let i = 0; i < volume / 5; i++) {
        let speed = map(time, 1, 15, 2, 8);  // 控制洒落速度
        let size = random(4, 12);  // 粒子大小
        let alpha = map(caffeine, 0.5, 5, 200, 80);  // 控制透明度
        let colorShade = map(caffeine, 0.5, 5, 80, 30);  // 颜色深度

        particles.push(new CoffeeParticle(width / 2, height / 2, speed, angleOffset, size, alpha, colorShade));
    }

    // 标记生成状态，确保 `draw()` 更新
    isGenerating = true;
}

function draw() {
    if (!isGenerating) return;

    for (let i = 0; i < particles.length; i++) {
        particles[i].move();
        particles[i].show();
    }
}

// 粒子类
class CoffeeParticle {
    constructor(x, y, speed, angleOffset, size, alpha, colorShade) {
        this.x = x;
        this.y = y;
        this.vx = speed * cos(angleOffset + random(-0.2, 0.2)); // 随机扰动方向
        this.vy = speed * sin(angleOffset + random(-0.2, 0.2));
        this.size = size;
        this.alpha = alpha;
        this.colorShade = colorShade;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += gravity; // 重力作用
    }

    show() {
        noStroke();
        fill(this.colorShade, this.colorShade * 0.7, 20, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}
