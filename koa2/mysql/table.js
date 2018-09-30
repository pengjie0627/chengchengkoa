var table = {
    user: `CREATE TABLE USER(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        mobile VARCHAR(11) NOT NULL,
        hairImg MEDIUMBLOB NOT NULL,
        hairTime DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
        remark VARCHAR(255)
    )`
}
module.exports = table