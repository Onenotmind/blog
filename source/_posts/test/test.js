
// npm install @babel/parse @babel/traverse @babel/core @babel/preset-env

const fs = require('fs')
const path = require('path')
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const babel = require('@babel/core')


function stepOne (filename) {
  // read file
  const ast = readFile(filename)
  // 遍历ast抽象语法
  const dependencies = traverseAST(ast)

  // 通过@babel/core 和 @babel/preset-env 进行代码的转换
  const { code } = babel.transformFromAst(ast, null, {
    
  })
}


