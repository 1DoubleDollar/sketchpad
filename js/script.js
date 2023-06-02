function backgroundAnim() {

    colors = ['red','blue', 'yellow','pink','orange','purple'];
    const section = document.querySelector('main');
    const span = document.createElement('span');

    let size = Math.random() * 50;

    span.style.width = 10 + size + 'px';
    span.style.height = 10 + size + 'px';
    span.style.borderRadius = `${size}%`;
    span.style.top = Math.random() * innerHeight + "px";
    span.style.left = Math.random() * innerWidth + "px";

    const bg = colors[Math.floor(Math.random() * colors.length)];
    span.style.background = bg;

    section.appendChild(span);

    setTimeout(() => {span.remove()},5000)
}
setInterval(backgroundAnim, 150);

const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const DEFAULT_HOVER = 'false';
const DEFAULT_GRIDON = 'false';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentHover = DEFAULT_HOVER;
let currentGridOn= DEFAULT_GRIDON;

function updateColor(color){
    currentColor = color;
}
function updateMode(mode){
    activateButton(mode); 
    currentMode = mode;
}
function updateSize(size){
    currentSize = size;
}
function updateHover(hover){
    currentHover = hover;
}
function updateGridOn(value)
{
    currentGridOn = value;
}
let gridCheck = document.getElementById('switch');
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorbtn');
const rainbowBtn = document.getElementById('rainbowbtn');
const grayBtn = document.getElementById('graybtn');
const eraseBtn = document.getElementById('erasebtn');
const clearBtn = document.getElementById('clearbtn');
const hover = document.getElementById('hovering');
const save = document.getElementById('save');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

colorPicker.oninput= (e)=> updateColor(e.target.value);
colorBtn.onclick = () => updateMode('color');
rainbowBtn.onclick = ()=>updateMode('rainbow');
grayBtn.onclick = ()=>updateMode('gray');
eraseBtn.onclick = ()=>updateMode('erase');
clearBtn.onclick = ()=>reload();
hover.onclick = ()=>hovering();
sizeSlider.onmousemove = (e)=> updateSizeValue(e.target.value);
sizeSlider.onchange = (e)=> changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`;
}
function changeSize(value){
    updateSize(value);
    updateSizeValue(value);
    reload();
}

function reload(){
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid(){
    grid.innerHTML='';
}

function setupGrid(size){
    grid.style.gridTemplate = `repeat(${size},1fr)/repeat(${size},1fr)`;
    // grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    // grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i =0; i<size*size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mousedown', changeColor);
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}
function changeColor(e){
    if((e.type == 'mouseover' && !mouseDown) && !moving)
    return;
    if(currentMode === 'rainbow')
    {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor =`rgb(${r},${g},${b})`;
    }
    else if(currentMode === 'gray')
    {
        const r = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor =`rgb(${r},${r},${r})`;
    }
    else if(currentMode === 'erase')
    {
        e.target.style.backgroundColor = '#fefefe';
    }
    else if(currentMode === 'color')
    {
        e.target.style.backgroundColor = currentColor;

    }
}
function activateButton(newMode){
    if(currentMode=== 'color'){
    colorBtn.classList.remove('active');
    }
    else if(currentMode=== 'rainbow'){
    rainbowBtn.classList.remove('active');
    }
    else if(currentMode=== 'gray'){
    grayBtn.classList.remove('active');
    }
    else if(currentMode=== 'erase'){
    eraseBtn.classList.remove('active');
    }   
    // else if(currentMode=== 'hover'){
    // colorBtn.classList.remove('active');
    // }    
    if(newMode=== 'color'){
    colorBtn.classList.add('active');
    }
    else if(newMode=== 'rainbow'){
    rainbowBtn.classList.add('active');
    }
    else if(newMode=== 'gray'){
    grayBtn.classList.add('active');
    }
    else if(newMode=== 'erase'){
    eraseBtn.classList.add('active');
    }   
    // else if(currentMode=== 'hover'){
    // colorBtn.classList.remove('active');
    // }
}
gridCheck.addEventListener('click',()=>{
    updateGridOn(gridCheck.check);
});

save.addEventListener("click", function() {
	html2canvas(document.getElementById("grid")).then(function (canvas) {			
            let a = document.createElement("a");
			a.download = "sketch.png";
			a.href = canvas.toDataURL();
			a.target = '_blank';
			a.click();
		});
});

let moving = false;
function hovering(){
    if(!moving){
        moving =true;
        hover.classList.add('active');
    }
    else{
        moving = false;
        hover.classList.remove('active');
    }
}
window.onload = ()=>{
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}