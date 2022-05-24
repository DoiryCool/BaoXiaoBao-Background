var CODE = {
    INVALID_INVITE_CODE :   -1,
    SUCCESS_CODE        :   0,
    MYSQL_ERROR_CODE    :   1001,
    LOGIN_ERROR_CODE    :   1002
}

var MSG = {
    INVALID_INVITE_CODE_MSG :   "Invalid Invitation Code!",
    SUCCESS_CODE_MSG        :   "Success!",
    MYSQL_ERROR_MSG         :   "SQL ERROR,CHECK YOUR INFORMATION!",
    LOGIN_ERROR_CODE_MSG    :   "Login Failed!"
}
module.exports={
    CODE,
    MSG
}
