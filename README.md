## admin

1. 后台管理：npm run serve

## server

1. 服务端端口 5222 npm run serve

## web

1. web 前端(移动端)

## mongdb 启动

1. mongod

## mongodb 值得记录的点

1. 启动：mongod 命令

```javascript
db.numbers.find({ number: { $gt: 180 } })
db.numbers.find({ number: { $gte: 180 } })
db.numbers.find({ number: { $lt: 20, $gt: 10 } })
// 前10条 分页 第一页
db.numbers
  .find()
  .skip((1 - 1) * 10)
  .limit(10)
// 11条到20条 分页 第二页 skip(页码-1*每页条数)
db.numbers
  .find({})
  .skip((2 - 1) * 10)
  .limit(10)

db.OneToOne.insert({
  name: '黄蓉',
  hunband: {
    name: '郭靖'
  }
})
db.OneToOne.find()
db.OneToOne.remove({ name: '黄蓉' }, { justOne: true })
//
db.oneToMany.insert({
  name: '潘金莲',

  husband: [
    {
      name: '武大郎'
    },
    {
      name: '西门庆'
    }
  ]
})

db.order.insert([
  {
    list: ['香蕉', '桃子'],
    user_id: ObjectId('5dad192508e78f24b633df05')
  },
  {
    list: ['西瓜', '馒头'],
    user_id: ObjectId('5dad192508e78f24b633df06')
  }
])
let user_id = db.user.findOne({ name: 'lc' })._id
db.order.find({ user_id: user_id })

// 多对多
db.teacher.insert([
  {
    name: 'teacher1'
  },
  {
    name: 'teacher2'
  },
  {
    name: 'teacher3'
  }
])

db.stus.insert([
  {
    name: 'lc',
    teacher_ids: [
      ObjectId('5daeadd899fe0f31081f39b6'),
      ObjectId('5daeadd899fe0f31081f39b7')
    ]
  },
  {
    name: 'haha',
    teacher_ids: [ObjectId('5daeadd899fe0f31081f39b8')]
  }
])

db.teacher.find()
// sort
db.collections.find() // 默认是按照id升序排序（创建时间）

// 员工 工资 升序（1）排序  降序(-1) 排序
db.emp.find().sort({ sal: 1 })

// 先按照 工资升序排序，工资一样的，按照 empno 降序排序
db.emp.find().sort({ sal: 1, empno: -1 })

// 查询时，第二个参数 设置查询结果的投影,想现实的字段
db.emp.find({}, { name: 1, _id: 0 }) // 只包含name, 不包含_id
```

#### mongoose

1. 用 node 的一个模块操作 mongodb
2. mongoose 是一个对象文档模型（ODM）库
3. 使用：
   1. 安装
   2. 连接/断开
      ```javascript
      mongoose.connect(
        'mongodb://127.0.0.1:27017/my_test',
        ({ useMongoClient }: true)
      )
      mongoose.disconnect()
      ```
   3. 监听连接状态
      ```javascript
      // 数据库连接上的事件
      mongoose.connection.once('opne', () => {})
      // 数据库断开的事件
      mongoose.connection.once('close', () => {})
      ```

### 查询中的填充(populate)，类似于关系型数据库中的关联(join)查询，

1. 在需要填充的 schema 中添加 ref: '(需要填充的 SchemaName)',在查询中使用 query.populate({path,select...})，path 为需要填充的字段

### 通用 CRUD 接口改造

1. 动态获取前端传过来的参数名称，根据这个参数找到对应的 Modal，在中间件中加到 req 中

### 上传 图片 使用 `multer` 处理

### 英雄，技能添加完成

### 文章管理，富文本编辑器（quill），富文本编辑器中图片上传

### 广告，广告位管理

### todo: https://www.bilibili.com/video/av51931842?p=25 用户管理页面完成，登录接口进行中。。。
