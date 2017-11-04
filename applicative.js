const _ = require('underscore');

const nums = _.range(1, 5 + 1);

console.log('map, reduce and filter');

function doubleAll(array) {
  return _.map(array, n => n * 2);
}

console.log(`doubleAll(nums) === ${doubleAll(nums)}`);

function average(array) {
  return _.reduce(array, (a, b) => a + b) / array.length;
}

console.log(`average(nums) === ${average(nums)}`);

function onlyEvens(array) {
  return _.filter(array, n => n % 2 === 0);
}

console.log(`onlyEvens(num) === ${onlyEvens(nums)}`);

console.log();
console.log('Remember an object is *also* a collection.');
const anObject = {
  a: 1,
  b: 2
};

function dumpObject(o) {
  return _.reduce(o, (acc, v, k) => acc + `${k}: ${v}, `, '{ ') + ' }';
}
console.log(`_.map(${dumpObject(anObject)}, _.identity) === ${_.map(anObject, _.identity)}`);
console.log('But _.identity is not needed');
console.log(`_.map(${dumpObject(anObject)}) === ${_.map(anObject)}`);

console.log();
console.log('Supplying a function of two arguments allows us to process both keys and values');
console.log(
  `_.map(${dumpObject(anObject)}, (v, k) => [k, v]) === ${_.map(anObject, (v, k) => [k, v])}`);

console.log();
console.log('For completeness, _.map takes a third argument: the (complete) collection');
const completeMapResult = _.map(anObject, (v, k, coll) => [k, v, dumpObject(coll)]);
console.log(`Using a function of three arguments: ${completeMapResult}`);
