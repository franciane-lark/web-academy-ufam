const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.querySelector("#colorPicker");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) { h = s = 0; } 
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

class Shape {
  constructor(x, y, velX, velY, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.lightness = random(30, 70);
    this.shapeType = ['circle', 'square', 'triangle', 'hexagon'][random(0, 3)];
  }


  draw() {
    const baseColor = hexToHSL(colorPicker.value);
    ctx.beginPath();
    ctx.fillStyle = `hsl(${baseColor.h}, ${baseColor.s}%, ${this.lightness}%)`;

    if (this.shapeType === 'circle') {
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    } else {
      
      const sides = this.shapeType === 'triangle' ? 3 : (this.shapeType === 'square' ? 4 : 6);
      const angle = (Math.PI * 2) / sides;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.atan2(this.velY, this.velX));
      for (let i = 0; i < sides; i++) {
        ctx.lineTo(this.size * Math.cos(angle * i), this.size * Math.sin(angle * i));
      }
      ctx.restore();
    }
    
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) this.velX = -this.velX;
    if (this.y + this.size >= height || this.y - this.size <= 0) this.velY = -this.velY;
    this.x += this.velX;
    this.y += this.velY;
  }


  collisionDetect() {
    for (const other of shapes) {
      if (!(this === other)) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + other.size) {
          this.lightness = random(20, 90);
          other.lightness = random(20, 90);
        }
      }
    }
  }
}


const shapes = [];
while (shapes.length < 30) {
  const size = random(15, 25);
  const shape = new Shape(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    size
  );
  shapes.push(shape);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const shape of shapes) {
    shape.draw();
    shape.update();
    shape.collisionDetect();
  }
  requestAnimationFrame(loop);
}

 
loop();