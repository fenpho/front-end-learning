const express = require('express');

// 新建app
const app = express();

app.get('/', function(req, res){
    res.send('<h1>Hello world!</h1>')
});
app.get('/data', function(req, res){
    res.json({name: 'fenpho is talent', type: 1})
});

app.listen(8888, function(){
    console.log('Node app is start at port 8888');
});
