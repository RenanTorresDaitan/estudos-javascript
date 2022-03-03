let cx = document.querySelector("canvas").getContext("2d");

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
}

trapezoid(50, 75, 25, -45);
