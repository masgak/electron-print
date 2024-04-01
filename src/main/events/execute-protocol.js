const path = require('path')
const { app } = require('electron')

const PROTOCOL_IDENTIFY = 'BFSilentPrint'

const args = []
if (!app.isPackaged) {
  args.push(path.resolve(process.argv[1]))
}
args.push('--')

app.setAsDefaultProtocolClient(PROTOCOL_IDENTIFY, process.execPath, args)

app.on('second-instance', (event, argv) => {
  try {
    app.relaunch()
    app.exit()
  } catch (error) {
    console.log('重启组件失败:' + error)
  }
})

exports.protocolIdentify = PROTOCOL_IDENTIFY
