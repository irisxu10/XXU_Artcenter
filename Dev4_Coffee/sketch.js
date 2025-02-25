let particles = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvas-container");
    angleMode(RADIANS);
    noLoop();
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

    // **获取 Brew Method / 日期 / 天气 / 心情**
    let date = document.getElementById("dateInput").value || "No Date";
    let weather = document.getElementById("weather").value;
    let mood = document.getElementById("mood").value;
    let brewMethod = document.getElementById("brewMethod").value;

    // **计算风味方向**
    let flavorAngle = getFlavorAngle(flavorKey);

    let maxTime = 60;
    let maxVolume = 500;

    // **计算扩散范围**
    let spreadX = map(time, 0, maxTime, 50, 250);
    let spreadY = map(volume, 0, maxVolume, 50, 300);
    let density = map(shots / volume, 0.002, 0.1, 1200, 8000);

    // **创建粒子**
    createParticles(flavorAngle, spreadX, spreadY, density, flavorKey);

    // **绘制 Brew Method / 日期 / 天气 / 心情**
    drawVisualizationInfo(date, weather, mood, brewMethod);
}

// **绘制 Brew Method / 日期 / 天气 / 心情**
function drawVisualizationInfo(date, weather, mood, brewMethod) {
    textSize(14);
    fill(50);
    textAlign(LEFT, TOP);

    let displayText = [];

    // **检查 Show Date 复选框是否勾选**
    if (document.getElementById("showDate").checked && date !== "No Date") {
        displayText.push(date);
    }

    if (weather !== "none") {
        displayText.push(weather);
    }

    if (mood !== "none") {
        displayText.push(mood);
    }

    if (displayText.length > 0) {
        text(displayText.join("  "), 20, 20);
    }

    if (brewMethod !== "none") {
        textSize(14);
        textAlign(RIGHT, TOP);
        text(`Brew: ${brewMethod}`, width - 20, 20);
    }
}

// **绘制坐标轴**
function drawAxis() {
    stroke(0, 50);
    strokeWeight(2);

    let axisLength = width * 0.5;
    
    // **X 轴**
    let xCenter = width / 2;
    let yBottom = height - 50;
    line(xCenter - axisLength / 2, yBottom, xCenter + axisLength / 2, yBottom);

    line(xCenter - axisLength / 2, yBottom, xCenter - axisLength / 2 + 3, yBottom - 3);
    line(xCenter - axisLength / 2, yBottom, xCenter - axisLength / 2 + 3, yBottom + 3);
    
    line(xCenter + axisLength / 2, yBottom, xCenter + axisLength / 2 - 3, yBottom - 3);
    line(xCenter + axisLength / 2, yBottom, xCenter + axisLength / 2 - 3, yBottom + 3);
    
    textSize(8);
    textAlign(CENTER, TOP);
    fill(0, 100);
    text("Time to Enjoy (min)", xCenter, yBottom + 12);

    let yCenter = height / 2;
    let xLeft = 50;
    line(xLeft, yCenter - axisLength / 2, xLeft, yCenter + axisLength / 2);

    line(xLeft, yCenter - axisLength / 2, xLeft - 3, yCenter - axisLength / 2 + 3);
    line(xLeft, yCenter - axisLength / 2, xLeft + 3, yCenter - axisLength / 2 + 3);
    
    line(xLeft, yCenter + axisLength / 2, xLeft - 3, yCenter + axisLength / 2 - 3);
    line(xLeft, yCenter + axisLength / 2, xLeft + 3, yCenter + axisLength / 2 - 3);

    textAlign(CENTER, BOTTOM);
    text("Total Volume (ml)", xLeft, yCenter - axisLength / 2 - 10);
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
    // return angles[flavor] || 0;
    return angles[flavor] || random(TWO_PI); // **"Not Sure" 随机方向**
}

// **获取随机颜色**
function getRandomColor(alpha) {
    return color(random(255), random(255), random(255), alpha);
}

// **获取风味颜色**
function getGradientColor(flavor, alpha) {
    let baseColors = {
        "floral": color(255, 182, 193, alpha),
        "fruity": color(255, 99, 71, alpha),
        "sour": color(255, 215, 0, alpha),
        "vegetative": color(34, 139, 34, alpha),
        "other": color(0, 191, 255, alpha),
        "roasted": color(139, 69, 19, alpha),
        "spices": color(210, 105, 30, alpha),
        "nutty": color(160, 82, 45, alpha),
        "sweet": color(255, 140, 0, alpha)
    };
    // return baseColors[flavor] || color(0, alpha);
    return flavor === "not_sure" ? getRandomColor(alpha) : baseColors[flavor] || color(0, alpha);  
}

