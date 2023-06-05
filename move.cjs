const fs = require('fs');
const path = require('path');
const readPath = path.resolve(__dirname, '../q/src/main/resources/static/index.html')
const writePath = path.resolve(__dirname, '../q/src/main/resources/templates/qr/index.html')
function readFile() {
  return fs.readFileSync(readPath, { encoding: 'utf8' })
}

function writeFile(data) {
  fs.writeFileSync(writePath, data, { encoding: 'utf8' })
}

function main() {
  let str = readFile()
  writeFile(str)
}

main()