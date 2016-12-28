var express = require('express');
var router = express.Router();

var data={};

//读取本地redis数据库
var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.1.1',    //服务器IP
    RDS_PWD = 'wangwei',
    RDS_OPTS = {},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

client.auth(RDS_PWD,function(){
    console.log('通过认证');
});

client.on('ready',function(res){
    console.log('ready');    
});

client.on('connect',function(){
    client.hmset('short', {'js':'javascript','C#':'C Sharp'}, redis.print);
    client.hmset('short', 'SQL','Structured Query Language','HTML','HyperText Mark-up Language', redis.print);

    client.hgetall("short", function(err,res){
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }            
        console.dir(res);
        data=res
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(data);
});

module.exports = router;
