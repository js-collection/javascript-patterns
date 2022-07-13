// this is an exemple of cross browser iframe content getter
// https://stackoverflow.com/questions/7570496/getting-the-document-object-of-an-iframe

function getIframeContent(f) {
    if (f.contentWindow) return f.contentWindow; else if (f.window) return f.window
    let c = (f.contentDocument) ? f.contentDocument : (f.document) ? f.document : false
    return (c && doc.defaultView) ? c.defaultView : (c && c.parentWindow) ? c.parentWindow : undefined
}
