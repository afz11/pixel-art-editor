const grid = document.querySelector('#grid')
const genBtn = document.querySelector('#generate')
const colorPicker = document.querySelector('#color-picker')
const resetGridBtn = document.querySelector('#reset-grid')
const rows = document.querySelector('#rows')
const coloums = document.querySelector('#coloums')
const rowsLable =  document.querySelector('label[for="rows"]')
const coloumsLabel =  document.querySelector('label[for="coloums"]')
const mouseHover = document.querySelector('#mouse-hover')

const gridDetails = {
  rows: 8,
  cols: 8,
  backgroundColor: "#c4c4c4"
}

let isDrawing = false;

function drawGrid() {
  // Calculate grid height based on aspect ratio
  const aspectRatio = gridDetails.rows / gridDetails.cols
  grid.style.height = `${grid.offsetWidth * aspectRatio}px`

  const cellNumber = gridDetails.rows * gridDetails.cols
  grid.style.gridTemplateColumns = `repeat(${gridDetails.cols}, 1fr)` 
  grid.style.gridTemplateRows = `repeat(${gridDetails.rows}, 1fr)` 

  rowsLable.textContent = `Rows: ${gridDetails.rows}`
  coloumsLabel.textContent = `Coloums: ${gridDetails.cols}`


  grid.innerHTML= ''

  for (let i = 0; i < cellNumber; i++) {
    const cell = document.createElement('div')
    cell.style.backgroundColor = gridDetails.backgroundColor
    cell.classList.add('cell')
    grid.appendChild(cell)
  }
}

function draw(e) {
  if (!isDrawing && e.type !== 'click') return;
  
  if (e.target.classList.contains('cell')) {
    e.target.style.backgroundColor = getColor();
  }
}

function resetGrid(){
  const cells = Array.from(grid.querySelectorAll('.cell'))
  cells.forEach(cell => {
    cell.style.backgroundColor = gridDetails.backgroundColor
  })
}

function getColor() {
  return colorPicker.value
}

function updateCols() {
  gridDetails.cols = coloums.value
  coloumsLabel.textContent = `Coloums: ${gridDetails.cols}`
}
function updateRows() {
  gridDetails.rows = rows.value
  document.querySelector('label[for="rows"]').textContent = `Rows: ${gridDetails.rows}`
}

function setupDrawingEvents() {
  grid.addEventListener('mousedown', startDrawing);
  grid.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', stopDrawing);
  grid.addEventListener('click', draw);
}

genBtn.addEventListener("click", drawGrid)
// grid.addEventListener('mousedown', draw)
colorPicker.addEventListener('change', getColor)
resetGridBtn.addEventListener('click', resetGrid)
document.addEventListener('DOMContentLoaded', drawGrid)
rows.addEventListener('change', updateRows)
coloums.addEventListener('change', updateCols)
setupDrawingEvents();

function startDrawing(e) {
  isDrawing = true;
  draw(e); // Draw the first cell when clicking
}

function stopDrawing() {
  isDrawing = false;
}

