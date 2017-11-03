const _ = require('underscore');

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

// A functional "99 Bottles of Beer on the Wall"

function lyricSegment(n) {
  return _.chain([])
          .push(`${n} ${n > 1 ? 'bottles' : 'bottle'} of beer on the wall`)
          .push(`${n} ${n > 1 ? 'bottles' : 'bottle'} of beer`)
          .push('Take one down and pass it around')
          .tap((lyrics) => {
            if (n > 1) {
              lyrics.push(`${n - 1} ${n - 1 > 1 ? 'bottles' : 'bottle'} of beer on the wall`);
            } else {
              lyrics.push('No more bottles of beer on the wall');
            }
          })
          .value();
}
console.log();
console.log('lyricSegment(9)');
console.log(lyricSegment(9));

console.log();
console.log('lyricSegment(1)');
console.log(lyricSegment(1));

function song(start, end, lyricGenerator) {
  return _.reduce(_.range(start, end - 1, -1),
    (acc, index) => acc.concat(lyricGenerator(index)), []);
}
song(5, 1, lyricSegment);
console.log();
console.log('song(5, 1, lyricSegment)');
console.log(song(5, 1, lyricSegment));

