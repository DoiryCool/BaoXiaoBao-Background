//Load mysql
var mysql = require('mysql');
var settings = require('./settings');
var sqls = require('./sqls')
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

var insert = function(sql_phone, sql_name, sql_passwd, sql_type, callback){

    connect2mysql();

    var  addSqlParams = [sql_phone, sql_name, sql_passwd, sql_type];

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
            retCode = 1002;
            console.log(("用户名或密码错误"))
        }else{
            retCode = 0;
            console.log(("登录成功"))
        }
        callback(retCode);
    });
}

module.exports = {
    insert,
    check
}