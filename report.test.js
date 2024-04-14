const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')


test('sortPages two pages', () => {
    const input = {
        'https://wagslane.dev/path': 2,
        'https://wagslane.dev': 5,

    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 5],
        ['https://wagslane.dev/path', 2]
    ]
    expect(actual).toEqual(expected) 
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 2,
        'https://wagslane.dev': 5,
        'https://wagslane.dev/path2': 7,
        'https://wagslane.dev/path3': 9,
        'https://wagslane.dev/path4': 1,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path3', 9],
        ['https://wagslane.dev/path2', 7],
        ['https://wagslane.dev', 5],
        ['https://wagslane.dev/path', 2],
        ['https://wagslane.dev/path4', 1]
    ]
    expect(actual).toEqual(expected) 
})