const _ = require('underscore');
const { existy } = require('./introduction');

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

console.log();
console.log('Contrast _.reduce and _.reduceRight');

function div(x, y) {
  const result =  x / y;
  console.log(`div(${x}, ${y}) === ${result}`);
  return result;
}

console.log(`_.reduce([100, 2, 25], div) === ${_.reduce([100, 2, 25], div)}`);
console.log(`_.reduceRight([100, 2, 25], div) === ${_.reduceRight([100, 2, 25], div)}`);

console.log();
console.log('We can use _.reduceRight to build other functions');

function allOf(/* functions */) {
  return _.reduceRight(arguments, (truth, f) => truth && f(), true);
}

function anyOf(/* functions */) {
  return _.reduceRight(arguments, (truth, f) => truth || f(), false);
}

const T = () => true;
const F = () => false;

console.log(`allOf() === ${allOf()}`);
console.log(`allOf(T, T) === ${allOf(T, T)}`);
console.log(`allOf(T, T, T, T, F) === ${allOf(T, T, T, T, F)}`);

console.log();
console.log(`anyOf(T, F, F) === ${anyOf(T, F, F)}`);
console.log(`anyOf(F, F, F, F) === ${anyOf(F, F, F, F)}`);
console.log(`anyOf() === ${anyOf()}`);

console.log();
console.log(`_.find(['a', 'b', 3, 'd'], _.isNumber) === ${_.find(['a', 'b', 3, 'd'], _.isNumber)}`);

console.log();
console.log('Available predicates:\n');
_.each(['_.isEqual', '_.isEmpty', '_.isElement', '_.isArray', '_.isObject', '_.isArguments',
        '_.isFunction', '_.isString', '_.isNumber', '_.isFinite', '_.isBoolean', '_.isDate,',
        '_.isRegExp', ' _.isNan', '_.isNull', '_.isUndefined'], p => console.log(p));

console.log();
console.log(
  `_.reject(['a', 'b', 3, 'd'], _.isNumber) === ${_.reject(['a', 'b', 3, 'd'], _.isNumber)}`);

/**
 * Complements the application of 'pred`
 *
 * @param pred The predicate to coplemerct
 * @returns A function that, when invoked, calculates the logical negation of applying `pred` to
 * the function arguments.
 */
function complement(pred) {
  return function(/* arguments */) {
    return !pred.apply(null, _.toArray(arguments));
  }
}

const filterComplementResult = _.filter(['a', 'b', 3, 'd'], complement(_.isNumber));
console.log();
console.log(`_.filter(["a", "b", 3, "d"], complement(_.isNumber)) === ${filterComplementResult}`);

console.log();
console.log(`_.all([1, 2, 3, 4], _.isNumber) === ${_.all([1, 2, 3, 4], _.isNumber)}`);
console.log(`_.all([1, 2, 3, 4, F()], _.isNumber) === ${_.all([1, 2, 3, 4, F()], _.isNumber)}`);

console.log();
console.log(`_.any([1, 2, 'c', 4], _.isString) === ${_.any([1, 2, 'c', 4], _.isString)}`);
console.log(`_.any([1, 2, 3, 4], _.isString) === ${_.any([1, 2, 3, 4], _.isString)}`);

function dumpArray(a) {
  return _.each(a, i => dumpObject(i));
}

const people = [{name: 'Rick', age: 30}, {name: 'Jaka', age: 24}];
console.log();
console.log('people ===', dumpArray(people));

const peopleByAge = _.sortBy(people, p => p.age);
console.log('_.sortBy(people, p => p.age) === ', dumpArray(peopleByAge));

const albums = [
  {
    title: 'Sabbath Bloody Sabbath',
    genre: 'Metal',
  },
  {
    title: 'Scientist',
    genre: 'Dub',
  },
  {
    title: 'Undertow',
    genre: 'Metal',
  },
];
const albumsByGenre = _.groupBy(albums, a => a.genre);

console.log();
console.log('albums = ', albums);
console.log('_.groupBy(albums, a => a.genre) ===', albumsByGenre);

console.log();
console.log('_.countBy(albums, a => a.genre ===', _.countBy(albums, a => a.genre));

function cat() {
  const head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

console.log();
console.log('cat() ===', cat());
console.log('cat([1, 2, 3], [4, 5, 6], [7, 9]) ===', cat([1, 2, 3], [4, 5, 6], [7, 9]));

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

console.log();
console.log('construct(42) ===', construct(42));
console.log('construct(42, [1, 2, 3] ===', construct(42, [1, 2, 3]));

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

console.log();
console.log('mapcat(i => construct(i, ','), [1, 2, 3]) ===',
  mapcat(i => construct(i, ','), [1, 2, 3]));

function butLast(coll) {
  return _.toArray(coll).slice(0, -1);
}

function interpose(inter, coll) {
  return butLast(mapcat(i => construct(i, [inter]), coll));
}

console.log();
console.log('interpose(\',\', [1, 2, 3]) ===', interpose(',', [1, 2, 3]));

