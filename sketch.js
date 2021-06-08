const make2DArray = (cols, rows, init = false) => {
  if (init) {
    let array = Array.from(Array(cols), () => Array.from(Array(rows), () => Math.floor(random(2))))
    return array;
  }
  //fastest for 2d array right now
  
  let arr = Array.from(Array(cols), () => Array(rows))
  return arr;
}





let grid;
let cols;
let rows;
let resolution = 10;

function setup() {

  createCanvas(1000, 700);
  frameRate(60)

  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows, true)


  
}

function draw() {
  background(230);

  

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j< rows; j++) {

      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(0)
        stroke(0);
        rect(x, y, resolution-1, resolution-1)
      } 
      
      

    }
  }

  let next = make2DArray(cols, rows);

  // compute next
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]

      // count the live neighbors
      
      let neighbors = countNeighbors(grid, i, j)

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state
      }
      
    }
  }
  
  grid = next;
  
}

function windowResized() {
   resizeCanvas(windowWidth-100, windowHeight-100);
}


const countNeighbors = (grid, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col= (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row]
    }
  }

  sum -= grid[x][y]

  return sum

}