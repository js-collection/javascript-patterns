/* --- fake async task */

function simulateTask(delay, str) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(str);
    }, delay)
  );
}

/* --- async class */

class myclass {
  constructor() {
    this.data = [];
  }

  async init() {
    return Promise.all([
      this.produceTheFirstDataAsset(),
      this.produceTheSecondDataAsset(null),
    ]);
  }

  async produceTheFirstDataAsset() {
    let stack = await Promise.all([
      simulateTask(250, `task 1.1 completed`),
      simulateTask(500, `task 1.2 completed`),
      simulateTask(250, `task 1.3 completed`),
    ]);
    this.data[0] = []; //reset ex data if recall this method
    this.data[0].push(stack[0], stack[1], stack[2]);
    console.log('the first asset was produced');
    return this.data;
  }

  async produceTheSecondDataAsset(str) {
    let stack = await Promise.all([
      simulateTask(250, `task ` + (str ? str : '') + `2.1 completed`),
      simulateTask(500, `task ` + (str ? str : '') + `2.2 completed`),
      simulateTask(250, `task ` + (str ? str : '') + `2.3 completed`),
    ]);
    this.data[1] = []; //reset ex data if recall this method
    this.data[1].push(stack[0], stack[1], stack[2]);
    console.log('the second asset was produced');
    return this.data;
  }
}

async function initializeClass() {
  const myClassIstance = new myclass();
  await myClassIstance.init();
  return myClassIstance;
}

export const MyClass = initializeClass();

// how to use:
//
// <script type="module" src="yourscriptwithclass.js">
//     MyClass.then(async (classReady) => {
//         await classReady.produceTheSecondDataAsset('rewritten ');
//         console.log('the refreshed data:', classReady);
//     });
// </script>
//
// or
//
// <script type="module">
//     import { MyClass } from './script.js';
//     MyClass.then(async (classReady) => {
//         await classReady.produceTheSecondDataAsset('rewritten ');
//         console.log('the refreshed data:', classReady);
//     });
// </script>
