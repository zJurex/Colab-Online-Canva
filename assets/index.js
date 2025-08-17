const mainCanvas = document.getElementById('main-canvas');
const context = mainCanvas.getContext('2d');

let initialX;
let initialY;

let currentColor = "#000000";
let currentLineWidth = 50;


window.addEventListener('load', () => {
  
  const saved = localStorage.getItem('mural');
  
  if (saved) {
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      context.drawImage(img, 0, 0);
    };
  }

});




function guardarValores() {
  let color = document.getElementById("color").value;
  let size = document.getElementById("size").value;

  currentColor = color || "#000000";
  currentLineWidth = size;
}

const dibujar = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = currentLineWidth;
    context.strokeStyle = currentColor;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
};

const mouseDown = (evt) => {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    dibujar(initialX, initialY);
    mainCanvas.addEventListener("mousemove", mouseMoving);
};

const mouseMoving = (evt) => {
    dibujar(evt.offsetX, evt.offsetY);
}

const mouseUp = () => {
    mainCanvas.removeEventListener("mousemove", mouseMoving);
     const data = mainCanvas.toDataURL();
  localStorage.setItem('mural', data);

};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);
