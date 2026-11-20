var regedit = require('regedit')

var installPath = process.execPath

var keysToCreate = [
  'HKCU\\Software\\Classes\\BirajaBrowser',
  'HKCU\\Software\\Classes\\BirajaBrowser\\Application',
  'HKCU\\Software\\Classes\\BirajaBrowser\\DefaulIcon',
  'HKCU\\Software\\Classes\\BirajaBrowser\\shell\\open\\command',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\FileAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\StartMenu',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\URLAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\DefaultIcon',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\InstallInfo',
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\shell\\open\\command'
]

var registryConfig = {
  'HKCU\\Software\\RegisteredApplications': {
    'Biraja Browser': {
      value: 'Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\BirajaBrowser': {
    default: {
      value: 'Biraja Browser Document',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\BirajaBrowser\\Application': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    },
    ApplicationName: {
      value: 'Biraja Browser',
      type: 'REG_SZ'
    },
    AppUserModelId: {
      value: 'BirajaBrowser',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\BirajaBrowser\\DefaulIcon': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\BirajaBrowser\\shell\\open\\command': {
    default: {
      value: '"' + installPath + '" "%1"',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
    BirajaBrowser: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
    BirajaBrowser: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\FileAssociations': {
    '.htm': {
      value: 'BirajaBrowser',
      type: 'REG_SZ'
    },
    '.html': {
      value: 'BirajaBrowser',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\StartMenu': {
    StartMenuInternet: {
      value: 'Biraja Browser',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\Capabilities\\URLAssociations': {
    http: {
      value: 'BirajaBrowser',
      type: 'REG_SZ'
    },
    https: {
      value: 'BirajaBrowser',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\DefaultIcon': {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\InstallInfo': {
    IconsVisible: {
      value: 1,
      type: 'REG_DWORD'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\BirajaBrowser\\shell\\open\\command': {
    default: {
      value: installPath,
      type: 'REG_DEFAULT'
    }
  }
}

var registryInstaller = {
  install: function () {
    return new Promise(function (resolve, reject) {
      regedit.createKey(keysToCreate, function (err) {
        regedit.putValue(registryConfig, function (err) {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
      })
    })
  },
  uninstall: function () {
    return new Promise(function (resolve, reject) {
      regedit.deleteKey(keysToCreate, function (err) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}
