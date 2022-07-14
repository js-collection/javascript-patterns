
// more on: 
//   https://stackoverflow.com/questions/36588775/are-javascript-promise-asynchronous?fbclid=IwAR1s4NciT18bJeJ1w0pkfQsiC7JBPixKdfpRcCVBuD1Pk_3_S7uUQHMF2SA
//   https://www.geeksforgeeks.org/explain-promise-all-with-async-await-in-javascript/
//   https://www.taniarascia.com/promise-all-with-async-await/
//   https://www.w3schools.com/js/js_promise.asp
//   https://www.w3schools.com/js/js_async.asp
//   https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
//   https://stackoverflow.com/questions/60092485/getting-parallel-async-await-to-work-javascript
//   https://programmingwithswift.com/run-async-await-in-parallel-with-javascript/
//   https://www.facebook.com/groups/javascript.developer.italiani/posts/1126531027899202/?comment_id=1126540347898270&reply_comment_id=1126549474564024&notif_id=1657712648486647&notif_t=group_comment_mention
//   https://hackernoon.com/async-await-generators-promises-51f1a6ceede2?fbclid=IwAR3nBDARZmOzjaZSmTcxb83iK8limyHsbBqk4PJpIijLpN6wQXOJ9sWrNic
//   https://stackblitz.com/edit/react-wkt674?fbclid=IwAR09fuMQ2g42LbDdix-Ie6WV-mDckbhGG8N4y2vm-z35tulpU_s8rW2PAhU&file=src%2FApp.js
//   https://stackblitz.com/edit/react-zimyso?fbclid=IwAR2tA6CjhElZ-YYzC8YqjXMDgG6HOV98qd4mmo-wqgE3vpF46LMCKwpUMxU&file=src%2FApp.js


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
