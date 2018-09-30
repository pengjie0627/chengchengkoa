const db = require('../mysql/utils');
const fs = require('fs')
const path = require('path');

var fn_login = async(ctx, next) => {
    // 获取账号信息
    let loginName = ctx.request.query.userName
    let loginPassword = ctx.request.query.password
    // 获取数据库表admin信息
    let adminArr = await db.query(`SELECT * FROM employ WHERE name = '${loginName}' AND password = '${loginPassword}'`)// 引号一定需要
    if (adminArr.length > 0) {
        if (adminArr[0].auth === 0) {
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName}
            response.message = '该用户无权限，请联系店长'
            response.success = false
            response.total = 0
            ctx.session.userinfo = '';
            ctx.response.body = response
        } else {
            console.log('login success')
            // 生成cookie保存到数据库
            let cookies = `${loginName}#${loginPassword}#${Math.random(20)}`
            await db.update(`update employ set cookies = '${cookies}' where name ='${loginName}'`)
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName, permission: adminArr[0].checked}
            response.success = true
            response.total = 0
            ctx.session.userinfo = cookies;
            ctx.response.body = response
        }
    } else {
        console.log('login failed')
        const response = require('../dao/baseResponse')
        response.data = {userName: loginName}
        response.success = false
        response.message = '用户名或者密码不正确'
        response.total = 0
        ctx.response.body = response
    }
};

