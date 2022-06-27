/*
 * @Description:
 * @Date: 2022-06-27 14:36:24
 * @LastEditTime: 2022-06-27 14:44:28
 */

const files = {
  pdf: ['pdf'],
  image: ['jpg', 'png', 'jpeg']
}

/**
 * 处理文件后缀
 * @param {string} suffix - 文件后缀
 */
function handleFileType (suffix) {
  let type = ''
  for (let key in files) {
    const types = files[key]
    if (types.includes(suffix)) {
      type = key
      break
    }
  }
  return type
}

exports.fileType = files
exports.handleFileType = handleFileType
