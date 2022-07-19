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

        this.ready = ( async () => {
            return await this.init()
        })()

        this.unveil = (obj) => { 
            return obj ? JSON.parse(JSON.stringify(obj)) : 'unveil requires an object or an array'
        }

    }

    async init() {

        if( Object.keys(this.data).length === 0 ){
            console.log("test")
            return Promise.all([
                this.produceTheFirstDataAsset(),
                this.produceTheSecondDataAsset('firsttest ')
            ])

        } 

    }

    async produceTheFirstDataAsset() {

        //do operations
        let stack = await Promise.all([
            simulateTask(250, `task 1.1 completed`),
            simulateTask(500, `task 1.2 completed`),
            simulateTask(250, `task 1.3 completed`)
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
            simulateTask(250, `task ` + str + `2.3 completed`)
        ])

        //save result
        this.data['TEST02'] = [stack[ 0 ], stack[ 1 ], stack[ 2 ]]

        console.log('the second asset was produced')

        //return result
        return this.data

    }

}

const myclass = new myClass()
// export { myclass }

// how to use:
// 
// > if standard:
//
// <script src="myclass.js"></script>
// <script>
//    myclass.ready.then( async data => {
//        console.log('the init test data:', myclass.unveil(data) )
//        myclass.produceTheSecondDataAsset('rewritten ')
//        console.log('the refreshed data:', myclass.unveil(data) )
//    })
// </script>
//
// > if exportable:
//
// if you work via module unfreeze "export { myclass }" and now you
// can import where you want the base and work with the data assets
// <script type="module">
//     import { myclass } from 'myclass.js';
//     myclass.ready.then( async data => {
//        console.log('the init test data:', myclass.unveil(data) )
//        myclass.produceTheSecondDataAsset('rewritten ')
//        console.log('the refreshed data:', myclass.unveil(data) )
//     });
// </script>
//
//
// unveil method note:
//      If you try to print an object in console and then edit it, that 
//      object will only appear as in the latest update. Hence, you can 
//      no longer read the previous status. It is a purely visual phenomenon 
//      (the state, if called by navigating the object, is then legible).
//      This is a known browser debugging bug. To work around you can use the 
//      unveil (obj) method. Without it, you will only be able to see your 
//      latest status.Exemple: console.log( myclass.unveil(asset) )
//      reaad more on: https://stackoverflow.com/q/4057440/19579604