var fn_user_list = async (ctx, next) => {
    console.log(ctx.cookies.get('username'))
    let database = await db.query('show tables like "employ"')
    if (database.length === 0) {// 表不存在
        console.log('顾客表不存在')
        await db.createTable(require('../mysql/table').user)
    } else { // 表存在
        console.log('顾客表存在')
    }
    console.log(database)
    let users = await db.query('select * from employ');
    console.log(users)
    const response = require('../dao/baseResponse')
    response.data = users
    response.success = true
    response.total = users.length
    ctx.response.body = response
};
var fn_employ_auth = async (ctx, next) => {
    var employMobile = ctx.request.body.employMobile
    var permissionType = ctx.request.body.permissionType
    var code = ctx.request.body.code
    let employs = ''
    if (permissionType === 'login') {
        employs = await db.update(`update employ set auth = ${code} where mobile = '${employMobile}'`);
    } else {
        employs = await db.update(`update employ set checked = ${code} where mobile = '${employMobile}'`);
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(employs)
    const response = require('../dao/baseResponse')
    response.data = await db.query('select * from employ');
    response.success = true
    response.total = employs.length
    ctx.response.body = response
}
var fn_employ_save = async (ctx, next) => {
    await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values 
    ('${ctx.request.body.name}',
    '${ctx.request.body.mobile}',
    '${ctx.request.body.dateTime}', 
    '${ctx.request.body.password}', 
    '${ctx.request.body.remark}', 
    '${ctx.request.body.auth}', 
    '${ctx.request.body.checked}')`)
    let addEmploy = await db.query(`select * from employ where mobile = '${ctx.request.body.mobile}'`)
    const response = require('../dao/baseResponse')
    if (addEmploy) {
        response.data = addEmploy[0]
        response.success = true
        response.total = 0
        ctx.response.body = response
    }
}
var fn_employ_dtl = async (ctx, next) => {
    let mobile = ctx.request.query.mobile
    let id = ctx.request.query.id
    let customDtl = await db.query(`select * from employ where mobile = '${mobile}' and id = '${id}'`)
    const response = require('../dao/baseResponse')
    response.data = customDtl
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_employ_edit = async (ctx, next) => {
    let name = ctx.request.body.name
    let mobile = ctx.request.body.mobile
    let password = ctx.request.body.password
    let remark = ctx.request.body.remark
    let dateTime = ctx.request.body.dateTime
    let auth = ctx.request.body.auth
    let checked = ctx.request.body.checked
    let id = ctx.request.body.id
    await db.update(`update employ set 
    name = '${name}',
    mobile = '${mobile}',
    password = '${password}',
    remark = '${remark}',
    dateTime = '${dateTime}',
    auth = '${auth}',
    checked = '${checked}'
    where mobile = '${mobile}' and id = '${id}'`)
    let employ = await db.query(`select * from employ where id = '${id}'`)
    const response = require('../dao/baseResponse')
    response.data = employ[0]
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_file_upload = async (ctx,next) => {
    console.log(ctx.session.userinfo)
    // 创建可读流
    const reader = fs.createReadStream(ctx.request.files.file.path);
    let filePath = ''
    let fileStamp = ''
    if (ctx.request.files.file.type.indexOf('jpeg') > 0 || ctx.request.files.file.type.indexOf('JPEG') > 0) {
        fileStamp = new Date().getTime() + '.jpg'
        filePath = path.join(__dirname, 'public/') + fileStamp;
    } else {
        fileStamp = new Date().getTime() + '.png'
        filePath = path.join(__dirname, 'public/') + fileStamp;
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    var imgUrl = `${ctx.request.header.origin.substring(0,7)}${ctx.request.header.host}/${fileStamp}`
    const response = require('../dao/baseResponse')
    response.data = imgUrl
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_custom_save = async (ctx, next) => {
    let addCustom = await db.add(`insert into custom(name,mobile,hairImg,hairTime,remark) values ('${ctx.request.body.name}','${ctx.request.body.mobile}', '${ctx.request.body.image}', '${ctx.request.body.time}', '${ctx.request.body.remark}')`)
    const response = require('../dao/baseResponse')
    response.data = {
        mobile: ctx.request.body.mobile,
        image: ctx.request.body.image,
        time: ctx.request.body.time,
        remark: ctx.request.body.remark
    }
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_custom_edit = async (ctx, next) => {
    let name = ctx.request.body.name
    let mobile = ctx.request.body.mobile
    let hairImg = ctx.request.body.image
    let hairTime = ctx.request.body.time
    let remark = ctx.request.body.remark
    let id = ctx.request.body.id
    let addCustom = await db.update(`update custom set name = '${name}',mobile = '${mobile}',hairImg = '${hairImg}',hairTime = '${hairTime}',remark = '${remark}' where mobile = '${mobile}' and id = '${id}'`)
    const response = require('../dao/baseResponse')
    response.data = {
        mobile: ctx.request.body.mobile,
        image: ctx.request.body.image,
        time: ctx.request.body.time,
        remark: ctx.request.body.remark
    }
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_custom_dtls = async (ctx, next) => {
    let mobile = ctx.request.query.mobile
    let customDtl = await db.query(`select * from custom where mobile = '${mobile}'`)
    const response = require('../dao/baseResponse')
    response.data = customDtl
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_custom_dtl = async (ctx, next) => {
    let mobile = ctx.request.query.mobile
    let id = ctx.request.query.id
    let customDtl = await db.query(`select * from custom where mobile = '${mobile}' and id = '${id}'`)
    const response = require('../dao/baseResponse')
    response.data = customDtl
    response.success = true
    response.total = 0
    ctx.response.body = response
}
var fn_custom_List = async (ctx, next) => {
    let customList = await db.query(`select * from custom`)
    const response = require('../dao/baseResponse')
    // 去重
    var result = [];
    var obj = {};
    for(var i =0; i<customList.length; i++){
        if(!obj[customList[i].mobile]){
            result.push(customList[i]);
            obj[customList[i].mobile] = true;
        }
    }
    response.data = result
    response.success = true
    response.total = result.length
    ctx.response.body = response
}
var fn_custom_search = async (ctx, next) => {
    let customMobile = ctx.request.query.mobile
    let customList = await db.query(`select * from custom where mobile like '${customMobile}%'`)
    const response = require('../dao/baseResponse')
    // 去重
    var result = [];
    var obj = {};
    for(var i =0; i<customList.length; i++){
        if(!obj[customList[i].mobile]){
            result.push(customList[i]);
            obj[customList[i].mobile] = true;
        }
    }
    response.data = result
    response.success = true
    response.total = result.length
    ctx.response.body = response
}
var fn_custom_delete = async (ctx, next) => {
    let mobile = ctx.request.body.mobile
    let id = ctx.request.body.id
    let addCustom = await db.delete(`delete from custom where mobile = '${mobile}' and id = '${id}'`)
    const response = require('../dao/baseResponse')
    response.data = {
        mobile: mobile,
        id: id
    }
    response.success = true
    response.total = 0
    ctx.response.body = response
}
module.exports = {
    'GET /login': fn_login,
    'GET /userList': fn_user_list,
    'POST /employAuth': fn_employ_auth,
    'POST /employSave': fn_employ_save,
    'POST /fileUpload': fn_file_upload,
    'POST /customSave': fn_custom_save,
    'POST /customEdit': fn_custom_edit,
    'POST /employEdit': fn_employ_edit,
    'POST /customDelete': fn_custom_delete,
    'GET /customDtls': fn_custom_dtls,
    'GET /customDtl': fn_custom_dtl,
    'GET /employDtl': fn_employ_dtl,
    'GET /customList': fn_custom_List,
    'GET /customSearch': fn_custom_search
};