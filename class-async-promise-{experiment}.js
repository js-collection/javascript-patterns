// async class experimental

class myclass {
    
    constructor() { 

        this.data = {}
        this.#init()

    }

    async #init() {

        var start = performance.now();


        // 1:   you need use am arrow function for read the global class "this",
        //      or pass it via normal "function NAME (this.data)"
        // 2:   you can run other external functions with classic way this.myotherfunc()

        const runner_01 = () => new Promise( status => {

            let process = start - performance.now()
            console.log("start runner_01 ",process)

            setTimeout(() => { 

                this.data.runners_01 = "this data of 01!"
                console.log("end runner_01", process - performance.now())
                status('completed')

            },2000)

        })


        const runner_02 = () => new Promise( status => {

            let process = start - performance.now()
            console.log("start runner_02 ",process)

            setTimeout(() => { 

                this.data.runners_02 = "this data of 02!"
                console.log("end  runner_02", process - performance.now())
                status('completed')

            },2000)

        })


        const runner_03 = () => new Promise( status => {

            let process = start - performance.now()
            console.log("start runner_03 ",process)

            setTimeout(() => { 

                this.data.runners_03 = "this data of 03!"
                console.log("end  runner_03", process - performance.now())
                status('completed')

            },2000)

        })

        const runner_04 = () => new Promise( status => {

            let process_start = start - performance.now()
            console.log("start runner_04 ",process_start)

            setTimeout(() => { 

                this.data.runners_04 = "this data of 04!"
                console.log("end  test_run_04 ", process_start - performance.now())
                status('completed')

            },2000)

        })

        const result = await Promise.allSettled ([ 

            runner_01(),
            runner_02(),
            runner_03(),
            runner_04()

        ])

        console.log('all process end', start - performance.now())

        return result;
    }
        
}

const theclass = new myclass()

console.log( "the class data:", theclass.data)


// log:
// start runner_01  -0.1...
// start runner_02  -0.3...
// start runner_03  -0.3...
// start runner_04  -0.5...
// the class data: {
//      runners_01: "this data of 01!"
//      runners_02: "this data of 02!"
//      runners_03: "this data of 03!"
//      runners_04: "this data of 04!"
// }
// end runner_01 -2049.1...
// end  runner_02 -2049.6...
// end  runner_03 -2050.2...
// end  test_run_04  -2050.6...
// all process end -2006.3...
