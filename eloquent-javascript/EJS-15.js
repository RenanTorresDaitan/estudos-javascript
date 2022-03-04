let cx = document.querySelector("canvas").getContext("2d");

const { height, width } = cx.canvas;

function trapezoid(xPos, yPos, size, largerSide = size / 3) {
  const top =
    largerSide > 0 ? (largerSide > size ? largerSide : largerSide) : size;
  const bottom =
    largerSide < 0 ? (largerSide < -size ? -largerSide : -largerSide) : size;

  cx.beginPath();
  cx.moveTo(xPos - top, yPos - size);
  cx.lineTo(xPos + top, yPos - size);
  cx.lineTo(xPos + bottom, yPos + size);
  cx.lineTo(xPos - bottom, yPos + size);
  cx.closePath();
  cx.stroke();
  cx.resetTransform();
}

trapezoid(width / 10, height / 2, 25, -45);

function diamond(xPos, yPos, size, color) {
  cx.translate(xPos, yPos);
  cx.fillStyle = color;
  cx.rotate(Math.PI / 4);
  cx.fillRect(-(size / 2), -(size / 2), size, size);
  cx.resetTransform();
}

diamond((width / 10) * 3, height / 2, 50, "red");

function zigzagline(xPos, yPos, width, height, turns) {
  cx.translate(xPos, yPos);
  cx.beginPath();
  cx.moveTo(-width, -height);
  for (let i = 1; i < turns * 2; i++) {
    let turnDistance = height / turns;
    cx.lineTo(width, -height + turnDistance * i);
    i++;
    cx.lineTo(-width, -height + turnDistance * i);
  }
  cx.stroke();
  cx.resetTransform();
}

zigzagline((width / 10) * 5, height / 2, 40, 40, 6);

function spiral(xPos, yPos, radius, turns) {
  cx.translate(xPos, yPos);
  cx.beginPath();
  for (let i = 0; i < 360; i++) {
    let angle = (i * Math.PI*(turns/radius/12));
    let dist = (radius * i / 100);
    cx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist);
  }
  cx.stroke();
}
spiral((width / 10) * 7, height / 2, 15, 3);
