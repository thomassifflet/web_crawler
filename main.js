const { formatAndPrint } = require('./report')
const {  crawlPage } = require('./crawl')

async function main() {
    if (process.argv.length < 3){
        console.log("no website was passed in")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("too many arguments")
    }
 
    const baseURL = process.argv[2]
    console.log(`starting crawler on ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    formatAndPrint(pages)
}

main()