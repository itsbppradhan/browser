const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const archiver = require('archiver')
const builder = require('electron-builder')
const Arch = builder.Arch

const packageFile = require('./../package.json')
const version = packageFile.version
const platform = process.argv.find(arg => arg.match('platform')).split('=')[1]

function toArch (platform) {
  switch (platform) {
    case 'x86':
      return Arch.x64
    case 'arm64':
      return Arch.arm64
  }
}

require('./createPackage.js')('mac', { arch: toArch(platform) }).then(function (packagePath) {
  const appName = fs.readdirSync(packagePath).find(name => name.endsWith('.app'))
  if (!appName) {
    throw new Error('Could not find packaged macOS app')
  }
  const appPath = path.join(packagePath, appName)

  if (platform === 'arm64') {
    execSync('codesign -s - -a arm64 -f --deep "' + appPath + '"')
  }

  /* create output directory if it doesn't exist */

  if (!fs.existsSync('dist/app')) {
    fs.mkdirSync('dist/app')
  }

  /* create zip file */

  var output = fs.createWriteStream('dist/app/biraja-browser-v' + version + '-mac-' + platform + '.zip')
  var archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory(appPath, appName)

  archive.pipe(output)
  archive.finalize()
})
