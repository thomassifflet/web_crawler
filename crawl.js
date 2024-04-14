const { url } = require('node:url')

function normalizeURL(urlString){
    const myURL = new URL(urlString)
    const hostPath =  `${myURL.hostname}${myURL.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0, -1)
    } 
    return hostPath
}

module.exports = {
    normalizeURL
}