const { link } = require('fs')
const { JSDOM } = require('jsdom')


async function crawlPage(currentURL){
    console.log(`actively crawling ${currentURL}`)

        try {
            const request = await fetch(currentURL)
            if (request.status > 399) {
                console.log(`Error: status code not valid ${request.status} on page ${currentURL}`)
            }
            const contentType = request.headers.get('content-type')

            if ( !contentType.includes('text/html')) {
                console.log(`Non html response, content type: ${contentType} on page ${currentURL}`)
            }
            else {
                console.log(await request.text())
            }
            
        } catch (err) {
            console.log(`An error occured on crawling ${currentURL}: ${err.message}`)
        }
}

function normalizeURL(urlString){
    const myURL = new URL(urlString)
    const hostPath = `${myURL.hostname}${myURL.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0, -1)
    } 
    return hostPath
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with relative url ${error.message}`)
            }

        } else {
            try {
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with absolute url ${error.message}`)
            }
        }

    }
    return urls
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}