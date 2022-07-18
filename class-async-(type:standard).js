/* --- fake async task */

function simulateTask(delay, str) {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(str);
        }, delay)
    );
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

//
//  warning debug bug:
//  After you change a property, if you print an object without saying
//  which property you want the updated object will always appear.
//  This is a debugging printer problem, not is the class.
//

// how to use:
// 
// > if standard:
//
// <script src="script.js"></script>
// <script>
//    myClassIstance.then( async classAsset => {
//        console.log('the init test data:', classAsset)
//        if(classAsset.data['TEST02'][0]=="task firsttest 2.1 completed"){
//          classAsset.produceTheSecondDataAsset('rewritten ')
//          console.log('the refreshed data:', classAsset)
//        }
//    })
// </script>
//
// > if exportable:
//
// now you can import where you want the base and work with the assets
// <script type="module">
//     import { myClassIstance } from 'script.js';
//     myClassIstance.then( async classAsset => {
//        console.log('the init test data:', classAsset)
//        if(classAsset.data['TEST02'][0]=="task firsttest 2.1 completed"){
//          await classAsset.MYCLASSMETHOD('METHODOPTIONS');
//          console.log('the refreshed data:', classAsset);
//        }
//     });
// </script>
