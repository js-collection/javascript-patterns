// info:
// this is a guideline for undestand the concept of
// async functions and the promise.all
// a really good video for understand is:
// https://www.youtube.com/embed/vC6G7CZPCuY?start=194&end=292 (from 3:14 to 4:53)

/* --- fake async */

const sleep = (delay, data) =>
    new Promise((callback) =>
        setTimeout(() => {
            callback(data);
        }, delay)
    )


/* --- exec timer */

let time = 0;
const int = setInterval(() => {
    time += 100;
    if (time >= 5000)
        clearInterval(int);
        //console.log('Timeout: 5000ms')
}, 100)


/* --- */


// 1. async key generate promise function, it's equal to "return new Promise( ... )"
//    so, in anycase, run the sync or await an async result
//    ⓘ https://hackernoon.com/async-await-generators-promises-51f1a6ceede2?fbclid=IwAR3nBDARZmOzjaZSmTcxb83iK8limyHsbBqk4PJpIijLpN6wQXOJ9sWrNic

// 2. The await move to end of stack (js event loop) the tasks waiting of a result.
//    "Almost simultaneously" (because execute is tick by tick and in single thread) can run
//    the other external functions, with their other tasks. So... await, is an "async-sequential"
//    into that specific function;  that is after get result of first task of its func, it
//    start second task in same func etc.
// 	  ⓘ https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
// 	  ⓘ https://stackoverflow.com/questions/19822668/what-exactly-is-a-node-js-event-loop-tick#:~:text=This%20is%20a,JavaScript%20was%20running
//
//    NB: If the functions could be just awaits it would all be async to the point of becoming concurrently...  this detail will be better explained later.

const sequential = async () => {
    // ...wait a result and go on next
    const r1 = await sleep(1000, `run 1: ${time}ms`)
    console.log(r1, `-> ${time}ms`)

    // ...wait a result and go on next
    const r2 = await sleep(500, `run 2: ${time}ms`)
    console.log(r2, `-> ${time}ms`)

    // ...
    const r3 = await sleep(2000, `run 3: ${time}ms`)
    console.log(r3, `-> ${time}ms`)
}

const concurrent = async () => {

    // 3. if it's single thread, why is it parallel? NO.
	//
	//    The only way to make real parellel function si a web worker. However
	//    Js can run more function "almost simultaneously".
	//
    //    Promise.all is "async-concurrent" ("almost simultaneously"), start
    //    the first function and immediately the second (etc) without waiting 
	//    for a result a specific resul or for the next task (await)

    const r = await Promise.all([
        sleep(1000, `parallel 1: ${time}ms`),
        sleep(1500, `parallel 2: ${time}ms`),
        sleep(2500, `parallel 3: ${time}ms`),
    ])

    console.log(r, `resolved in: ${time}ms`)
}

// 4. (warning: what follows is true? apparently yes) 
//    make a "sequential_01,sequential_02, ecc" it's similar to make "primise.all([...])" 
//    but in the second case you wait all to end and have a result, in the first
//    all func is indipendent

/* --- */

sequential()
concurrent()
