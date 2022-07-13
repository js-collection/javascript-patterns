// async class experimental

class myclass {
    
    constructor() { 

        this.data = {}

        this.runner_01()
        this.runner_02()
        this.runner_03()
        this.runner_04()
 
    }

    async runner_01 () {

            let process =  performance.now()
            console.log("start runner_01 ",process)

            setTimeout(() => { 

                this.data.runners_01 = "this data of 01!"
                console.log("end runner_01", process - performance.now())

            },4000)

    }

    async runner_02 () {

            let process =  performance.now()
            console.log("start runner_02 ",process)

            setTimeout(() => { 

                this.data.runners_02 = "this data of 02!"
                console.log("end runner_02", process - performance.now())

            },4000)

    }

    async runner_03 () {

            let process =  performance.now()
            console.log("start runner_03 ",process)

            setTimeout(() => { 

                this.data.runners_03 = "this data of 03!"
                console.log("end runner_03", process - performance.now())

            },4000)

    }

    async runner_04 () {

            let process =  performance.now()
            console.log("start runner_04 ",process)

            setTimeout(() => { 

                this.data.runners_04 = "this data of 04!"
                console.log("end runner_04", process - performance.now())

            },4000)

    }
        
}

const theclass = new myclass()

console.log( "the class data:", theclass.data)


// log:
// start runner_01  58.5...
// start runner_02  58.7...
// start runner_03  59
// start runner_04  59.0...
// the class data: { 
//      runners_01: "this data of 01!"
//      runners_02: "this data of 02!"
//      runners_03: "this data of 03!"
//      runners_04: "this data of 04!"
// }
// end runner_01 -4008.3...
// end runner_02 -4008.4...
// end runner_03 -4008.3...
// end runner_04 -4008.5
