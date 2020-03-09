const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/my_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('connect 数据库 success::')
})
mongoose.connection.on('close', () => {
  console.log('close 关闭 数据库::')
})

// mongoose.disconnect()

// 定义schema
var Schema = mongoose.Schema

var stusSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female'
  },
  likes: [{ name: String, level: Number }]
})

// 创建model：数据库中的集合
var StusModel = mongoose.model('stus', stusSchema)
let lichao = {
  name: 'lc',
  age: 18,
  gender: 'male',
  likes: [{ name: 'apple', level: 1 }]
}
StusModel.create(lichao, (err, res) => {
  if (!err) {
    console.log('插入成功')
  }
})
/* 
  StusModel.find(
    conditons,
    [投影 projections],
    [选项(skip,limit..)options],
    cb
  )
  StusModel.findById(id,cb)
  StusModel.findOne()
*/

StusModel.find(
  { name: 'lc' },
  // 投影： 要name不要id 或者 "name age -_id"
  {
    name: 1,
    age: 1,
    _id: 0
  },
  {
    skip: 2,
    limit: 1
  },
  (err, docs) => {
    if (!err) {
      // 这个返回的结果就是Document文档对象，是Model（StusModel）的实例
      console.log(docs)
    }
  }
)

/*
  StusModel.update(
    conditions,
    doc,
    options,
    cb
  )
*/
StusModel.update(
  { name: 'lc' },
  { $set: { age: 19 } },
  { multi: true },
  (err, raw) => {}
)

/**
 *  基本不用
 *  */

// StusModel.remove({ name: 'lc' }, err => {})

// count 统计数量 Model.count()

StusModel.count({ name: 'lc' }, err => {})

// Document 方法
var me = new StusModel({
  name: 'lichao',
  age: 20,
  likes: [{ name: 'pine', level: 2 }]
})

console.log(me)

me.save(err => {
  if (!err) {
    console.log('me save success')
  }
})
StusModel.findOne({ name: 'lichao' }, (err, doc) => {
  // doc.updateOne({ $set: { age: 88 } }, err => {
  //   if (!err) {
  //     console.log('doc updateOne 成功')
  //   }
  // })
  // 或者 一样
  doc.age = 66
  doc.save()
  //  删除自己
  // doc.remove()

  // get(name)  获取文档中指定的属性值
  console.log('doc.get::', doc.get('gender'))
  console.log('doc.', doc.gender)

  // doc.set('name','xxxx')
  // doc.name = 'xxxx'
  // doc.id  直接获取id

  console.log('toJSON:', doc.toJSON()) //转为json
  // doc.toObject()
})
