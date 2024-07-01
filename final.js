let marble;
let rv;
let gv;
let bld;
let street;
let snow;
let err;
let side;
let ch4;
let floortexture;
let errorSound;
let backgroundSound;
let glitch;
let glitchPop;
let glitchPosition;
let glitchSound;

//눈 상수
const snowflakes = [];
const ground = [];
const minSpeed = 0.5;
const maxSpeed = 2;
//에러 변수
let errorModal;
let glitches = [];
let glitchCount = 0;
let count = 0;
let showModalTimer;
let modalPosition;
let modalPosition2;
let modalPosition3;

//건물 변수
let h1 = 30;
let rad = 20;
let widepth = 600;
let h2 = 120;
let h3 = 300;
let colummWh = 25;

//이미지로드
function preload() {
  marble = loadImage("bldtexture2.jpg");
  rv = loadImage("redvelvet.jpg");
  side = loadImage("side.gif");
  ch4 = loadImage("ch4.gif");
  gv = loadImage("gv.jpg");
  floortexture = loadImage("street.jpg");
  errorSound = loadSound("error2.wav");
  glitchSound = loadSound("shortglitchsound.wav");
  glitchPop = loadImage("glitch1.gif");
  backgroundSound = loadSound("ba.mp3");
  
  
}

//엔터키
function keyPressed() {
  if (keyCode === ENTER && errorModal.modalVisible) {
    glitchSound.play();
    errorModal.modalVisible = false;
    //이전에 생성된 글리치를 glitches array에 저장
    glitches[glitchCount] = new Glitch(modalPosition.x, modalPosition.y);
    glitches[glitchCount + 1] = new Glitch(modalPosition2.x, modalPosition2.y);
    glitches[glitchCount + 2] = new Glitch(modalPosition3.x, modalPosition3.y);
    glitchCount += 3;
    count++;
  }


}

//processing random interval 
function getRandomInterval() {
  return Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000; // 3초에서 10초 사이의 랜덤 간격
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
  backgroundSound.play();
  bld = new Bld();
  street = new Street();
  snow = new Snow();
  errorModal = new ErrorModal();
  
  //눈 setup
  for (let i = 0; i < 5000; i++) {
    snowflakes.push(
      createVector(random(widepth * 3), random(height * 2), random(widepth * 3))
    );
  }
  for (let x = 0; x < widepth * 3; x++) {
    ground[x] = height * 2;
  }
  
 // 에러창 처음 15초 동안은 보이지 않도록 설정
setTimeout(function() {
  errorModal.modalVisible = true;
  errorSound.play();
  // 일정한 간격으로 모달이 나오도록 타이머 설정
  showModalTimer = setInterval(() => {
    if (!errorModal.modalVisible) {
      errorModal.modalVisible = true;
      errorSound.play();
      modalPosition = createVector(random(-50, 50), random(-100, 100), 0);
      modalPosition2 = createVector(random(-50, 50), random(-100, 100), 0);
      modalPosition3 = createVector(random(-50, 50), random(-100, 100), 0);
      // redraw(); // 이 부분을 주석 처리
    }
  }, getRandomInterval());
}, 16000);


  // 초기 랜덤 위치 설정
  modalPosition = createVector(random(-125, 125), random(-100, 100), 0);
  modalPosition2 = createVector(random(-75, 75), random(-100, 100), 0);
  modalPosition3 = createVector(random(-125, 125), random(-100, 100), 0);
}

//glitches[]에 저장된 글리치 draw
function drawGlitches(x) {
  for (let m = 0; m < glitchCount; m++) {
    if (glitches[m].glitchVisible && m % 3 == x) {
      glitches[m].draw();
    }
  }
}
// setTimeout(function() {
//   backgroundSound.play();
// }, 1000); // 1초 후에 재생


function draw() {
  background(0, 0, 30);
  //조명
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 500);
  pointLight(255, 255, 255, -300, 0, -300);
  //pointLight(255,255,255, 300, 900, 300);
  
  
  if (count === 5) {
  const newScript = document.createElement('script');
  newScript.src = 'modal.js';
  document.head.appendChild(newScript);
  newScript.onload = function() {
    setup();
    // draw();
  };
}


 


 
  orbitControl(0,0,0);
  push();
  rotate(PI/4);
  camera(0, 0, 500);
  pop();
  push();
  //translate(0, 100, 0);
  scale(0.8);
  rotateY(PI / 4);
  imageMode(CENTER);

  //좌표축
  line(0, windowWidth, 0, 0, -windowWidth, 0);
  line(-windowWidth, 0, 0, windowWidth, 0, 0);
  line(0, 0, -windowWidth, 0, 0, +windowWidth);
  
  //구조물drawing
  push();
  translate(0, 200, 0);
  snow.display();
  bld.display();
  street.display();

  //좌측 패널
  push();
  rotateY(-PI / 2);
  translate(-100, -h1 * 2 - h2 - h3 / 2, 302);
  drawGlitches(0);
  translate(modalPosition.x, modalPosition.y);
  if (errorModal.modalVisible) {
    errorModal.draw();
  }
  pop();
  
  //중앙 패널
  push();
  rotateY((-PI * 1) / 4);
  translate(0, -h1 * 2 - h2 - h3 / 2, 200 * Math.sqrt(2) + 2);
  drawGlitches(1);
  translate(modalPosition2.x, modalPosition2.y);
  if (errorModal.modalVisible) {
    errorModal.draw();
  }
  pop();
  
  //우측 패널
  push();
  translate(100, -h1 * 2 - h2 - h3 / 2, 302);
  drawGlitches(2);
  translate(modalPosition3.x, modalPosition3.y);
  if (errorModal.modalVisible) {
    errorModal.draw();
  }
  pop();
  
}

