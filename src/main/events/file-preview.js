/*
 * @Description: 预览文件
 * @Date: 2022-01-14 11:40:42
 * @LastEditTime: 2023-05-08 14:21:33
 */
const { ipcMain, BrowserWindow } = require('electron')
const { emitter } = require('../common/tools')

let win = null
let currentBrowsingUrl = '' // 当前预览的地址

function getPreviewWindow () {
  return win
}

function closePreviewWindow () {
  if (!win) return
  win.close()
  win = null
  currentBrowsingUrl = ''
}

/**
 * 处理预览文件事件
 * @param {String} fileUrl - 文件地址
 */
function handlePreview (fileUrl) {
  if (!win) {
    win = new BrowserWindow({ width: 800, height: 900, title: '文件预览' })

    win.setAlwaysOnTop(true)

    // 监听关闭窗口的事件
    win.on('close', () => {
      win = null
      currentBrowsingUrl = ''
    })

    win.on('ready-to-show', () => {
      win.setAlwaysOnTop(false)
    })

    win.on('blur', () => {
      win.setAlwaysOnTop(false)
    })
  } else {
    // 显示窗口
    if (win.isMinimized()) win.restore()

    win.setAlwaysOnTop(true)

    win.show()
    win.focus()
  }

  // 加载 url
  if (currentBrowsingUrl !== fileUrl) {
    win.loadURL(fileUrl)
    currentBrowsingUrl = fileUrl
  }
}

emitter.on('win-preview-file', (fileUrl) => {
  handlePreview(fileUrl)
})

/**
 * 预览文件
 * @param {Object} argv
 */
ipcMain.on('preview-file', (e, argv) => {
  const { fileUrl } = argv
  handlePreview(fileUrl)
})

/**
 * 关闭预览窗口
 */
ipcMain.on('close-filePreview-window', closePreviewWindow)

exports.getPreviewWindow = getPreviewWindow
exports.closePreviewWindow = closePreviewWindow
