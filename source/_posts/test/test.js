
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
    presets: ['@babel/preet-env']
  })

  // 返回文件名称 依赖关系
  return {
    filename,
    dependencies,
    code
  }
}

function readFile (filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module' // babel官方规定必须加这个参数 不然无法识别ES MODULE
  })
  return ast
}

function traverseAST (ast) {
  const dependencies = {}
  traverse(ast, {
    // 获取通过import引入的模块
    ImportDeclaration({code}) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value)
      // 保存所依赖的模块
      dependencies[node.source.value] = newFile
    }
  })
  return dependencies
}

