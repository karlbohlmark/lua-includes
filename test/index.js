var fs = require('fs')
	, read = fs.readFileSync
	, write = fs.writeFileSync
	, path = require('path')
	, assert = require('assert')

var inline = require('../')

var actual = inline(path.resolve(__dirname, 'entry.lua'))

var expected = read(path.resolve(__dirname, 'expected.lua')).toString()

assert.equal(actual, expected)
