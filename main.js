const {  crawlPage } = require('./crawl')
function main() {
    if (process.argv.length < 3){
        console.log("no website was passed in")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("too many arguments")
    }
 
    const baseURL = process.argv[2]
    console.log(`starting crawler on ${baseURL}`)
    crawlPage(baseURL)

}

main()