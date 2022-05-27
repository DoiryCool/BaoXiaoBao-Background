module.exports={
    insert   : `INSERT INTO users(uid, phone, name, passwd, user_type, token, t_id) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    query     : `SELECT * FROM users WHERE phone = ? AND passwd = ?`,
    profile     : `SELECT * FROM users WHERE phone = ?`,
    bindSql     : `INSERT INTO user_bind(t_id, uid) VALUES(?, (SELECT uid FROM users WHERE token = ?))`,
    bindInfoSql     : `SELECT * FROM users WHERE user_type = 1`,
    bindedInfoSql     : `SELECT * FROM users WHERE uid IN (SELECT t_id FROM user_bind WHERE user_bind.uid = (SELECT uid FROM users WHERE token = ?))`
}