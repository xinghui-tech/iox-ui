const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")
const exec = require('child_process').exec

const root = path.join(__dirname, '../')
const lib = path.join(root, '/lib')

const sources = [];
// components
sources.push({to: 'widget', from: path.join(root, '/src/components')})
// styles
sources.push({to: 'style', from: path.join(root, '/src/style')})
// utils
sources.push({to: 'utils', from: path.join(root, '/src/utils')})

/* build lib */
sources.forEach(s => {
  fs.copySync(s.from, path.join(lib, s.to))
})

const delFileLists = glob.sync(lib + '/**/*.{json,md,bak}')
// 删除json  md 等不必要文件
delFileLists.forEach((fileName) => {
	fs.removeSync(fileName)
})

/* build index.js */
// var filenames = []
// var filenamesUpper = []

// var files = glob.sync(lib + '/**/*.vue')

