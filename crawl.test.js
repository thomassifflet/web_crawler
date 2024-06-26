const { getURLsFromHTML, normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})

test('normalizeURL strip trailing slashes', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})

test('normalizeURL strip capital letters', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})


test('getURLsFromHTML absolute', () => {
    const inputHTML = `
<html>
    <body>
        <a href="https://blog.boot.dev">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML relative', () => {
    const inputHTML = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML both', () => {
    const inputHTML = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog chemin un
        </a>
        <a href="/path2/">
            Boot.dev Blog chemin deux
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML invalid', () => {
    const inputHTML = `
<html>
    <body>
        <a href="invalide">
            Boot.dev Blog lmao
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected) 
})