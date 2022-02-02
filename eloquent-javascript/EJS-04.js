console.log("Chapter 05 - Exercises\n");
console.log("\t Array Flattening\n");

console.log("let arrays = [[1, 2, 3], [4, 5], [6]]");
let arrays = [[1, 2, 3], [4, 5], [6]];
let flattenedArray = []
flattenedArray.push(arrays.reduce((result, element) => (result.concat(element))));
console.log("Flattened: " + flattenedArray);