// 
// This is a brutal and inelegant, yet practical, version of building a classroom with asynchrons
// 


/* --- fake async task */


function faketask (delay, framenumber, tasknumber, log) { 
    return new Promise( resolve =>
        setTimeout( () => {
            let dataresult = JSON.parse( '{\"frame_0'+framenumber+'\" : \"data of task n: '+tasknumber+'\"}')
            resolve([ log, dataresult ])
        }, delay)
    )
}


/* --- exec timer */


let time = 0; const int = setInterval(() => { time += 100; if (time >= 5000) clearInterval(int) }, 100)


/* --- async class */


// Explanation:

// - Data is a private object intended to collect all useful results of all functions
// - Status is an array that contains the progress of the main functions (frames)
// - The main functions (frames) only launched simultaneously by js following the logic of asynchronous systems
// - Within the functions there are 2 models, the first has its tasks executed step by step, the second loads its tasks simultaneously

class myclass {

    #data
    #status

    constructor() { 

        this.#data = {}
        this.#status = []
        this.#concurrent_frame_01()
        this.#concurrent_frame_02()
 
    }

    async #concurrent_frame_01 () {

        this.#status[0] = 'pending'
    
        /* --- */

        Object.assign( this.#data, { frame_01_data:[] } )

        /* --- */

        // this tasks are step by step

        let task1 = await faketask( 1000, '1', '1', `frame 1 -> task 1: ${time}ms` )
        console.log(task1[0]+`-> ${time}ms`)
        this.#data['frame_01_data'].push(task1[1])

        let task2 = await faketask( 500, '1', '2', `frame 1 -> task 2: ${time}ms` )
        console.log(task2[0]+`-> ${time}ms`)
        this.#data['frame_01_data'].push(task2[1])

        let task3 = await faketask( 2000, '1', '3', `frame 1 -> task 3: ${time}ms` )
        console.log(task3[0]+`-> ${time}ms`)
        this.#data['frame_01_data'].push(task3[1])

        let task4 = await faketask( 1500, '1', '4', `frame 1 -> task 4: ${time}ms` )
        console.log(task4[0]+`-> ${time}ms`)
        this.#data['frame_01_data'].push(task4[1])

        /* --- */

        console.log(`concurrent_frame_01 -> close all tasks in ${time}ms`)
        this.#status[0] = 'ready'

        /* --- */

        return this.#data

    }

    // make new new simultaneous frame with new inner tasks
    async #concurrent_frame_02 () {

        this.#status[1] = 'pending'
    
        /* --- */

        Object.assign( this.#data, { frame_02_data:[] } )

        /* --- */

        // this tasks are simultaneous
        let tasks = await Promise.all([
            faketask( 1000, '2', '1', `promise all frame 2 -> task 1: ${time}ms` ),
            faketask( 500,  '2', '2', `promise all frame 2 -> task 2: ${time}ms` ),
            faketask( 2000, '2', '3', `promise all frame 2 -> task 3: ${time}ms` ),
            faketask( 1500, '2', '4', `promise all frame 2 -> task 4: ${time}ms` )
        ])

        this.#data['frame_02_data'].push( tasks[0][1], tasks[1][1], tasks[2][1], tasks[3][1] )

        /* --- */

        console.log(`concurrent_frame_02 -> close all tasks in ${time}ms`)
        this.#status[1] = 'ready'

        /* --- */

        return this.#data

    }

    data() {

        return new Promise( resolve =>{
            
            const statusloop = setInterval(() => {

                let data_is_ready = true

                this.#status.forEach( status => {

                    console.log('loop data status...')
                    if( status == 'pending' ) data_is_ready = false

                })

                if (data_is_ready)
                    console.log('data is ready!'),
                    resolve(this.#data),
                    clearInterval(statusloop)

            }, 10)

            setTimeout(()=>{
                clearInterval(statusloop)
            },10000) // exec secure limit 10s

        })

    }
    
}

const theclass = new myclass()


// console.log(`
//     TEST 01 - DIRECT CALL OF DATA:
//     It's a wrong way to get class data
//     I suggest you to use the private fields
//     It's not good bec not await the end of all functions
//     and return random values (all, or partial or completely wrong data)`,
//     theclass.data,'\n\n'
// )

theclass.data().then( data => {

    console.log( "Class data is all available :", data )

})


/* -------------- */
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
