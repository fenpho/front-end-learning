1. 安装依赖：
重点如下：

react 核心框架
redux 数据管理
react-redux 数据管理扩展
antd-mobile 移动端UI
transform-decorators-legacy  装饰器
prop-types 接口值定义
socket.io-client 基于websocket的双向通信的库


后台
express 后台框架
mongoose 连接数据库
nodemon 自动重启node服务
body-parser 接受post参数
cookie-parser 处理cookie
utility md5加密用于存储密码
socket.io 基于websocket的双向通信的库




Windows下启动mongo

1. 运行命令启动数据库：
.\mongod.exe --dbpath "e:\data"

2. 启动mongo并连接数据库：
 .\mongo.exe

3. 启动服务端文件：
nodemon ./server/server.js