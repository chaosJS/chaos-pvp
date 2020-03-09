const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    // 表示关联的是Cat哪个Model
    // 哪个Model会在填充的时候使用
    ref: 'Category'
  }
})
module.exports = mongoose.model('Category', schema)
