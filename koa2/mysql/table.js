var table = {
    employ: `CREATE TABLE employ(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        mobile VARCHAR(11) UNIQUE NOT NULL,
        auth TINYINT(1) NOT NULL DEFAULT 0,
        dateTime VARCHAR(255) NOT NULL,
        remark VARCHAR(255) NOT NULL,
        checked TINYINT(1) NOT NULL DEFAULT 0,
        cookies VARCHAR(100)
    )`,
    custom: `CREATE TABLE custom(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        mobile VARCHAR(11) UNIQUE NOT NULL,
        remark VARCHAR(255) NOT NULL,
        hairTime VARCHAR(15) NOT NULL,
        hairImg VARCHAR(500) NOT NULL
    )`
}
module.exports = table