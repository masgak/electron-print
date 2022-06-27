/*
 * @Description: 注册其他事件
 * @Date: 2022-01-10 17:39:25
 * @LastEditTime: 2022-06-27 18:58:48
 */

// express 打印服务
require('./print-http-server')

// 注册开机启动相关的事件
require('./register-openAtLogin')

// 注册预览 pdf 的事件 - 创建窗口
require('./file-preview')

// 打印进度条窗口
require('./queue-panel')

// 设置自定义协议唤醒
require('./execute-protocol')

// 创建打印图片的窗口
require('../printer/image')