// **创建粒子**
function createParticles(angle, spreadX, spreadY, density, flavorKey) {
    let tempParticles = [];
    let sumX = 0;
    let sumY = 0;

    if (flavorKey === "not_sure") {
        // **"Not Sure" 颜色随机，粒子从中心向外扩散**
        for (let i = 0; i < density; i++) {
            let r = random(0, spreadY / 2);  // 受 total volume 影响
            let theta = random(TWO_PI);  // 360° 随机方向

            let x = width / 2 + r * cos(theta) + random(-spreadX / 4, spreadX / 4); // 控制扩散范围
            let y = height / 2 + r * sin(theta) + random(-spreadY / 4, spreadY / 4);

            let noiseOffsetX = noise(x * 0.01) * 20 - 10;
            let noiseOffsetY = noise(y * 0.01) * 20 - 10;
            x += noiseOffsetX;
            y += noiseOffsetY;

            let size = random(3, 7);
            let alpha = map(r, 0, spreadY / 2, 220, 50);
            let gradientColor = color(random(255), random(255), random(255), alpha);  // 随机颜色

            tempParticles.push({ x, y, size, gradientColor });
            sumX += x;
            sumY += y;
        }
    } else {
        // **保留原有风味粒子生成方式**
        for (let i = 0; i < density; i++) {
            let r = random(5, spreadY);
            let theta = angle + random(-PI / 8, PI / 8);  

            let x = width / 2 + r * cos(theta) + random(-spreadX / 2, spreadX / 2);
            let y = height / 2 + r * sin(theta) + random(-spreadY / 2, spreadY / 2);

            let noiseOffset = noise(x * 0.01, y * 0.01) * 20 - 10;
            x += noiseOffset;
            y += noiseOffset;

            y += map(r, 0, spreadY, 0, 40);  

            let size = random(3, 7);
            let alpha = map(r, 0, spreadY, 220, 50);
            let gradientColor = getGradientColor(flavorKey, alpha);

            tempParticles.push({ x, y, size, gradientColor });
            sumX += x;
            sumY += y;
        }
    }

    // **计算粒子群的中心**
    let centerX = sumX / density;
    let centerY = sumY / density;

    // **调整粒子位置，使其整体居中**
    let offsetX = width / 2 - centerX;
    let offsetY = height / 2 - centerY;

    particles = tempParticles.map(p => ({
        x: p.x + offsetX,
        y: p.y + offsetY,
        size: p.size,
        gradientColor: p.gradientColor
    }));

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

// **保存图片**
function saveImage() {
    saveCanvas('my_coffee_visualization', 'png');
}

// **缓存已生成的图片（不会下载，只存储到网页）**
function saveImageToHistory() {
    let img = get(); // 获取当前画布
    let imgData = img.canvas.toDataURL(); // 转换成 base64 图片

    let storedImages = JSON.parse(localStorage.getItem("coffeeImages")) || [];

    // 限制最多存 31 张图片
    if (storedImages.length >= 31) {
        storedImages.pop(); // 删除最旧的一张
    }

    storedImages.unshift(imgData); // **新图片插入最前面**
    localStorage.setItem("coffeeImages", JSON.stringify(storedImages));

    updateImageHistory(); // 刷新显示
}

// **下载图片（不会缓存，只下载）**
function downloadImage() {
    saveCanvas('my_coffee_visualization', 'png'); // 直接下载 PNG
}

// **更新图片历史**
function updateImageHistory() {
    let storedImages = JSON.parse(localStorage.getItem("coffeeImages")) || [];
    let imageContainer = document.querySelector(".image-history");

    imageContainer.innerHTML = ""; // 清空旧的

    storedImages.forEach((imgData, index) => {
        let imgElement = document.createElement("img");
        imgElement.src = imgData;
        imgElement.alt = `Saved Image ${index + 1}`;
        imgElement.onclick = () => showLargeImage(imgData);
        imageContainer.appendChild(imgElement);
    });
}

// **查看大图（支持 ESC 关闭）**
function showLargeImage(imgSrc) {
    let overlay = document.createElement("div");
    overlay.className = "image-overlay"; // 统一样式
    overlay.onclick = closeLargeImage;

    let img = document.createElement("img");
    img.src = imgSrc;
    img.className = "large-image";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // 监听 ESC 键关闭
    document.addEventListener("keydown", escCloseLargeImage);
}

// **关闭大图**
function closeLargeImage() {
    let overlay = document.querySelector(".image-overlay");
    if (overlay) {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", escCloseLargeImage);
    }
}

// **ESC 关闭大图**
function escCloseLargeImage(event) {
    if (event.key === "Escape") {
        closeLargeImage();
    }
}

// **初始化历史记录**
window.onload = () => {
    updateImageHistory();
};
