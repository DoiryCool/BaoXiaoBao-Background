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

var insert = function(sql_phone, sql_name, sql_passwd, sql_type, token, t_id, callback){

    connect2mysql();

    var  addSqlParams = [sql_phone, sql_name, sql_passwd, sql_type, token, t_id];

    connection.query(sqls.insert,addSqlParams,function (error, result) {
        if (error == null) {
            console.log(result);
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
            console.log(("用户名或密码错误"))
        }else{
            retCode = RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE;
            console.log(("登录成功"))
        }
        callback(retCode, result[0].token);
    });
}

var getProfile = function(sql_phone, callback){

    connect2mysql();

    var  addSqlParams = [sql_phone];

    connection.query(sqls.profile,addSqlParams,function (error, result) {
        if (error == null) {
            console.log(result);
            connection.end();
            retCode = RUNTIME_INFO.LOGIN_CODE.SUCCESS_INFO.CODE;
        } else {
            retCode = RUNTIME_INFO.LOGIN_CODE.MYSQL_ERROR.CODE; 
        }
        callback(result);
    });
}

var getBinfInfo = function(token, callback){

    connect2mysql();

    connection.query(sqls.binfInfoSql,function (error, result) {
        if (error == null) {
            console.log(result);
            connection.end();
            retCode = 0;
        } else {
            retCode = 1001; 
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        callback(data);
    });
}

module.exports = {
    insert,
    check,
    getProfile,
    getBinfInfo
}