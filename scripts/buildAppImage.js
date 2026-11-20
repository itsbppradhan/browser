const builder = require('electron-builder')
const packageFile = require('./../package.json')
const version = packageFile.version
const Platform = builder.Platform
const Arch = builder.Arch

require('./createPackage.js')('linux', {arch: Arch.x64}).then(function (path) {
  const options = {
    linux: {
      target: ['AppImage'],
      icon: 'icons/icon256.png',
      category: 'Network',
      packageCategory: 'Network',
      mimeTypes: ['x-scheme-handler/http', 'x-scheme-handler/https', 'text/html'],
      synopsis: 'Biraja Browser is a fast, minimal browser for the Biraja ecosystem.',
      description: 'A fast, minimal browser with tab management and privacy-friendly built-in features.',
      maintainer: 'Biraja <pradhan@biraja.me>',
    },
    directories: {
      output: 'dist/app/'
    },
    publish: {
      provider: 'github',
      owner: 'itsbppradhan',
      repo: 'browser'
    }
  }

  builder.build({
    prepackaged: path,
    targets: Platform.LINUX.createTarget(['AppImage'], Arch.x64),
    config: options
  })
})
