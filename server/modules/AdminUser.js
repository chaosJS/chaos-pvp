const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  userName: { type: String },
  password: {
    type: String,
    // 有这个字段，但是获取的时候不返回这个字段
    select: false,
    //  改变数据
    set(val) {
      // bcrypt加密
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
module.exports = mongoose.model('AdminUser', schema)
