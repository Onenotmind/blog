
function parse (source, parentPath) {
  let ast = babylon.parse(source)
  let dependcies = []

  traverse(ast, {
    CallExpression(p) {
      
    }
  })
}


