// info:
// this is a guideline for undestand the concept of
// async functions and the concurrently / simultaneous functions
// a really good video for understand is: https://www.youtube.com/embed/vC6G7CZPCuY?start=194&end=292 (from 3:14 to 4:53)
// and this git file: https://github.com/jsrt-project/common-js-patterns/blob/main/async-and-promise-advanced-concepts.js

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

const sequential_01 = async () => {
    // ...wait a result and go on next
    const r1 = await sleep(1000, `run 1A: ${time}ms`)
    console.log(r1, `-> ${time}ms`)

    // ...wait a result and go on next
    const r2 = await sleep(500, `run 1B: ${time}ms`)
    console.log(r2, `-> ${time}ms`)

    // ...
    const r3 = await sleep(2000, `run 1C: ${time}ms`)
    console.log(r3, `-> ${time}ms`)

    return 'sequential_01 end: ' + time + 'ms'
}

const sequential_02 = async () => {
    // ...wait a result and go on next
    const r1 = await sleep(1000, `run 2A: ${time}ms`)
    console.log(r1, `-> ${time}ms`)

    // ...wait a result and go on next
    const r2 = await sleep(500, `run 2B: ${time}ms`)
    console.log(r2, `-> ${time}ms`)

    // ...
    const r3 = await sleep(2000, `run 2C: ${time}ms`)
    console.log(r3, `-> ${time}ms`)

    return 'sequential_02 end: ' + time + 'ms'
}

/* --- */

sequential_01()
sequential_02()

// it's all very similar to:
// const concurrent_task_in_promise = async () => {
//   const r = await Promise.all([sequential_01(), sequential_02()])
//   console.log(r, `resolved in: ${time}ms`)
// }
// concurrent_task_in_promise()


// log:
// run 1A: 0ms -> 1000ms
// run 2A: 0ms -> 1000ms
// run 1B: 1000ms -> 1500ms
// run 2B: 1000ms -> 1500ms
// run 1C: 1500ms -> 3500ms
// run 2C: 1500ms -> 3500ms
// run 1C: 1500ms -> 2800ms
// run 2C: 1500ms -> 2800ms
