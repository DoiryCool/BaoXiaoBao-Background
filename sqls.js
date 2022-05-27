module.exports={
    insert   : `INSERT INTO users(phone, name, passwd, user_type, token, t_id) VALUES(?, ?, ?, ?, ?, ?)`,
    query     : `SELECT * FROM users WHERE phone = ? AND passwd = ?`,
    profile     : `SELECT * FROM users WHERE phone = ?`,
    binfInfoSql     : `SELECT * FROM users WHERE user_type = 1`
}
