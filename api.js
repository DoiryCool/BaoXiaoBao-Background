var RUNTIME_INFO = require('./RUNTIME_INFO');
var sqlApi = require("./SqlAPI");
var express = require('express');
var settings = require('./settings');
var app = express();
var bodyParser = require('body-parser');

const fs = require('fs')
const path = require('path')

const random = require('string-random');

const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();

var DEBUG = true;
var IMAGE_DEBUG = true;

app.use(bodyParser.urlencoded({ extended: true }));
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
            var token = random(16, {numbers : true, letters:true});
            var id = Math.floor(Date.now()/1000);
            if (DEBUG) console.log(id);
            sqlApi.insert(id, params.phone, params.name, params.password, utype, token, params.t_id, function(retCode){
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

    sqlApi.check(params.phone, params.password, function(retCode, token, user_type, uid){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.MSG,
                "token": token,
                "user_type": user_type,
                "uid": uid
            };
            res.end(JSON.stringify(data));
            if (DEBUG) console.log(data);
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
    sqlApi.getBindInfo(params.token, function(result){
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
    sqlApi.getBindedInfo(params.token, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            res.end(JSON.stringify(result));
        }
        else {
            res.end(JSON.stringify(data));
        }
    });
    
})

app.post('/bindedInfoT', function(req, res) {
    if (DEBUG) console.log('收到post/bindedInfo请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.getBindedInfoT(params.token, function(result){
        if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
            res.end(JSON.stringify(result));
        }
        else {
            res.end(JSON.stringify(data));
        }
    });
    
})

app.post('/bills', function(req, res) {
    if (DEBUG) console.log('收到post/bills请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    if(params.type == 2){
        sqlApi.getBills(params.uid, function(result){
            if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
                console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
            }
            else {
                res.end(JSON.stringify(data));
            }
        });    
    }else{
        sqlApi.getBillsT(params.uid, function(result){
            if (retCode == RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE){
                console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
            }
            else {
                res.end(JSON.stringify(data));
            }
        }); 
    }
    
})

app.post('/bind', function(req, res) {
    if (DEBUG) console.log('收到post/bind请求');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.setBind(params.t_id, params.token, function(result){
        if (retCode == RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
            if (DEBUG) console.log(result);
        }
        else {
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.BIND_ERROR.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.BIND_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });

})

app.post('/billStatus', function(req, res) {
    if (DEBUG) console.log('收到post/billStatus');
    var params = req.body;
    if (DEBUG) console.log(params);
    sqlApi.billStatusChange(params.id, params.billStatus, function(result){
        if (retCode == RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
            if (DEBUG) console.log(result);
        }
        else {
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.BIND_ERROR.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.BIND_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });

})

app.post('/commit',multipartyMiddleware,(req,res)=>{
    var params = req.body;
    console.log(req.files.file.path);

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    time_name = year + month + date + hours + minutes + seconds
    imageName = params.uid + "-" + time_name
    img_path = "android/billImages/"+ imageName +".jpg";
    save_path = "/usr/local/bttomcat/tomcat8/webapps/android/billImages/"+ imageName +".jpg";
    fs.rename(req.files.file.path, save_path, function (err) {
        if (err) throw err;
        console.log('renamed complete');
     });

	sqlApi.commit(params.uid, params.t_id, params.amount, params.remark, img_path, function(result){
        if (retCode == RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE){
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.MSG
            };
            res.end(JSON.stringify(result));
        }
        else {
            var data = {
                "code": RUNTIME_INFO.BIND_CODE.BIND_ERROR.CODE,
                "msg": RUNTIME_INFO.BIND_CODE.BIND_ERROR.MSG
            };
            res.end(JSON.stringify(data));
        }
    });
});

app.listen(8000, function() {
  console.log('start');
})