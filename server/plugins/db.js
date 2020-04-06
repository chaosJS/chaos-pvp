module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // require-all 把一个文件夹下的所有文件一起require进来
  require('require-all')(__dirname + '/../modules')
}
