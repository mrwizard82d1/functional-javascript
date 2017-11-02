// First class functions

const fortyTwo = () => 42;
console.log(`A function stored in a variable: ${fortyTwo}`);
console.log(`And invoked: ${fortyTwo()}`);

const fortyTwos = [42, () => 42];
console.log();
console.log(`A function can be stored in an array: ${fortyTwos}`);

const fortyTwoObj = {
  number: 42,
  fun: function() { return 42; },
};
console.log();
console.log(`A function can be stored as a value in an object: ${fortyTwoObj}`);

console.log();
console.log(`A function can be created (inline) as needed: ${42 + (() => 42)()}`);

function weirdAdd(n, f) {
  return n + f();
}
console.log();
console.log(
  `A number can be passed as an argument just like a function: ${weirdAdd(42, (() => 42))}`);

console.log();
console.log(`A number can be returned from a function: ${(() => 42)()}`);
console.log(`And so can a function: ${(() => () => 42)()}`);

