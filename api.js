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
            "code": RUNTIME_INFO.LOGIN_CODE.INVALID_INVITE_ERROR.CODE,
             "msg": RUNTIME_INFO.LOGIN_CODE.INVALID_INVITE_ERROR.MSG
            };
        res.end(JSON.stringify(data));
    }
    else {
        var utype = 2;                                                                 //1 teacher: 2: student
        if (params.identity == "teacher"){
            utype = 1;
        }
        if (params.password.length < 8){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.PARAM_ERROR.CODE,
                 "msg": RUNTIME_INFO.LOGIN_CODE.PARAM_ERROR.MSG
                };
            res.end(JSON.stringify(data));
        }
        else {
            sqlApi.insert(params.phone, params.name, params.password, utype, function(retCode){
                if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
                    var data = {
                        "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                         "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
                        };
                    res.end(JSON.stringify(data));
                }
                else if(retCode == RUNTIME_INFO.LOGIN_CODE.MYSQL_ERROR.CODE){
                    var data = {
                        "code": RUNTIME_INFO.LOGIN_CODE.MYSQL_ERROR.CODE,
                         "msg": RUNTIME_INFO.LOGIN_CODE.MYSQL_ERROR.MSG
                        };
                    res.end(JSON.stringify(data));
                }
                if (DEBUG) console.log("Return Code : " + retCode);
            });
        }
  }
})

app.post('/userLogin', function(req, res) {
    if (DEBUG) console.log('收到post/userLogin请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.check(params.phone, params.password, function(retCode){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(data));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
        if (DEBUG) console.log(retCode);
    });
    
})

app.listen(8000, function() {
  console.log('start');
})