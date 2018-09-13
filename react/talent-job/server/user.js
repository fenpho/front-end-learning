const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

const _filter = { pwd: 0, __v: 0 };

Router.get('/list', function(req, res) {
  // User.remove({}, function(err, doc){});
  User.find({}, function(err, doc) {
    if (!err) {
      return res.json(doc);
    }
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

    const userModel = new User({ user, pwd: md5Pwd(pwd), type });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, msg: '注册成功', data: { user, type, _id } });
    });
  });
});

Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, msg: '登录成功', data: doc });
  });
});

Router.get('/info', function(req, res) {
  // 用户有没有cookie
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1, msg: '您尚未登录' });
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

Router.post('/update', function(req, res) {
  // 用户有没有cookie
  const { userid } = req.cookies;
  if (!userid) {
    // json.dumps
    return res.json({ code: 1, msg: '您尚未登录' });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});
// 防止彩虹表破解密码，加盐，二次打包
function md5Pwd(pwd) {
  const salt = 'greatest_web_app_343589075789%*$#@!)(~~';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
