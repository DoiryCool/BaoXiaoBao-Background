//Load mysql
var mysql = require('mysql');
var settings = require('./settings');
var sqls = require('./sqls')
var connection;

var retCode = -1;
var connect2mysql = function(){
    connection = mysql.createConnection({
        host     : settings.host,
        user     : settings.user,
        password : settings.password,
        database : settings.database
      });
} 

connect2mysql();

var insert = function(sql_phone, sql_name, sql_passwd, sql_type){

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
    });
    return retCode;
}

var check = function(sql_phone, sql_passwd){
    connect2mysql();
    var  userGetSql = `SELECT * FROM users WHERE phone = '${sql_phone}' AND passwd = '${sql_passwd}'`;
    //查 query
    connection.query(userGetSql,function (err, result) {
        if (err) throw err;
        console.log("result",result)
        if(result.length==0){
            console.log(("用户名或密码错误"))
        }else{
            console.log(("登录成功"))
        }
    });
}

module.exports = {
    insert,
    check
}