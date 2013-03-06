var fs = require('fs')
  , read = fs.readFileSync
  , write = fs.writeFileSync
  , path = require('path')

module.exports = inline

if (!module.parent) {
  var program = require('commander')
    .usage('[options] <file>')
    .option('-o --out <file>', 'Output file')
    .parse(process.argv)

  if (program.args.length != 1) {
    program.outputHelp()
    process.exit()
  }
  var infile = program.args.pop()
  var cwd = process.cwd()
  var abs = path.join(cwd, infile)
  var inlined = inline(abs)
  write(program.out, inlined)
}

function inline(file) {
  var dir = path.dirname(file)
  var source = read(file, 'utf8').toString()
  var lines = source.split('\n')
  var pattern = /-- #include (\..*)$/
  var includes = lines.map(function (line) {
      return pattern.exec(line)
    }).filter(function (match) {
      return match
    })

  includes.forEach(function (match) {
    source = source.replace(match[0], inline(path.join(dir, match[1])))
  })
  
  return source
}
