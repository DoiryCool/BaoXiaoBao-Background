//Load mysql
var mysql = require('mysql');
var settings = require('./settings');
var sqls = require('./sqls')
var RUNTIME_INFO = require('./RUNTIME_INFO');
var connection;

var connect2mysql = function(){
    connection = mysql.createConnection({
        host     : settings.host,
        user     : settings.user,
        password : settings.password,
        database : settings.database
      });
} 

connect2mysql();

var insert = function(id, sql_phone, sql_name, sql_passwd, sql_type, token, t_id, callback){

    connect2mysql();

    var  addSqlParams = [id, sql_phone, sql_name, sql_passwd, sql_type, token, t_id];

    connection.query(sqls.insert,addSqlParams,function (error, result) {
        if (error == null) {
            //console.log(result);
            connection.end();
            retCode = 0;
        } else {
            //console.log(error);
            retCode = 1001; 
        }
        callback(retCode);
    });
}

var check = function(sql_phone, sql_passwd, callback){

    connect2mysql();

    var  addSqlParams = [sql_phone, sql_passwd];

    connection.query(sqls.query, addSqlParams, function (err, result) {
        if (err) throw err;
        if(result.length==0){
            retCode = RUNTIME_INFO.LOGIN_CODE.LOGIN_ERROR.CODE;
            //console.log(("用户名或密码错误"))
            callback(retCode, "null", -1);
        }
        else{
            retCode = RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE;
            //console.log(("登录成功"))
            callback(retCode, result[0].token, result[0].user_type, result[0].uid);
        }
    });
}

var getProfile = function(sql_phone, callback){

    connect2mysql();

    var  addSqlParams = [sql_phone];

    connection.query(sqls.profile,addSqlParams,function (error, result) {
        if (error == null) {
            //console.log(result);
            connection.end();
            retCode = RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE;
        } else {
            retCode = RUNTIME_INFO.LOGIN_CODE.MYSQL_ERROR.CODE; 
        }
        callback(result);
    });
}

var getBindInfo = function(token, callback){

    connect2mysql();

    connection.query(sqls.bindInfoSql,function (error, result) {
        if (error == null) {
            //console.log(result);
            retCode = 0;
        } else {
            connection.end();
            retCode = 1001; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        connection.end()
        callback(data);
    });
}

var setBind = function(t_id, token, callback){

    connect2mysql();

    var  addSqlParams = [t_id, token];
    connection.query(sqls.bindSql, addSqlParams, function (error, result) {
        if (error == null) {
            //console.log(result);
            connection.end();
            retCode = RUNTIME_INFO.BIND_CODE.SUCCESS_INFO.CODE;
        } else {
            connection.end();
            retCode = 1001; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

var getBindedInfo = function(token, callback){

    connect2mysql();
    var  addSqlParams = [token];
    connection.query(sqls.bindedInfoSql, addSqlParams, function (error, result) {
        if (error == null) {
            //console.log(result);
            retCode = 0;
        } else {
            connection.end();
            retCode = 1003; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

var getBindedInfoT = function(token, callback){

    connect2mysql();
    var  addSqlParams = [token];
    connection.query(sqls.bindedInfoTSql, addSqlParams, function (error, result) {
        if (error == null) {
            //console.log(result);
            retCode = 0;
        } else {
            connection.end();
            retCode = 1003; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

var getBills = function(uid, callback){

    connect2mysql();
    var  addSqlParams = [uid];
    connection.query(sqls.billsSql, addSqlParams, function (error, result) {
        if (error == null) {
            console.log(result);
            retCode = 0;
        } else {
            console.log(error);
            connection.end();
            retCode = 1004; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

var getBillsT = function(uid, callback){

    connect2mysql();

    var  addSqlParams = [uid];
    connection.query(sqls.billsTSql, addSqlParams, function (error, result) {
        if (error == null) {
            console.log(result);
            retCode = 0;
        } else {
            console.log(error);
            connection.end();
            retCode = 1004; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

var commit = function(uid, t_id, amount, remark, img_path, callback){
    connect2mysql();
    var  addSqlParams = [uid, t_id, amount, remark, img_path];
    connection.query(sqls.commitSql, addSqlParams, function (error, result) {
        if (error == null) {
            console.log(result);
            retCode = 0;
        } else {
            console.log(error);
            connection.end();
            retCode = 1004; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

module.exports = {
    check,
    insert,
    commit,
    setBind,
    getBills,
    getBillsT,
    getProfile,
    getBindInfo,
    getBindedInfo,
    getBindedInfoT
}