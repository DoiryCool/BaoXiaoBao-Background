module.exports={
    insert   : `INSERT INTO users(uid, phone, name, passwd, user_type, token, t_id) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    query     : `SELECT * FROM users WHERE phone = ? AND passwd = ?`,
    profile     : `SELECT * FROM users WHERE phone = ?`,
    bindSql     : `INSERT INTO user_bind(t_id, uid) VALUES(?, (SELECT uid FROM users WHERE token = ?))`,
    billsSql     :  `SELECT commit.* , users.name , users.profile FROM commit, users WHERE commit.uid = users.uid AND commit.uid = ?`,
    billsTSql     :  `SELECT commit.* , users.name , users.profile FROM commit, users WHERE commit.uid = users.uid AND commit.t_id = ?`,
    bindInfoSql     : `SELECT * FROM users WHERE user_type = 1`,
    bindedInfoSql     : `SELECT * FROM users WHERE uid IN (SELECT t_id FROM user_bind WHERE user_bind.uid = (SELECT uid FROM users WHERE token = ?))`,
    bindedInfoTSql     : `SELECT * FROM users WHERE uid IN (SELECT uid FROM user_bind WHERE user_bind.t_id = (SELECT uid FROM users WHERE token = ?))`,
    commitSql     : `INSERT INTO commit(uid, t_id, amount, remark, file) VALUES(?, ?, ?, ?, ?)`,
    billStatusChangeSql     : `UPDATE commit SET is_checked = ? WHERE id = ?`
}