# web

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 准备工作

1. sass/less
2. 设置 viewport
3. css reset 动态设置 html 根元素 font-size
4. 作用域插槽的用法 /about
5. 循环中抽象更高级的作用域插槽

### 更新 server 端 init 文章数据录入接口 在 server 目录的`web/index.js` 下

### 实现后端新闻列表接口，前端数据获取展示

### 英雄列表 init 接口 完成

### 英雄列表 前端界面完成

### 前端页面完成

### 生产环境编译

1. 编译 web 和 admin 到 server 的目录下
   1. 动态替换开发生产环境的 baseURL
   2. 根目录添加环境变量标示文件(.env.development/test/production)
2. server 目录 添加静态托管
   1. 添加 vue.config.js 自定义 build 之后静态资源的路径，并且输出到 server 文件夹的同名目录下

### 域名和服务器购买

1. 域名 chaos-js.cn
2. 阿里云服务器，ubantu 系统
3. 域名解析：把特定的域名解析到服务器的公网 ip
4. 服务器上安装 nginx
   1. apt show nginx (Advanced Packaging Tool)
   2. apt update
   3. apt install nginx -y
   4. 需要在阿里云安全组中开启 http80 端口，刷新
5. 安装配置 mongodb
   1. apt show mongodb-server mongodb 的服务端
   2. apt install -y mongodb (-y means yes)
   3. 测试 mongodb 是否安装成功
      1. `mongo` 进入 mongodb 命令行
      2. show dbs 查看默认数据库列表
6. 安装 git 配置 ssh key
   1. apt install -y git
   2. ssh-keygen
   3. 复制 .ssh/id_rsa.pub 中的 ssh-ssh-rsa 到项目仓库的 key 管理中(github)，不要放到 settings/keys
7. 安装 node npm
   1. apt install -y nodejs 默认的 ubantu 包版本太低
   2. apt install -y npm
   3. 配置淘宝镜像 npm config set registry https://registry.npm.taobao.org
   4. 用 npm 安装 nrm : npm i -g nrm
   5. nrm current 现在是淘宝的源， nrm use npm/taobao 用来切换源
   6. npm i -g n 这个包用来升级 node 包 : n lts 安装最近的长期维护的版本 （时间较长？）
   7. 从 github 上拉取代码 ，使用 pm2 监控 server 服务
      1. 服务器生成的 ssh-key 放到项目代码的仓库 key 管理中
      2. git clone
      3. npm install
      4. 安装 pm2 监控 server 本地开发可以用 nodemon
         1. npm i -g pm2
         2. 在 server/下 `pm2 start index.js --[name]`
         3. 测试：curl http:localhost:5222 (server 开的端口是 5222)
   8. 反向代理 nginx，把 5222 端口绑定到公网上
      1. vscode 安装 remote-ssh 插件方便管理远程配置文件
      2. 找到 nginx 的配置文件/etc/nginx 下的配置
      3. 在 nginxconfig.io 中根据情况生成配置文件
      4. 放到远程文件夹合适的位置
      5. serive nginx reload 重启 nginx
      6. 打开地址

### todo https://www.bilibili.com/video/BV18t411L7Lg?p=10 迁移数据库
