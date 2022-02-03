console.log(
  "\nWrite a function min that takes two arguments and returns their minimum\n"
);

function min(a, b) {
  if (a < b) return a;
  return b;
}

console.log(min(0, -10));

console.log(
  "\nDefine a recursive function isEven that doesn't use the modulo operator\n"
);

function isEven(number) {
  let positiveNumber = Math.abs(number);
  if (positiveNumber === 0) {
    return true;
  } else if (positiveNumber === 1) {
    return false;
  }
  return isEven(positiveNumber - 2);
}

console.log(`The number 75 is ${isEven(75) ? "Even" : "Odd"}`);
console.log(`The number 50 is ${isEven(50) ? "Even" : "Odd"}`);
console.log(`The number -1 is ${isEven(-1) ? "Even" : "Odd"}`);

console.log(
  "\nWrite a function that counts the number of uppercase Bs in a string \n"
);

function countBs(string) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "B") {
      count++;
    }
  }
  if (count > 0) {
    return `There are ${count} uppercase B letters in the string ${string}`;
  }
  return `There are no uppercase B letters in the string ${string}`;
}

console.log(countBs("BBBslE"));
console.log(countBs("SJSI"));

console.log(
  "\nRewriting countBs as countChars to make a function that counts the number of a specific char in a string\n"
);

function countChars(string, char) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      count++;
    }
  }
  if (count > 0) {
    return `There are ${count} ${char} letters in the string ${string}`;
  }
  return `There are no ${char} letters in the string ${string}`;
}

console.log(countChars("kakkerlak", "k"));
console.log(countChars("abbabaabebaa", "a"));
