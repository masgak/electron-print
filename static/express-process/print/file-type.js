/*
 * @Description:
 * @Date: 2022-06-27 14:36:24
 * @LastEditTime: 2022-07-06 16:35:45
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
  if (suffix) suffix = suffix.toLowerCase()
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
