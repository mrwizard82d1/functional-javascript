var _ = require('underscore');

function splat(fun) {
    return function(array) {
        fun.apply(null, array);
    }
}

function unsplat(fun) {
    return function() {
        return fun.call(null, _.toArray(arguments))
    }
}

var joinElements = unsplat(function(array) { return array.join(' '); });

joinElements(1, 2);

joinElements('-', '$', '/', '!', ':');

