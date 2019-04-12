var express = require('express');
const path = require('path')
var app = express();
app.use(express.static(path.join(__dirname, 'public')))
//指定更目录显示的内容
app.get('/login', function(req, res){
  let msg={
    id:'0',
    name:'user',
  }
  res.send(msg);
});
//指定监听端口
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
