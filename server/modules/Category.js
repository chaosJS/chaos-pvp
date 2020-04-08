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
// virtual 可以用mongoose添加和设置虚拟属性，但是这虚拟属性的值不会保存到数据库中。
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
module.exports = mongoose.model('Category', schema)
