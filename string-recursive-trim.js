// this is an exemple of recoursive trimmed string

function trim(value) {

    var temp = value
    var obj = /^(\s*)([\W\w])(\b\s$)/
    if (obj.test(temp)) { temp = temp.replace(obj, '$2') }
    var obj = / +/g
    temp = temp.replace(obj, " ")
    if (temp == " ") { temp = ""; }
    return temp

}
