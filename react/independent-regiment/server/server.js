const express = require('express');
const mongoose = require('mongoose');

// 链接mongo，并且使用learn这个集合
const DB_URL = 'mongodb://localhost:27017/learn';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');    
});
// 类似以MySQL里面的表，mongo里面有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}));
// 新增数据
// User.create({
//     user: 'xiaohong',
//     age: 13
// }, function(err, doc){
//     if(!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// });
// 删除数据
// User.remove({_id: '5b02e2692bcb921414d8d3f7'}, function(err, doc){
//     console.log(doc);
// });
// 更新数据
// User.update({user: 'xiaoming'}, {'$set':{age: 17}}, function(err, doc){
//     if (!err) {
//         console.log(doc);
//     }
// });

// 新建app
const app = express();

app.get('/', function(req, res){
    res.send('<h1>Hello world!</h1>')
});
app.get('/data', function(req, res){
    // 查询数据
    // User.find({}, function(err, doc){
    //     res.json(doc);
    // }); // 返回全部数据组成的数组
    // User.find({user: 'xiaoming'}, function(err, doc){
    //     res.json(doc);
    // }); // 数据user为xiaoming的数组
    User.findOne({user: 'xiaoming'}, function(err, doc){
        res.json(doc);
    }); // 数据user为小明的对象
});

app.listen(8888, function(){
    console.log('Node app is start at port 8888');
});
