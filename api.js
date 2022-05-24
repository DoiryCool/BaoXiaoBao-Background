var RUNTIME_INFO = require('./RUNTIME_INFO');
var sqlApi = require("./mysql");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var DEBUG = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/userRegister', function(req, res) {
    if (DEBUG) console.log('收到post/userRegister请求');
    var params = req.body;
    if (DEBUG) console.log(params);
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
        sqlApi.insert(params.phone, params.name, params.password, utype, function(retCode){
            if (retCode == RUNTIME_INFO.CODE.SUCCESS_CODE){
                var data = {
                    "code": RUNTIME_INFO.CODE.SUCCESS_CODE,
                     "msg": RUNTIME_INFO.MSG.SUCCESS_CODE_MSG
                    };
                res.end(JSON.stringify(data));
            }
            else if(retCode == RUNTIME_INFO.CODE.MYSQL_ERROR_CODE){
                var data = {
                    "code": RUNTIME_INFO.CODE.MYSQL_ERROR_CODE,
                     "msg": RUNTIME_INFO.MSG.MYSQL_ERROR_MSG
                    };
                res.end(JSON.stringify(data));
            }
            if (DEBUG) console.log("Return Code : " + retCode);
        });
  }
})

app.post('/userLogin', function(req, res) {
    if (DEBUG) console.log('收到post/userLogin请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.check(params.phone, params.password, function(retCode){
        if (retCode == RUNTIME_INFO.CODE.SUCCESS_CODE){
            var data = {
                "code": RUNTIME_INFO.CODE.SUCCESS_CODE, 
                "msg": RUNTIME_INFO.MSG.SUCCESS_CODE_MSG
            };
            res.end(JSON.stringify(data));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.CODE.LOGIN_ERROR_CODE, 
                "msg": RUNTIME_INFO.MSG.LOGIN_ERROR_CODE_MSG
            };
            res.end(JSON.stringify(data));
        }
        if (DEBUG) console.log(retCode);
    });
    
})

app.listen(8000, function() {
  console.log('start');
})