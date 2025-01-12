const grid = document.querySelector('#grid')
const genBtn = document.querySelector('#generate')
const colorPicker = document.querySelector('#color-picker')
const resetGridBtn = document.querySelector('#reset-grid')
const rows = document.querySelector('#rows')
const coloums = document.querySelector('#coloums')
const rowsLable =  document.querySelector('label[for="rows"]')
const coloumsLabel =  document.querySelector('label[for="coloums"]')
const mouseHover = document.querySelector('#mouse-hover')
const saveBtn = document.querySelector('#save-grid')
const canvas = document.querySelector('#canvas')

const ctx = canvas.getContext('2d')

const gridDetails = {
  rows: 16,
  cols: 16,
  backgroundColor: "#c4c4c4"
}

let isDrawing = false;
let isErasing = false;

function gridToCanvas() {
  // Get all cells and their computed styles
  const cells = Array.from(grid.querySelectorAll('.cell'))
  const cellSize = 32 // Size of each cell in pixels

// Set canvas size based on grid dimensions
canvas.width = gridDetails.cols * cellSize
canvas.height = gridDetails.rows * cellSize

// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height)

// Draw Each cell to canvas
cells.forEach((cell, index) => {
  const row = Math.floor(index / gridDetails.cols)
  const col = index % gridDetails.cols
  const x = col * cellSize
  const y = row * cellSize

  // Get cell color
  const color = cell.style.backgroundColor || gridDetails.backgroundColor

  // Draw cell
  ctx.fillStyle = color
  ctx.fillRect(x, y, cellSize, cellSize)

  // Draw cell border
  ctx.strokeStyle = '#eaeaea'
  ctx.strokeRect(x, y, cellSize, cellSize)
})
}

function saveAsImage() {
  // Convert grid to canvas first
  gridToCanvas()

  // create download link
  const link =document.createElement('a')
  link.download = 'pixel-art.png'
  link.href = canvas.toDataURL('image/png')

  // Trigger donwload
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

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
    const color = isErasing ? gridDetails.backgroundColor : getColor();
    e.target.style.backgroundColor = color;
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
  // Add these new event listeners
  grid.addEventListener('contextmenu', preventContextMenu);
}


function startDrawing(e) {
  // Only respond to left (0) or right (2) mouse buttons
  if (e.button === 0 || e.button === 2) {
    isDrawing = true;
    isErasing = (e.button === 2);
    draw(e);
  }
}

function stopDrawing() {
  isDrawing = false;
  isErasing = false;
}

// Add this function to prevent context menu
function preventContextMenu(e) {
  e.preventDefault();
}

genBtn.addEventListener("click", drawGrid)
// grid.addEventListener('mousedown', draw)
colorPicker.addEventListener('change', getColor)
resetGridBtn.addEventListener('click', resetGrid)
document.addEventListener('DOMContentLoaded', drawGrid)
rows.addEventListener('change', updateRows)
coloums.addEventListener('change', updateCols)
saveBtn.addEventListener('click', saveAsImage)
setupDrawingEvents();
