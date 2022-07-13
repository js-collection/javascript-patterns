var arrays = [ [ 'apple', [ 'taco', 'fish', 'apple', 'pizza' ], 'banana', 'pear', 'fish', 'pancake', 'taco', 'pizza' ], [ 'banana', 'pizza', 'fish', 'apple' ] ]

var result = arrays.shift().filter( function (v) {
    return arrays.every( function (a) {
        return a.indexOf(v) !== -1
    })
})
