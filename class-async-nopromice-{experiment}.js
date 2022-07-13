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
