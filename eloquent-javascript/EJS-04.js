console.log("Chapter 05 - Exercises\n");
console.log("\tArray Flattening\n");

console.log("let arrays = [[1, 2, 3], [4, 5], [6]]");
let arrays = [[1, 2, 3], [4, 5], [6]];
const flattenedArray = arrays.reduce((result, element) =>
  result.concat(element)
);
console.log(`Flattened: ${flattenedArray}`);

console.log("\n\tYour Own Loop\n");

const loop = (value, test, update, body) => {
    let iterations = value;
    for (let i = 0; i < iterations; i++) {
    if (!test) return false;
    body(value);
    value = update(value);
  }
};
console.log("loop(3, n => n > 0, n => n - 1, console.log)");
loop(3, n => n > 0, n => n - 1, console.log);