/*
 * @Description:
 * @Date: 2023-03-16 16:28:45
 * @LastEditTime: 2023-03-16 17:00:16
 */

const aboutWindow = require('about-window').default
// const path = require('path')

const createAboutWindow = () => aboutWindow({
  // icon_path: path.join(__static, 'logo/icon.ico'),
  // copyright: `by YH (2023-03-16)`,
  // description: '可实现后台连接打印机 \n 进行静默打印的服务',
  // use_version_info: true,
  // adjust_window_size: true,
  // open_devtools: false,
  // win_options: {
  //   backgroundColor: '#fff'
  // },
  // css_path: path.join(__static, 'common/css/about-window.css'),
  // bug_report_url: 'https://github.com/YuHuaOu/electron-print/issues',
  // bug_link_text: '💬上报BUG'
})

module.exports = { createAboutWindow }
