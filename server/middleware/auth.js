module.exports = options => {
  let { app, jwt, assert, AdminUserModal } = options
  // 或者不用传递参数，直接用require()
  // const assert = require('http-assert')
  // const jwt = require('jsonwebtoken')
  // const AdminUserModal = require('../../modules/AdminUser')
  // app 可以用req.app 等同于 app
  return async (req, res, next) => {
    // 后端获取的请求头都是小写对应
    const {
      headers: { authorization }
    } = req
    const authorizationStr = authorization || ''
    const token = authorizationStr.split(' ')[1]
    assert(token, 401, '请重新登录')
    console.log('token::', token)
    // jwt.verify() 校验token的方法，第一个参数是token，第二个参数是secretKey
    const tokenData = jwt.verify(token, app.get('secretKey'))
    console.log('tokenData::', tokenData) // { id: '5e6cda9403ee33d2c129eb35', iat: 1584537708 } id即为用户id
    const { id } = tokenData
    // 把用户的信息挂载到req上，后续的中间件都能通过获取到user的信息
    req.user = await AdminUserModal.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
