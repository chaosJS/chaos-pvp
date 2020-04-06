const mongoose = require('mongoose')
const schema = new mongoose.Schema(
  {
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    content: { type: String }
  },
  // If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
  // 开启数据中的时间戳
  { timestamps: true }
)
module.exports = mongoose.model('Article', schema)