class Snow {
  constructor() {
  }
  display() {
    push();
    rectMode(CENTER);
    translate(-widepth * 1.5, -height * 2, -widepth * 1.5);
    for (const snowflake of snowflakes) {
      snowflake.y += random(minSpeed, maxSpeed);
      push();
      fill("white");
      noStroke();
      translate(snowflake.x, snowflake.y, snowflake.z);
      sphere(2);
      pop();
      if (snowflake.y >= ground[floor(snowflake.x)]) {
        ground[floor(snowflake.x)]--;
        snowflake.x = random(widepth * 3);
        snowflake.y = 0;
      }
    }
    pop();
  }
}
class ErrorModal {
  constructor() {
    this.x = random(-50, 50);
    this.y = random(-50, 50);
    this.modalWidth = 150;
    this.modalHeight = 100;
    this.fontSize = 8;
    this.fontLoaded = false;
    this.modalVisible = false;

    // Load font asynchronously
    this.font = loadFont("Galmuri11-Bold.ttf", () => {
      this.fontLoaded = true;
      redraw();
    });
  }

  draw() {
    if (!this.fontLoaded) {
      // Wait for the font to load
      return;
    }

    push();
    rectMode(CENTER);
    stroke(0); // Set outline color to black
    strokeWeight(1);
    fill(193, 193, 193);

    let modalX = this.modalWidth / 2;
    let modalY = this.modalHeight / 2;

    //rect(modalX, modalY, this.modalWidth, this.modalHeight, 0, 0, 0, 0);
    rect(0, 0, this.modalWidth, this.modalHeight, 0, 0, 0, 0);
    this.drawShadow(modalX, modalY);
    translate(0,0,1);
    this.drawHeader(modalX, modalY);
    translate(0,0,1);
    this.drawButtons(modalX, modalY);
    translate(0,0,1);
    this.drawText();
    pop();
  }

  drawShadow(x, y) {
    let shadowDistance = 1;
    fill(0, 50);

    for (let i = 0; i < shadowDistance; i++) {
      //rect(x + this.modalWidth - 1 + i, y + i, 1, this.modalHeight - 2 * i);
      // rect(x + i, y + this.modalHeight - 1 + i, this.modalWidth - 2 * i, 1);
      rect(x - 1 + i, i, 1, this.modalHeight - 2 * i);
      rect(i, y - 1 + i, this.modalWidth - 2 * i, 1);
    }
  }

  drawHeader(x, y) {
    push();
    rectMode(CENTER);
    fill(0, 0, 128);
    noStroke();
    rect(0, -y + 13, this.modalWidth - 8, this.modalHeight - 80);
    pop();

    fill(255);
    textSize(this.fontSize + 3);
    textStyle(NORMAL);
    textFont(this.font);
    textAlign(LEFT, CENTER);
    text("Error", -x + 10, -y + 12);
  }

  drawButtons(x, y) {
    let closeButtonSize = 15;

    this.drawButton(
      x - 10 - closeButtonSize * 1.5,
      -y + 7 + closeButtonSize / 2,
      "_"
    );
    this.drawButton(
      x - closeButtonSize / 2 - 8,
      -y + 7 + closeButtonSize / 2,
      "X"
    );
  }

  drawButton(x, y, label) {
    let closeButtonSize = 15;
    fill(193, 193, 193);
    rectMode(CENTER);
    rect(x, y, closeButtonSize, closeButtonSize);

    fill(0);
    textSize(this.fontSize + 2);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(label, x, y);
  }

