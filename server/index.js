const express = require('express')
const app = express()
app.use(express.json())
app.use(
  require('cors')({
    allowedHeaders:
      // 加Authorization allowed头 否则报跨域错误
      'Origin, x-requested-with, Content-Type, X-Token,Authorization', //X-Token为自定义的头字段
    credentials: true //设置成true 请求中才会带上cookie信息，否则请求失败
  })
)
// 全局设定，并且ignore
app.set('secretKey', 'hello-express')
// 操作数据库 引入mongoose 的动作必须放到引入路由之前
require('./plugins/db')(app)
// 管理平台 api
require('./routes/admin')(app)
// 给前端页面的api
require('./routes/web')(app)
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 托管 admin和web编译后的静态文件
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

app.listen(5222, () => {
  console.log('app run on port 5222: ', 'http://localhost:5222')
})
