const path = require('path')
const statistics = require('js/statistics.js')
const browserUI = require('browserUI.js')

const newTabPage = {
  background: document.getElementById('ntp-background'),
  hasBackground: false,
  picker: document.getElementById('ntp-image-picker'),
  deleteBackground: document.getElementById('ntp-image-remove'),
  imagePath: path.join(window.globalArgs['user-data-path'], 'newTabBackground'),
  blobInstance: null,
  reloadBackground: function () {
    fs.readFile(newTabPage.imagePath, function (err, data) {
      if (newTabPage.blobInstance) {
        URL.revokeObjectURL(newTabPage.blobInstance)
        newTabPage.blobInstance = null
      }
      if (err) {
        newTabPage.background.hidden = true
        newTabPage.hasBackground = false
        document.body.classList.remove('ntp-has-background')
        if (document.body.classList.contains('is-ntp')) {
          document.body.classList.add('ntp-mica')
        }
        if (window.platformType === 'windows') {
          ipc.send('set-window-material', 'mica')
        }
        if (newTabPage.deleteBackground) {
          newTabPage.deleteBackground.hidden = true
        }
      } else {
        const blob = new Blob([data], { type: 'application/octet-binary' })
        const url = URL.createObjectURL(blob)
        newTabPage.blobInstance = url
        newTabPage.background.src = url

        newTabPage.background.hidden = false
        newTabPage.hasBackground = true
        document.body.classList.add('ntp-has-background')
        document.body.classList.remove('ntp-mica')
        if (window.platformType === 'windows') {
          ipc.send('set-window-material', 'none')
        }
        if (newTabPage.deleteBackground) {
          newTabPage.deleteBackground.hidden = false
        }
      }
    })
  },
  initialize: function () {
    newTabPage.reloadBackground()

    document.querySelectorAll('.biraja-links a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
        var newTab = tabs.add({
          url: link.href
        })
        browserUI.addTab(newTab, {
          enterEditMode: false
        })
      })
    })

    if (!newTabPage.picker) {
      return
    }

    newTabPage.picker.addEventListener('click', async function () {
      var filePath = await ipc.invoke('showOpenDialog', {
        filters: [
          { name: 'Image files', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
        ]
      })

      if (!filePath) {
        return
      }

      await fs.promises.copyFile(filePath[0], newTabPage.imagePath)
      newTabPage.reloadBackground()
    })

    newTabPage.deleteBackground.addEventListener('click', async function () {
      await fs.promises.unlink(newTabPage.imagePath)
      newTabPage.reloadBackground()
    })

    statistics.registerGetter('ntpHasBackground', function () {
      return newTabPage.hasBackground
    })
  }
}

module.exports = newTabPage
