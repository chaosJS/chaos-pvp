module.exports = options => {
  return async (req, res, next) => {
    // 专门处理类名大小写的中间件
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../modules/${modelName}`)
    console.log('专门处理类名大小写的中间件，现在处理的是：', modelName)
    next()
  }
}
