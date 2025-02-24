let particles = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvas-container"); // **确保画布放入正确的 div**
    angleMode(RADIANS);
    noLoop();
}

// **绘制坐标轴**
function drawAxis() {
    stroke(0, 50);
    strokeWeight(1);

    // **X 轴（Time to Enjoy）**
    line(50, height - 50, width - 50, height - 50);
    textSize(14);
    textAlign(RIGHT, BOTTOM);
    fill(0, 100);
    text("Time to Enjoy (min)", width - 60, height - 55); 

    // **Y 轴（Total Volume）**
    line(50, 50, 50, height - 50);
    textAlign(LEFT, TOP);
    text("Total Volume (ml)", 55, 50);
}

// **生成粒子**
function generateVisualization() {
    background(255);
    drawAxis();
    particles = [];

    // **获取用户输入**
    let volume = parseFloat(document.getElementById("volumeInput").value);
    let shots = parseFloat(document.getElementById("shotsInput").value);
    let time = parseFloat(document.getElementById("timeInput").value);
    let flavorKey = document.getElementById("flavor").value;

    // **计算风味方向**
    let flavorAngle = getFlavorAngle(flavorKey);

    let maxTime = 60;
    let maxVolume = 500;

    // **计算扩散范围**
    let spreadX = map(time, 0, maxTime, 50, 250);
    let spreadY = map(volume, 0, maxVolume, 50, 300);
    let density = map(shots / volume, 0.002, 0.1, 1200, 8000);

    createParticles(flavorAngle, spreadX, spreadY, density, flavorKey);
}

// **获取风味方向角度**
function getFlavorAngle(flavor) {
    let angles = {
        "sweet": -5 * PI / 6,  
        "fruity": -PI / 2,      
        "sour": -PI / 3,        
        "vegetative": 0,        
        "other": PI / 6,        
        "roasted": PI / 2,      
        "spices": 2 * PI / 3,   
        "nutty": PI,            
        "floral": -2 * PI / 3   
    };
    return angles[flavor] || 0;
}

// **获取风味颜色**
function getGradientColor(flavor, alpha) {
    let baseColors = {
        "floral": color(255, 182, 193, alpha),  // Pink
        "fruity": color(255, 99, 71, alpha),    // Tomato
        "sour": color(255, 215, 0, alpha),      // Gold
        "vegetative": color(34, 139, 34, alpha),// ForestGreen
        "other": color(0, 191, 255, alpha),     // DeepSkyBlue
        "roasted": color(139, 69, 19, alpha),   // SaddleBrown
        "spices": color(210, 105, 30, alpha),   // Chocolate
        "nutty": color(160, 82, 45, alpha),     // Sienna
        "sweet": color(255, 140, 0, alpha)      // DarkOrange
    };
    return baseColors[flavor] || color(0, alpha);
}

// **创建粒子**
function createParticles(angle, spreadX, spreadY, density, flavorKey) {
    for (let i = 0; i < density; i++) {
        let r = random(5, spreadY);
        let theta = angle + random(-PI / 8, PI / 8);  

        let x = width / 2 + r * cos(theta) + random(-spreadX / 2, spreadX / 2);
        let y = height / 2 + r * sin(theta) + random(-spreadY / 2, spreadY / 2);

        let noiseOffset = noise(x * 0.01, y * 0.01) * 20 - 10;
        x += noiseOffset;
        y += noiseOffset;

        y += map(r, 0, spreadY, 0, 40);  

        let size = random(3, 7);  // **让粒子更自然**
        let alpha = map(r, 0, spreadY, 220, 50); // **边缘更透明**

        let gradientColor = getGradientColor(flavorKey, alpha);

        particles.push({ x, y, size, gradientColor });
    }

    drawParticles();
}

// **绘制粒子**
function drawParticles() {
    noStroke();
    for (let p of particles) {
        fill(p.gradientColor);
        ellipse(p.x, p.y, p.size);
    }
}

function saveImage() {
    saveCanvas('my_coffee_visualization', 'png'); // **保存为 PNG**
}
