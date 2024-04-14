const { link } = require('fs')
const { JSDOM } = require('jsdom')


async function crawlPage(baseURL, currentURL, pages){
   
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

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

            const htmlBody = await request.text()

            const nextURLs = getURLsFromHTML(htmlBody, baseURL)
            for (const nextURL of nextURLs){
                pages = await crawlPage(baseURL, nextURL, pages)

            }
        } catch (err) {
            console.log(`An error occured on crawling ${currentURL}: ${err.message}`)
        }
        return pages
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