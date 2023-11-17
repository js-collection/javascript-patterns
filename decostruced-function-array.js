// decostructor role with array

// Define funciton and inner array datas...
function myFunction() {

    return [

        'demostration string',
        function () {
            return 'new demostration string';
        },
  
    ]
  
}
  
// now call what is inside that "function array return" 
const [decostructed_data, decostructed_method] = myFunction()
  
console.log(decostructed_data)         // Output: demostration string
console.log(decostructed_method())     // Output: new demostration string
  
