/*
 * @Description:
 * @Date: 2022-01-11 16:57:21
 * @LastEditTime: 2023-03-16 16:25:29
 */

module.exports = {
  defaultOrientation: 'landscape', // 票据打印方向
  defaultPrinter: '', // 默认打印机名称
  socketPort: 30981, // socket 默认端口
  httpPort: 45656, // express 打印服务默认端口
  openAtLogin: true, // 设置开机自启动默认值
  displayQueuePanel: false // 显示打印进度条
  // cacheDirName: 'download-cache' // NOTE: 缓存文件夹名字
}
