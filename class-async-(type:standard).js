/* --- fake async task */

function simulateTask(delay, str) {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(str);
        }, delay)
    );
}

/* --- unveil: anti debug bug */

function unveil(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/* --- async class */

class myClass {

    constructor() {
        this.data = {}
    }

    async init() {

        return Promise.all([
            this.produceTheFirstDataAsset(),
            this.produceTheSecondDataAsset('firsttest ')
        ])

    }

    async produceTheFirstDataAsset() {

        //do operations
        let stack = await Promise.all([
            simulateTask(250, `task 1.1 completed`),
            simulateTask(500, `task 1.2 completed`),
            simulateTask(250, `task 1.3 completed`),
        ])

        //save result
        this.data['TEST01'] = [stack[ 0 ], stack[ 1 ], stack[ 2 ]]
        console.log('the first asset was produced')

        //return result
        return this.data

    }

    async produceTheSecondDataAsset(str) {

        //do operations
        let stack = await Promise.all([
            simulateTask(250, `task ` + str + `2.1 completed`),
            simulateTask(500, `task ` + str + `2.2 completed`),
            simulateTask(250, `task ` + str + `2.3 completed`),
        ])

        //save result
        this.data['TEST02'] = [stack[ 0 ], stack[ 1 ], stack[ 2 ]]
        console.log('the second asset was produced')

        //return result
        return this.data

    }
}


async function initMyClass() {
    let myClassIstance = new myClass()
    await myClassIstance.init()
    return myClassIstance
}

/*export*/ const myClassIstance = initMyClass()

// how to use:
// 
// > if standard:
//
// <script src="script.js"></script>
// <script>
//    myClassIstance.then( async classAsset => {
//        console.log('the init test data:', unveil(classAsset) )
//        if(classAsset.data['TEST02'][0]=="task firsttest 2.1 completed"){
//          classAsset.produceTheSecondDataAsset('rewritten ')
//          console.log('the refreshed data:', unveil(classAsset) )
//        }
//    })
// </script>
//
// unveil method note:
//      If you try to print an object in console and then edit it, that
//      object will only appear as in the latest update. Hence, you can
//      no longer read the previous status. It is a purely visual phenomenon
//      (the state, if called by navigating the object, is then legible).
//      This is a known browser debugging bug. To work around you can use the
//      unveil (obj) method. Without it, you will only be able to see your
//      latest status. Exemple: console.log( unveil(classAsset) ).
//      read more on: https://stackoverflow.com/q/4057440/19579604
