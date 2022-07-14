// info:
// This is a basic concept of async functions.
// You can see how asyc are a sequenzial tasks except
// that one with await. In that one case, the stack of that function
// into the event loop is detached and frozen waiting for
// its result and all other tasks slide on end of stack.
// Async respect its scope, all other functions run, but
// the one with with that await is in "async status"


const first_async = async () => {
    console.log('- first 1');
    console.log('- first 2');
};

const middle_async = async () => {
    console.log(
        '- mid 0 ...without an await not exist a stop into the stack, async it s a simple "wait a result" '
    );
    await console.log('- mid 1 ...wait result in this func, do other func.');
    console.log('- mid 2 ...moved last into the stack');
    console.log('- mid 3 ...moved last into the stack');
};

const last_async = async () => {
    console.log('- last 1');
    console.log('- last 2');
};

/* --- */

first_async();

console.log('----------');

middle_async();

console.log('----------');

last_async();


// log:
// - first 1
// - first 2
// ----------
// - mid 0 ...without an await not exist a stop into the stack, async it s a simple "wait a result" 
// - mid 1 ...wait result in this func, do other func.
// ----------
// - last 1
// - last 2
// - mid 2 ...moved last into the stack
// - mid 3 ...moved last into the stack
