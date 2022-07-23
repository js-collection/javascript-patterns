// fake async task
function simulateTask(delay, str) {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(str);
        }, delay)
    );
}

//do operations
let stack = await Promise.all([
    simulateTask(250, `task 1.1 completed`),
    simulateTask(500, `task 1.2 completed`),
    simulateTask(250, `task 1.3 completed`)
])
