var mysql      = require('./mysql');
var RUNTIME_INFO = require('./RUNTIME_INFO');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'doiry',
  password : '196511685gu',
  database : 'android_api'
});

var sqlApi = require("./mysql");

var express = require('express');

var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/userRegister', function(req, res) {
    console.log('收到post/userRegister请求');
    var params = req.body;
    console.log(params);
    if (params.inviteCode != "doiry") {
        var data = {
            "code": RUNTIME_INFO.CODE.INVALID_INVITE_CODE,
             "msg": RUNTIME_INFO.MSG.INVALID_INVITE_CODE_MSG
            };
        res.end(JSON.stringify(data));
    }
    else {
        var utype = 2;                                                                 //1 teacher: 2: student
        if (params.identity == "teacher"){
            utype = 1;
        }
        retCode = sqlApi.insert(params.phone, params.name, params.password, utype);
        if (retCode == 0){
            var data = {"code": retCode, "msg": "success"};
            res.end(JSON.stringify(data));
        }
  }
})

var LOGIN_FLAG = -1;
app.post('/userLogin', function(req, res) {
  console.log('收到post/userLogin请求');
  var params = req.body;
  console.log(params);
  check(params.phone, params.password, callback);
    var data = {"code": 0, "msg": "success"};
    res.end(JSON.stringify(data));
    console.log(callback);
})

app.listen(8000, function() {
  console.log('start');
})

check = function(sql_phone, sql_passwd){
    connection.connect();
    var  userGetSql = `SELECT * FROM users WHERE phone = '${sql_phone}' AND passwd = '${sql_passwd}'`;
    //查 query
    connection.query(userGetSql,function (err, result) {
        if (err) throw err;
        console.log("result",result);
        if(result.length==0){
            console.log(("用户名或密码错误"));
        }else{
            LOGIN_FLAG = 0;
            console.log(("登录成功"));
        }
    });
}

