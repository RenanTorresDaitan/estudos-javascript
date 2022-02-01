console.log("\n The sum of a Range \n");

console.log("Range Function: \trange(5, 2)");
function range(start, end, step = start < end ? 1 : -1) {
  let arr = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      arr.push(i);
    }
  } else {
    for (let i = start; i >= end; i += step) {
      arr.push(i);
    }
  }
  return arr;
}
console.log(range(5, 2));

console.log("Sum Function: \t\tsum(range(1, 10))");
function sum(arr) {
  let result = 0;
  for (let number of arr) {
    result += number;
  }
  return result;
}
console.log(sum(range(1, 10)));

console.log("\n Reversing an Array \n");

function reverseArray(arr) {
  let reverse = [];
  for (let index of arr) {
    reverse.unshift(index);
  }
  return reverse;
}
console.log('(reverseArray(["A","B","C"]));');
console.log(reverseArray(["A", "B", "C"]));

function reverseArrayInPlace(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let original = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = original;
  }
}

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log("reverseArrayInPlace([1,2,3,4,5])");
console.log(arrayValue);

console.log("\n Converting an Array to a List \n");
function arrayToList(arr) {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = {
      value: arr[i],
      rest: list,
    };
  }
  return list;
}

console.log("arrayToList([10, 20])");
console.log(arrayToList([10, 20]));

function listToArray(list) {
  let arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
}

console.log("listToArray(arrayToList([10, 20, 30]))");
console.log(listToArray(arrayToList([10, 20, 30])));

const prepend = (element, list) => {
  let newList = {};
  newList = {
    value: element,
    rest: list,
  };
  return newList;
}
console.log("(prepend(10, prepend(20, null)))");
console.log(prepend(10, prepend(20, null)));