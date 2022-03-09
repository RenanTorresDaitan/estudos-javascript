// Content Negotiation exercise

const fetchDiv = document.querySelector("#fetchResult");

fetchDiv.textContent = "Fetching result...";

const acceptHeaders = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbows+unicorns",
];

acceptHeaders.map((header) => {
  fetch("https://eloquentjavascript.net/author", {
    headers: { accept: header },
  })
    .then((resp) => {
      return `<div>Header: ${header} Code: ${resp.status} Text: ${resp.statusText}</div>`;
    })
    .then((text) => (fetchDiv.innerHTML += text));
});

// A JavaScript WorkBench Exercise

const codeTextArea = document.querySelector("#code");
const buttonRunCode = document.querySelector("#button");
let codeOutput = document.querySelector("#output");

buttonRunCode.addEventListener("click", () => {
  let code = "";
  try {
    code = Function(codeTextArea.value)();
  } catch (err) {
    code = err;
  }
  codeOutput.appendChild(document.createTextNode(`${code}\n`));
});

// Conway's Game of Life exercise

const conwayGrid = document.querySelector("#grid");
const nextButton = document.querySelector("#next");

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
const MATRIX_WIDTH = 5;
const MATRIX_HEIGHT = 5;

const gridTest = new Matrix(MATRIX_WIDTH, MATRIX_HEIGHT);
for (let i = 0; i < MATRIX_HEIGHT; i++) {
  for (let j = 0; j < MATRIX_WIDTH; j++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Math.random() < 0.25 ? true : false;
    gridTest.set(j, i, checkbox);
    grid.appendChild(gridTest.get(j, i));
  }
  grid.appendChild(document.createElement("br"));
}

nextButton.addEventListener("click", nextGrid.bind(this, gridTest));
function nextGrid(grid) {
  const newGrid = new Matrix(grid.width, grid.height);

  for (let i = 0; i < newGrid.height; i++) {
    for (let j = 0; j < newGrid.width; j++) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;
      newGrid.set(j, i, checkbox);
    }
  }
  console.log(newGrid);
  console.log(grid);
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      let neighborCells = 0;
      try {
        neighborCells += grid.get(x - 1, y - 1).checked ? 1 : 0;
        neighborCells += grid.get(x - 1, y).checked ? 1 : 0;
        neighborCells += grid.get(x - 1, y + 1).checked ? 1 : 0;
        neighborCells += grid.get(x, y - 1).checked ? 1 : 0;
        neighborCells += grid.get(x, y + 1).checked ? 1 : 0;
        neighborCells += grid.get(x + 1, y - 1).checked ? 1 : 0;
        neighborCells += grid.get(x + 1, y).checked ? 1 : 0;
        neighborCells += grid.get(x + 1, y + 1).checked ? 1 : 0;
      } catch {
      } finally {
        if (!grid.get(x, y).checked && neighborCells === 3)
          newGrid.set(x, y).checked = true;
        if (
          grid.get(x, y).checked &&
          (neighborCells === 2 || neighborCells === 3)
        )
          newGrid.set(x, y).checked = true;
        if (grid.get(x, y).checked && (neighborCells < 2 || neighborCells > 3))
          newGrid.set(x, y).checked = false;
      }
    }
  }
}
