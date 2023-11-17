// decostructor role with objects

// Define funciton and am obj with keys and methods
function myFunction() {

    return {

        data: 'demostration string',

        decostructed_method: function () {
            return 'new demostration string'
        },

    }

}

// now call what is inside that "function object return" 
const { decostructed_data, decostructed_method } = myFunction()

console.log(decostructed_data)         // Output: demostration string
console.log(decostructed_method())     // Output: new demostration string
