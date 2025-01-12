const grid = document.querySelector('#grid')
const genBtn = document.querySelector('#generate')
const colorPicker = document.querySelector('#color-picker')
const resetGridBtn = document.querySelector('#reset-grid')
const rows = document.querySelector('#rows')
const coloums = document.querySelector('#coloums')

const gridDetails = {
  rows: 8,
  cols: 8,
  backgroundColor: "#c4c4c4"
}


function drawGrid() {
  gridDetails.cols = coloums.value
  gridDetails.rows = rows.value

  // Calculate grid height based on aspect ratio
  const aspectRatio = gridDetails.rows / gridDetails.cols
  grid.style.height = `${grid.offsetWidth * aspectRatio}px`

  const cellNumber = gridDetails.rows * gridDetails.cols
  grid.style.gridTemplateColumns = `repeat(${gridDetails.cols}, 1fr)` 
  grid.style.gridTemplateRows = `repeat(${gridDetails.rows}, 1fr)` 

  grid.innerHTML= ''

  for (let i = 0; i < cellNumber; i++) {
    const cell = document.createElement('div')
    cell.style.backgroundColor = gridDetails.backgroundColor
    cell.classList.add('cell')
    grid.appendChild(cell)
  }
}

function draw(e) {
  if(e.target.classList.contains('cell')) {
    e.target.classList.toggle('active')
    e.target.style.backgroundColor = getColor()
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




genBtn.addEventListener("click", drawGrid)
grid.addEventListener('mousedown', draw)
colorPicker.addEventListener('change', getColor)
resetGridBtn.addEventListener('click', resetGrid)
document.addEventListener('DOMContentLoaded', drawGrid)


