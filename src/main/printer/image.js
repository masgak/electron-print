/* eslint-disable no-unused-vars */
/*
 * @Description: 创建打印图片的窗口, 用于打印图片
 * @Date: 2022-06-27 15:36:07
 * @LastEditTime: 2023-03-16 17:58:45
 */
const path = require('path')
const { ipcMain, BrowserWindow } = require('electron')
const { emitter } = require('../common/tools')

const htmlPath = path.join(__static, 'print/image.html')

let deviceName = '' // 打印机名称
let imageWindow = null
function createWindow () {
  imageWindow = new BrowserWindow({
    width: 660,
    height: 880,
    useContentSize: true,
    resizable: false, // 禁止改变主窗口尺寸
    webPreferences: {
      // contextIsolation: false,
      nodeIntegration: true, // 在网页中集成Node
      enableRemoteModule: true, // 是否启用 remote 模块。 默认值为 false. (解决 app 报错的问题)
      nodeIntegrationInWorker: true
      // webviewTag: true // 开启webview标签渲染
      // webSecurity: false
    },
    show: false
  })

  imageWindow.loadFile(htmlPath)
}

createWindow()

emitter.on('child-print-print', ({selectedDevice, filePath}) => {
  deviceName = selectedDevice
  // 把图片发送给渲染进程
  imageWindow.webContents.send('printing-type-image', filePath)
})

// html 图片加载完成, 执行打印网页 (由 image.html 进行渲染进程通信)
ipcMain.on('printing-image-process', () => {
  // 执行打印
  const options = {
    silent: true,
    deviceName,
    pageSize: 'A4',
    color: false
  }
  imageWindow.webContents.print(options, (success, errorType) => {
    if (!success) emitter.emit('print-image-failed', errorType)
    if (success) {
      console.log('图片打印完成了, 通知其他')
      emitter.emit('print-image-success')
    }
  })
})
