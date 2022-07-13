// this is an exemple of recoursive stepper loop

let elements = [...myarray],
    step = 0;


( loopbystep = () => {

    // make step
    initStep( elements[step], step, otherparams,
    
    () => {

        //up step
        step++;

        //start new loop step whit new step
        if( step < elements.length ) { loopbystep(elements,step); } 

    })

})(array,step,otherparams)

// operation for this step
function initStep(elements,step,otherparams,back) {

    //elements[step] do, if all done:
    back() //return to initStep

}
