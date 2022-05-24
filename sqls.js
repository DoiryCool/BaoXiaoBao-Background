module.exports={
    insert   : `INSERT INTO users(phone, name, passwd, user_type) VALUES(?, ?, ?, ?)`,
    query     : `SELECT * FROM users WHERE phone = ? AND passwd = ?`
}
