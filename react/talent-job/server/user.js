const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/list', function(req, res) {
  // User.remove({}, function(err, doc){});
  User.find({}, function(err, doc) {
    if (!err) {
      return res.json(doc);
    }
  });
});

Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0 }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    return res.json({ code: 0, msg: '登录成功', data: doc });
  });
});

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, function(err, doc) {
    if (!err) {
      if (doc) {
        return res.json({ code: 1, msg: '用户名已存在' });
      }
    }
    User.create({ user, pwd: md5Pwd(pwd), type }, function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      return res.json({ code: 0, msg: '注册成功' });
    });
  });
});

Router.get('/info', function(req, res) {
  // 用户有没有cookie
  return res.json({ code: 1 });
});

// 防止彩虹表破解密码，加盐，二次打包
function md5Pwd(pwd) {
  const salt = 'greatest_web_app_343589075789%*$#@!)(~~';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
