module.exports = app => {
  const express = require('express')
  const router = express.Router({
    // 导入父级参数到子级配置 所以在子路由里面可以获取到:resource参数
    mergeParams: true
  })
  // new 分类
  router.post('/', async (req, res) => {
    const catDoc = await req.Model.create(req.body)
    res.send(catDoc)
  })
  // 修改 分类
  router.put('/:id', async (req, res) => {
    const catDoc = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(catDoc)
  })

  // 删除 分类
  router.delete('/:id', async (req, res) => {
    const catDoc = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send(catDoc)
  })
  // 分类列表
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      // queryOptions.populate = 'parent'

      // 比较以下二者返回数据的不同⬇️⬇️
      queryOptions.populate = { path: 'parent', select: 'name' }
      // queryOptions.populate = { path: 'parent' }
    }
    // if (req.Model.modelName === 'Article') {
    //   queryOptions.populate = { path: 'categories', select: 'name' }
    // }
    const catList = await req.Model.find()
      .setOptions(queryOptions)
      // parent字段ref了catModel，所以在填充时 用catModel替换原来的ObjectId
      // 填充 parent 字段 限定只返回name
      // .populate('parent', { name: 1 })
      .limit(10)
    console.log()

    res.send(catList)
  })

  // router.get('/parents', async (req, res) => {
  //   const catList = await req.Model.find({ parent: { $exists: false } }).limit(
  //     10
  //   )
  //   res.send(catList)
  // })
  //  获取分类详情
  router.get('/:id', async (req, res) => {
    const catInfo = await req.Model.findById(req.params.id)
    res.send(catInfo)
  })
  // app.use('/admin/api', router)
  // 在此处进行通用改造，添加中间件
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      // 专门处理类名大小写的中间件
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../modules/${modelName}`)
      console.log('专门处理类名大小写的中间件，现在处理的是：', modelName)
      next()
    },
    router
  )

  // 处理图片文件接口
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:5222/uploads/${file.filename}`
    res.send(file)
  })
  // 给本地写的测试接口
  // 新建维度
  app.post('/spec/creat', async (req, res) => {
    let specModel = require(`../../modules/Spec`)
    const specDoc = await specModel.create(req.body)
    res.send(specDoc)
  })

  app.get('/spec/list', async (req, res) => {
    let specModel = require(`../../modules/Spec`)
    const specList = await specModel.find().limit(20)
    res.send(specList)
  })
  // 修改维度
  app.post('/spec/edit', async (req, res) => {
    let specModel = require(`../../modules/Spec`)
    const specDoc = await specModel.findByIdAndUpdate(req.body.id, {
      name: req.body.name
    })
    res.send(specDoc)
  })

  app.delete('/spec/:id', async (req, res) => {
    let specModel = require(`../../modules/Spec`)
    const specDoc = await specModel.findByIdAndDelete(req.params.id, req.body)
    res.send(specDoc)
  })
}
