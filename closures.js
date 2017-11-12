const _ = require('underscore');

console.log();
console.log('`complement` closes over a predicate');

function complement(pred) {
  return (/* arguments */) => (!pred.apply(null, _.toArray(arguments)));
}

function isEven(n) {
  return ((n % 2) === 0);
}

isOdd = complement(isEven);

console.log(['isEven(108)', '===', isEven(108)].join(' '));
console.log(['isOdd(109)', '===', isOdd(109)].join(' '));

console.log();
console.log('What if we change the implementation of `isEven`?');

isEven = n => true;
console.log(['isEven.toString():', isEven.toString()].join(' '));

console.log(['isEven(108)', '===', isEven(108)].join(' '));
console.log(['isEven(109)', '===', isEven(109)].join(' '));
console.log(['isOdd(108)', '===', isOdd(108)].join(' '));
console.log(['isOdd(109)', '===', isOdd(109)].join(' '));

console.log();
console.log('Closures as an abstraction');

console.log();
console.log('`plucker` captures the name of field');

function plucker(fieldName) {
  return obj => (obj && obj[fieldName]);
}

const best = {
  title: 'Infinite Jest',
  author: 'DFW',
};

const getTitle = plucker('title');

console.log('getTitle(', best, ') ===', getTitle(best));
console.log('getTitle(undefined) ===', getTitle(undefined));
console.log('getTitle(', { titel: 'Nihilo' }, ') ===', getTitle({ titel: 'Nihilo' }));

console.log();
console.log('`plucker` also works with arrays');

const books = [{ title: 'Chthon' }, { stars: 5 }, { title: 'Botchan' }];

const third = plucker(2);

console.log('third(', books, ') ===', third(books));

console.log();
console.log('Finally, `plucker` can be used with `_.filter` to grab objects that have a specific' +
            ' field');
console.log('_.filter(books, getTitle) ===', _.filter(books, getTitle));
