import { app, BrowserWindow, Menu } from 'electron' // eslint-disable-line
import '../renderer/store'
const log = require('electron-log')

// const path = require('path');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow
let willQuitApp = false

app.setName('打印助手')

// app.allowRendererProcessReuse = true

// const pageRoute = '/#/'; // 路由页显示
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

function createWindow () {
  Menu.setApplicationMenu(null) // 隐藏菜单

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 520,
    height: 320,
    // width: 600,
    // height: 380,
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
    show: false // 默认隐藏
    // backgroundColor: '#2b374f', // 设置默认背景颜色
  })

  mainWindow.loadURL(winURL)

  // mainWindow.setIcon(path.join(__dirname, '../../static/icon.ico'));

  mainWindow.on('close', (e) => {
    if (willQuitApp) {
      mainWindow = null
    } else {
      // 阻止默认关闭行为(右上角关闭) , 变成隐藏
      e.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.on('ready-to-show', () => {
    const { OPEN_AS_HIDDEN_WIN_TARGET } = require('../main/events/register-openAtLogin')
    //
    // // TODO: 这里可能涉及到 MAC OS 的启动判断, openAtLogin, 缺少样本, 先不写了
    // app.getLoginItemSettings({
    //   args: loginSettingsArgs
    // })

    log.info('process.argv: ', process.argv)

    // windows 下如果有设置开机自启, 则开机自启打开时默认隐藏窗口, BrowserWindow 默认 show 为 false
    const hideWin = process.argv.includes(OPEN_AS_HIDDEN_WIN_TARGET)

    log.info('启动界面2')
    if (hideWin) hideMainWin()
    // else {
    //   log.info('隐藏界面')
    //   // 如果没有设置 开机自启, 则需要显示窗口
    //   mainWindow.hide()
    // }
    mainWindow.hide()

    if (process.env.NODE_ENV === 'development') {
      // 打开调试工具
      mainWindow.webContents.openDevTools()
    }
  })
  require('./tray') // 加载托盘
  require('./printer') // 打印监听
  require('./events') // 服务事件加载
  require('./common') // 通用事件
  console.log('写注册表')
  app.setLoginItemSettings({
    openAtLogin: true,
    // 如果应用以管理员身份运行，设置此选项为true可避免UAC（用户账户控制）对话框在Windows上弹出。
    openAsHidden: true
  })
}

// 限制只能开启一个应用(4.0以上版本)
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.exit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (('isMinimized' in mainWindow) && mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.exit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  // eslint-disable-next-line no-use-before-define
  closeMainWin()
})

/**
 * @description: 显示 win 窗口
 */
function showMainWin () {
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
}

/**
 * @description: 关闭 win 窗口
 */
function closeMainWin () {
  willQuitApp = true
  mainWindow.close()
}

/**
 * 隐藏 主窗口
 */
function hideMainWin () {
  willQuitApp = true
  mainWindow.hide()
}

function getMainWindow () {
  return mainWindow
}

export {
  showMainWin,
  closeMainWin,
  getMainWindow,
  hideMainWin
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
