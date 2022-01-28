console.log("\n Looping Triangle example: \n");

function loopingTriangle() {
  let line = "#";
  while (line.length < 8) {
    console.log(line);
    line += "#";
  }
}

loopingTriangle();

console.log("\n Fizz Buzz example: \n");

function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
      continue;
    }
    if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

fizzBuzz();

console.log("\n Chessboard example: \n");

function chessboard(width, height) {
  let board = "";
  for (let lines = 0; lines < height; lines++) {
    for (let cell = 0; cell < width; cell++) {
      if ((lines + cell) % 2 == 0) {
        board += "|_";
      } else {
        board += "|#";
      }
    }
    board += "\n";
  }
  console.log(board);
}

chessboard(8, 8);
