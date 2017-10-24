var _ = require('underscore');

function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  }
}

var addArrayElements = splat(function(x, y) {
  return x + y;
});

console.log(addArrayElements([1, 2]));

function unsplat(fun) {
  return function() {
      return fun.call(null, _.toArray(arguments))
  }
}

var joinElements = unsplat(function(array) { return array.join(' '); });

console.log(joinElements(1, 2));
console.log(joinElements('-', '$', '/', '!', ':'));

function fail(thing) {
  throw new Error(thing);
}

try {
  fail('Lorem ipsum');
}
catch (e) {
  console.log('Caught it.', e);
}

function warn(thing) {
  console.log(['WARNING:', thing].join(' '));
}
warn('dolor sit');

function note(thing) {
  console.log(['NOTE', thing].join(' '));
}
note('veni, vidi, vici');

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

console.log(isIndexed([]));
console.log(isIndexed('Utrum esse oporteat, annon'));

function nth(a, index) {
  if (!_.isNumber(index)) {
    fail('Expected a number, received ' + index);
  }
  if (!isIndexed(a)) {
    fail('nth not supported on non-indexed type');
  }
  if ((index < 0) || (index > a.length - 1)) {
    fail('Index ' + index + ' out of bounds');
  }
  
  return a[index];
}

var letters = ['a', 'b', 'c'];

console.log(nth(letters, 1));
console.log(nth("abc", 0));
// console.log(nth({}, 2));
// console.log(nth(letters, 4000));
// console.log(nth(letters, 'aaaa'));

function second(a) {
  return nth(a, 1);
}

console.log(second(['a', 'b']));
console.log(second('fogus'));
// console.log(second({}));
