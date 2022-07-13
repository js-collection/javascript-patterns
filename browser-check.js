//// exemple of browser check
/// https://jsfiddle.net/2eg2yuzy/

function BrowserCheck() {

    var N= navigator.appName, ua= navigator.userAgent, tem
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident)/?\s*(.?\d+(.\d+)*)/i)

    if( M && ( tem = ua.match(/version/([.\d]+)/i)) != null ) { M[2] = tem[1] }

    M = M ? [M[1], M[2]] : [N, navigator.appVersion,'-?']

    return M;
}

console.log( BrowserCheck() )
