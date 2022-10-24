//The variables :D
const gridContainer = document.querySelector(".grid");
const gridSize = document.querySelector("#dimensions");
const colorPicker = document.querySelector("#col-pkr");
const toggleGrid = document.querySelector("#grid-switch");
const toggleRainbow = document.querySelector("#rainbow-switch");

let value = 4;
let cells;

let penColor = colorPicker.value; //Draw colour
let tempColor = penColor; //Making colour value safe
colorPicker.addEventListener("change", function () {
	penColor = colorPicker.value;
	tempColor = penColor;
});

//Drawing the grid using divs. Yes, I know INSANE!!!
function drawGrid(width, height) {
	for (let a = 0; a < height; a++) {
		let rowDiv = document.createElement("div");
		rowDiv.classList.add("row", `row${a}`);
		gridContainer.appendChild(rowDiv);

		const row = document.querySelector("." + `row${a}`);

		for (let b = 0; b < width; b++) {
			let cellDiv = document.createElement("div");
			cellDiv.classList.add("cell", `cell${a}x${b}`);
			row.appendChild(cellDiv);
		}
	}
	editCells();
}

//Editing the cells.
function editCells() {
	let mousedown = false; //Left button down

	const cellSize = parseInt(800 / value); //Calculating cell size.
	const cellSizePx = `${cellSize}px`;

	//The main drawing part. The user functional area.
	cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.style.width = cellSizePx;
		cell.style.height = cellSizePx;

		//Toggle rainbow mode.
		toggleRainbow.addEventListener("change", function () {
			if (toggleRainbow.checked == true) {
				tempColor = penColor;
			} else {
				penColor = tempColor;
			}
		});

		//Toggle drawing mode.
		cell.addEventListener("mouseup", function (event) {
			mousedown = false;
		});

		//Start drawing on pendown.
		cell.onmousedown = function () {
			mousedown = true;
			cell.style.backgroundColor = penColor;

			//Make drawing work while hold dragging pen.
			cells.forEach((cell) => {
				console.log(penColor);
				cell.onmouseover = function () {
					if (mousedown == true) {
						if (toggleRainbow.checked == true) {
							//For rainbow mode.
							randomColor = Math.floor(Math.random() * 16777215).toString(16);
							penColor = `#${randomColor}`;
							cell.style.backgroundColor = penColor;
						} else {
							penColor = tempColor;
							cell.style.backgroundColor = penColor;
						}
					}
				};
			});
		};

		//Toggle grid lines.
		if (toggleGrid.checked == true) {
			cell.classList.add("cell-grid");
		} else {
			cell.classList.remove("cell-grid");
		}
		toggleGrid.addEventListener("change", function () {
			if (toggleGrid.checked == true) {
				cell.classList.add("cell-grid");
			} else {
				cell.classList.remove("cell-grid");
			}
		});
	});
}

//Killing cells on canvas area change.
function killGrid() {
	gridContainer.innerHTML = "";
}

function clearCanvas() {
	cells.forEach((cell) => {
		cell.style.backgroundColor = "#fff";
	});
}

//Generator caller.
function generateGrid() {
	value = parseInt(gridSize.options[gridSize.selectedIndex].value);
	killGrid();
	drawGrid(value, value);
}
//Default value.
gridSize.value = 4;
drawGrid(4, 4);