  drawText() {
    textSize(this.fontSize - 2);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    fill(0);

    let errorMessage =
      "Some sort of error - File Not Found\n\nPress Enter to close the error.";
    text(errorMessage, 0, -this.modalHeight / 2 + 50);
    rectMode(CENTER);

    fill(186, 188, 185);
    rect(0, this.modalHeight / 2 - 20, this.modalWidth / 4, 15);
    fill(0);
    textSize(this.fontSize);
    text("OK", 0, this.modalHeight / 2 - 20);
  }
}
class Bld {
  constructor() {}
  display() {
    //건물 본체 시작
    {
      let h1 = 50;
      let rad = 20;
      let widepth = 600;
      let h2 = 150;
      let h3 = 300;
      let colummWh = 25;
      rectMode(CENTER);
    }
    //바닥
    {
      push();
      noStroke();
      fill("red");
      texture(marble);
      translate(0, -h1 / 4, 0);
      box(widepth + 3 * rad, h1 / 2, widepth + 3 * rad);
      fill(255);
      translate(0, -h1 / 2, 0);
      texture(marble);
      box(widepth + 2 * rad, h1 / 2, widepth + 2 * rad);
    }
    //내부공간
    {
      translate(0, -h1 / 4 - h2 / 2, 0);
      push();
      texture(rv);
      box(widepth, h2, widepth);
      pop();
    }
    //층간구조
    {
      fill(255);
      translate(0, -h2 / 2 - h1 / 2, 0);
      texture(marble);
      box(widepth + 2 * rad, h1, widepth + 2 * rad);
    }
    //외벽 디스플레이
    {
      fill(180, 30, 32);
      noStroke();
      translate((widepth * 1) / 6, -h1 / 2 - h3 / 2, h3);
      texture(side);
      plane((widepth * 2) / 3, h3);
      imageMode(CENTER);
      translate((-widepth * 2) / 3, 0, (-widepth * 2) / 3);
      rotateY(PI / 2);
      texture(side);
      plane((widepth * 2) / 3, h3);
      translate(-widepth / 2, 0, (widepth * 1) / 6);
      rotateY((-PI * 3) / 4);
      texture(ch4);
      plane(((widepth * 1) / 3) * Math.sqrt(2), h3);
      rotateY(PI);
      stroke(30);
    }
    //천장
    {
      fill(255);
      rotateY((-PI * 3) / 4);
      noStroke();
      texture(marble);
      translate(0, -h3 / 2 - h1 / 2, (-widepth * 1) / 2);
      box(widepth / 3 + 2 * rad, h1, (widepth * 2) / 3 + 2 * rad);
      translate(widepth / 2, 0, widepth / 2);
      box((widepth * 2) / 3 + 2 * rad, h1, widepth / 3 + 2 * rad);
      translate(-widepth / 2 + 75, -h1 / 2, -75);
      rotateY(PI / 4);
      box(
        (widepth / 3 + 2 * rad) * Math.sqrt(2),
        h1 * 2,
        (widepth / 3 + 2 * rad) * Math.sqrt(2)
      );
      pop();
    }
    //건물 장식 시작
    //1층기둥
    {
      push();
      noStroke();
      //fill('green');
      texture(gv);
      translate(-widepth / 2, -h1 - h2 / 2, -widepth / 2);
      box(colummWh, h2, colummWh);
      let i = 0;
      while (i < widepth * 2) {
        i += colummWh * 3;
        if (i < widepth + 1) {
          translate(0, 0, colummWh * 3);
          box(colummWh, h2, colummWh);
        } else {
          translate(colummWh * 3, 0, 0);
          box(colummWh, h2, colummWh);
        }
      }
      pop();
    }
    //2층기둥
    {
      push();
      noStroke();
      texture(marble);
      translate(-widepth / 2, -h1 * 2 - h2 - h3 / 2, -widepth / 2);
      cylinder(rad, h3);
      let j = 0;
      while (j < widepth) {
        j += (widepth * 1) / 3;
        if (j < (widepth * 2) / 3) {
          //fill("red");
          translate(0, 0, (widepth * 2) / 3);
          texture(marble);
          cylinder(rad, h3);
          fill(255);
        } else if (j < widepth) {
          translate((widepth * 1) / 3, 0, (widepth * 1) / 3);
          texture(marble);

          cylinder(rad, h3);
        } else {
          translate((widepth * 2) / 3, 0, 0);
          cylinder(rad, h3);
        }
      }
      pop();
    }
    //1층 중간벽
    {
      push();
      noStroke();
      fill(50, 0, 0);
      texture(marble);
      translate(0, -h1 - h2 / 2, 0);
      box(600 + 2 * rad, 6, 600 + 2 * rad);
      pop();
    }
  }
}
class Street {
  constructor() {}
  display() {
    push();
    translate(0, 1, 0);
    texture(floortexture);
    box(widepth * 2.5, 10, widepth * 2.5);
    pop();
  }
}
class Glitch {
  constructor(x, y) {
    this.glitchWidth = 150;
    this.glitchHeight = 100;
    this.glitchVisible = true;
    this.posX = x;
    this.posY = y;
  }
  draw() {
    push();
    noStroke();
    texture(glitchPop);
    translate(this.posX, this.posY, -1);
    plane(this.glitchWidth, this.glitchHeight);
    
    pop();
  }
}
