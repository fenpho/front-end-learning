const express = require('express');
const userRouter = require('./user');

// 新建app
const app = express();

app.use('/user', userRouter);

app.listen(8888, function() {
  console.log('Node app is start at port 8888');
});
