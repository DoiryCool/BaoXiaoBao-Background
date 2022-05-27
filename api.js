var RUNTIME_INFO = require('./RUNTIME_INFO');
var sqlApi = require("./SqlAPI");
var express = require('express');
var settings = require('./settings');
var app = express();
var bodyParser = require('body-parser');

const random = require('string-random');

var DEBUG = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/userRegister', function(req, res) {
    if (DEBUG) console.log('收到post/userRegister请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    if (params.inviteCode != settings.invite_code) {
        var data = {
            "code": RUNTIME_INFO.LOGIN_CODE.INVALID_INVITE_ERROR.CODE,
             "msg": RUNTIME_INFO.LOGIN_CODE.INVALID_INVITE_ERROR.MSG
            };
        res.end(JSON.stringify(data));
    }
    else {
        var utype = 2;                                                                 //1 teacher: 2: student
        if (params.identity == "Teacher"){
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
            var token = random(16, {numbers : true, letters:true})
            sqlApi.insert(params.phone, params.name, params.password, utype, token, params.t_id, function(retCode){
                if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
                    var data = {
                        "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                         "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG,
                         "key": token
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
    sqlApi.check(params.phone, params.password, function(retCode, token){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG,
                "token": token
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
        if (DEBUG) console.log(token);
    });
    
})

app.post('/userProfile', function(req, res) {
    if (DEBUG) console.log('收到post/userProfile请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getProfile(params.phone, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result[0]));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
        if (DEBUG) console.log(result[0]);
    });
    
})

app.post('/commitInfo', function(req, res) {
    if (DEBUG) console.log('收到post/commitInfo请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getProfile(params.phone, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result[0]));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
        if (DEBUG) console.log(result[0]);
    });
    
})

app.post('/bindInfo', function(req, res) {
    if (DEBUG) console.log('收到post/bindInfo请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getBinfInfo(params.token, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });
    
})

app.post('/bindedInfo', function(req, res) {
    if (DEBUG) console.log('收到post/bindedInfo请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getBinfInfo(params.token, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });
    
})

app.post('/bind', function(req, res) {
    if (DEBUG) console.log('收到post/bind请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getBinfInfo(params.token, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });
    
})

app.listen(8000, function() {
  console.log('start');
})