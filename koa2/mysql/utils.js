var operator = {
    createDatabase: (sql) => {
        return new Promise((resolve, reject) => {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('数据库创建错误:' + err.message);
                    reject(err)
                }
                console.log('-------------创建数据库成功----------');
                resolve(result)
            });
            connect.end();
        })
    },
    createTable: (sql) => {
        return new Promise((resolve, reject) => {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('创建数据表错误:' + err.message);
                    reject(err)
                }
                console.log('-------------创建数据表成功----------');
                resolve(result)
            });
            connect.end();
        })
    },
    query: (sql) => {
        return new Promise(function (resolve, reject) {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('数据库查询错误:' + err.message);
                    reject(err)
                }
                console.log('-------------查询成功----------');
                resolve(result)
            });
            connect.end();
        })
    },
    add: (sql) => {
        return new Promise(function (resolve, reject) {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('数据库新增错误:' + err.message);
                    reject(err)
                }
                console.log('-------------新增成功----------');
                resolve(result)
            });
            connect.end();
        })

    },
    delete: (sql) => {
        return new Promise(function (resolve, reject) {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('数据库删除错误:' + err.message);
                    reject(err)
                }
                console.log('-------------删除成功----------');
                resolve(result)
            });
            connect.end();
        })
    },
    update: (sql) => {
        return new Promise(function (resolve, reject) {
            var connect = require('../mysql/connect')();
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log('数据库修改错误:' + err.message);
                    reject(err)
                }
                console.log('-------------修改成功----------');
                resolve(result)
            });
            connect.end();
        })
    }
};
module.exports = operator;
