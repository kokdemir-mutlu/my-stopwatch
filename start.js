var express = require('express');
const path = require('path')
var app = express();

app.use(express.static('dist/'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(8081, function(){
  console.log('app listening on port 8081')
  console.log('path : ' + path.join(__dirname,'dist/index.html'))
})
