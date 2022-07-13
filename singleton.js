//// this is an exemple of singleton structure
//// https://jsfiddle.net/3rjn950m/8/

const person = {

    name, 

    setName: newName => {
      this.name = newName
    },

    getName: () => {
      return this.name
    }

}

// set prop
person.setName("HELLO WORLD!")

// get prop
console.log( person.getName() )
