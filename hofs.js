const _ = require('underscore');
const introduction = require('./introduction');
const c = require('./closures');

console.log();
console.log('passing functions to functions');

console.log('_.max([1, 2, 3, 4, 5]) === ', _.max([1, 2, 3, 4, 5]));
console.log('_.max([1, 2, 3, 4.75, 4.5]) ===', _.max([1, 2, 3, 4.75, 4.5]));

console.log();
console.log('_.max supports an optional second argument to calculate the value of each item');
const people = [{name: 'Fred', age: 65}, {name: 'Lucy', age: 36}];
console.log('people ===', people);
console.log('_.max(people, p => p.age) ===', _.max(people, p => p.age));

console.log();
console.log('_.max generalized using finder');

function finder(valueFun, bestFun, coll) {
  function best(toTest, soFar) {
    const toTestValue = valueFun(toTest);
    const soFarValue = valueFun(soFar);
    return (soFarValue === bestFun(toTestValue, soFarValue) ? soFar : toTest);
  }
  return _.reduce(coll, best);
}

console.log('finder(_.identity, Math.max, [1, 2, 3, 4, 5]) ===',
  finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

console.log('_.max with a second argument replaced by finder');
console.log('finder(c.plucker("age"), Math.max, people) ===',
  finder(c.plucker('age'), Math.max, people));

console.log('prefer names with "L"');
const preferNamesStartingWithL = (x, y) => x.charAt(0) === 'L' ? x : y;
console.log('finder(c.plucker("name"), preferNamesStartingWithL, people) ===',
  finder(c.plucker('name'), preferNamesStartingWithL, people));

console.log();
console.log('The best function assumes the best value function, fun,');
console.log('  Returns a true if its first argument is better than the second');
console.log('  Can unwrap collection values to find values to compare');

function best(fun, coll) {
  return _.reduce(coll, (x, y) => fun(x, y) ? x : y);
}

console.log();
console.log('best((x, y) => x > y, [1, 2, 3, 4, 5]) ===', best((x, y) => x > y, [1, 2, 3, 4, 5]));

console.log();
console.log('repeat, repeatedly and iterateUntil');

function repeat(count, value) {
  return _.map(_.range(count), () => value);
}

console.log('repeat(4, "Major") ===', repeat(4, 'Major'));

console.log();
console.log('Use functions, not values, to implement repeatedly.');

function repeatedly(count, fun) {
  return _.map(_.range(count), fun);
}

console.log('Generate 3 random integers');
console.log(repeatedly(3, () => Math.floor(Math.random() * 10) + 1));

console.log('repeatedly with constant values');
console.log('repeatedly(3, () => "Odelay!") ===', repeatedly(3, () => 'Odelay!'));

console.log('repeatedly uses _.map which could use the index of the item');
let emptyArray = [];
function repeatedlyUsingIndex() {
  return repeatedly(3, n => {
    const id = 'id' + n;
    emptyArray.push(id);
    return id;
  });
}

console.log('repeatedlyUsingIndex() returns the indices');
console.log(repeatedlyUsingIndex());
console.log('and has a side-effect');
console.log('emptyArray ===', emptyArray);

console.log();
console.log('Use functions, not values! Seriously.');

function iterateUntil(fun, check, init) {
  let result = [];
  let next = fun(init);
  while (check(next)) {
    result.push(next);
    next = fun(next);
  }
  return result;
}

console.log('Use iterateUntil to double values until it is larger than 1024');
console.log('iterateUntil(n => 2 * n, n <= 1024, 1) ===',
  iterateUntil(n => 2 * n, n => n <= 1024, 1));

console.log();
console.log('functions returning functions');

function always(value) {
  return () => value;
}
const k = always;

console.log('always(5)() ===', always(5)());
console.log('In functional circles, always is named k.');
console.log('k(5)() ===', k(5)());

console.log('always illustrates that a closure returns the same value (reference)');
const f = always(function() {});
console.log('Any function created with `function` always returns a unique instance');
console.log('(f() === f()) ===', f() === f());

console.log('And each capture of a closure returns a *unique* value.');
const g = always(function() {});
console.log('(f() === g()) ===', f() === g());

console.log('We can now use `always` in `repeatedly`.');
console.log('repeatedly(3, always("Odelay!")) ===', repeatedly(3, always('Odelay!')));

console.log();
console.log('`invoker` returns a function that will conditionally invoke `method` on `target`');

function invoker(name, method) {
  return function(target /* args */) {
    if(!introduction.existy(target)) {
      introduction.fail('One must provide a target');
    }
    
    const targetMethod = target[name];
    const args = _.rest(arguments);
    
    return introduction.doWhen((introduction.existy(targetMethod)) &&
                               method === targetMethod, () => targetMethod.apply(target, args));
  }
}
const rev = invoker('reverse', Array.prototype.reverse);

console.log('Note that `invoker` allows one to convert object methods into a function');
console.log('_.map([[1, 2, 3]], rev) ===', _.map([[1, 2, 3]], rev));

console.log();
console.log('Capturing variables in closures used by returned functions');

console.log();
console.log('An (probabilistic) implementation of `uniqueString');

/**
 * Create a (probably) unique string of length `count`G
 * @param count The number of characters in the returned string.
 */
function uniqueString1(count) {
  // Generate a random number
  // Convert it to a base-36 string
  // Skip the first two characters ('0x')
  return Math.random().toString(36).substr(2, count);
}

console.log('uniqueString1(10) ===', uniqueString1(10));

console.log('But what if we want a specific prefix followed by random text?');

/**
 * Create a unique string beginning with `prefix`
 * @param prefix
 * @returns {string}
 */
function uniqueString2(prefix) {
  return [prefix, new Date().getTime()].join('');
}

console.log('uniqueString2("argento") ===', uniqueString2('argento'));

console.log('But now what if it needs a prefixed string with an increasing suffix starting at a');
console.log('specific value?');

function makeUniqueStringFunction(start) {
  let counter = start;
  
  return function(prefix) {
    return [prefix, counter++].join('');
  }
}
const uniqueString3 = makeUniqueStringFunction(0);

console.log('uniqueString3("dari") ===', uniqueString3('dari'));
console.log('uniqueString3("dari") ===', uniqueString3('dari'));

console.log();
console.log('A function guarding against `null` values: `fnull`');

const nums = [1, 2, 3, null, 5];
console.log('We have a sequence of numbers. Unfortunately, some numbers are null.');
console.log(nums);

console.log('Reducing this sequence using multiply produces a, perhaps unexpected, result.');
console.log('_.reduce(nums, (soFar, n) => soFar * n) ===', _.reduce(nums, (soFar, n) => soFar * n));

function fnull(fun, /* defaults */) {
  const defaults = _.rest(arguments);
  console.log('defaults ===', defaults);
  
  return function(/* args */) {
    // i is either an *index* or a *key*
    const args = _.map(arguments, (e, i) => introduction.existy(e) ? e : defaults[i]);
    
    return fun.apply(null, args);
  }
}

console.log('fnull improves our multiplication reduction');
const safeMult = fnull((soFar, n) => soFar * n, 1, 1);
console.log(_.reduce(nums, safeMult));

console.log();
console.log('Imagine a function that uses an object for configuration.');


function explodingDefaults(d) {
  return function(o, k) {
    const val = d[k];
    return o && val;
  }
}
function explodingDoSomething(configuration) {
  const lookup = explodingDefaults({ critical: 108 });
  
  return lookup(configuration, 'critical');
}

console.log('explodingDoSomething(lodingConfiguration) ===', explodingDoSomething());

function defaults(d) {
  return function(o, k) {
    const val = fnull(_.identity, d[k]);
    return o && val(o[k])
  }
}

function doSomething(configuration) {
  const lookup = defaults({ critical: 108 });
  
  return lookup(configuration, 'critical');
}

console.log('doSomething works with a supplied argument');
console.log('doSomething({critical: 9}) ===', doSomething({ critical: 9 }));
console.log('and no longer explodes with no argument');
console.log('doSomething() ===', doSomething());

