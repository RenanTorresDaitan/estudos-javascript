let cvS = document.querySelector("#canvasShapes").getContext("2d");

const { height, width } = cvS.canvas;

function trapezoid(xPos, yPos, size, largerSide = size / 3) {
  const top =
    largerSide > 0 ? (largerSide > size ? largerSide : largerSide) : size;
  const bottom =
    largerSide < 0 ? (largerSide < -size ? -largerSide : -largerSide) : size;

  cvS.beginPath();
  cvS.moveTo(xPos - top, yPos - size);
  cvS.lineTo(xPos + top, yPos - size);
  cvS.lineTo(xPos + bottom, yPos + size);
  cvS.lineTo(xPos - bottom, yPos + size);
  cvS.closePath();
  cvS.stroke();
  cvS.resetTransform();
}

trapezoid(width / 10, height / 2, 25, -45);

function diamond(xPos, yPos, size, color) {
  cvS.translate(xPos, yPos);
  cvS.fillStyle = color;
  cvS.rotate(Math.PI / 4);
  cvS.fillRect(-(size / 2), -(size / 2), size, size);
  cvS.resetTransform();
}

diamond((width / 10) * 3, height / 2, 50, "red");

function zigzagline(xPos, yPos, width, height, turns) {
  cvS.translate(xPos, yPos);
  cvS.beginPath();
  cvS.moveTo(-width, -height);
  for (let i = 1; i < turns * 2; i++) {
    let turnDistance = height / turns;
    cvS.lineTo(width, -height + turnDistance * i);
    i++;
    cvS.lineTo(-width, -height + turnDistance * i);
  }
  cvS.stroke();
  cvS.resetTransform();
}

zigzagline((width / 10) * 5, height / 2, 40, 40, 6);

function spiral(xPos, yPos, radius, turns) {
  cvS.translate(xPos, yPos);
  cvS.beginPath();
  for (let i = 0; i < 360; i++) {
    let angle = i * Math.PI * (turns / radius / 12);
    let dist = (radius * i) / 100;
    cvS.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist);
  }
  cvS.stroke();
  cvS.resetTransform();
}
spiral((width / 10) * 7, height / 2, 15, 3);

function star(xPos, yPos, width, height, points, color) {
  cvS.fillStyle = color;
  cvS.translate(xPos, yPos);
  cvS.rotate(-Math.PI / 2);
  cvS.beginPath();
  for (let i = 0; i <= points; i++) {
    const angle = ((2 * Math.PI) / points) * i;
    cvS.quadraticCurveTo(
      0,
      0,
      width * Math.cos(angle),
      height * Math.sin(angle)
    );
  }
  cvS.fill();
  cvS.resetTransform();
}

star((width / 10) * 9, height / 2, 50, 50, 8, "orange");

// Pie Chart Exercise
const results = [
  { name: "Satisfied", count: 150, color: "silver" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "lightblue" },
];
const cvPC = document.querySelector("#canvasPieChart").getContext("2d");
const total = results.reduce((sum, { count }) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;

const centerX = cvPC.canvas.width / 2,
  centerY = cvPC.canvas.height / 2;
const pieChartRadius = 100;
const textLabelRadius = 105;

// Add code to draw the slice labels in this loop.
for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  const middleOfSlice = currentAngle + 0.5 * sliceAngle;
  cvPC.beginPath();
  cvPC.arc(
    centerX,
    centerY,
    pieChartRadius,
    currentAngle,
    currentAngle + sliceAngle
  );
  currentAngle += sliceAngle;
  cvPC.lineTo(centerX, centerY);
  cvPC.fillStyle = result.color;
  cvPC.fill();
  cvPC.font = "15px Arial";
  cvPC.fillStyle = "black";
  const textX = Math.cos(middleOfSlice) * textLabelRadius + centerX;
  const textY = Math.sin(middleOfSlice) * textLabelRadius + centerY;
  cvPC.textAlign = Math.cos(middleOfSlice) < 0 ? "end" : "";
  cvPC.textBaseline = Math.sin(middleOfSlice) < 0 ? "bottom" : "top";
  cvPC.fillText(result.name, textX, textY);
}
