const fs = require('fs');

/**
 * 进行路由注册
 * @param router
 * @param mapping
 */
function addMapping(router, mapping) {
    for (var url in mapping) {
        console.log(`url ${url}`);
        if (url.startsWith('GET ')) {
            var path = url.substring(4);// 从第4位开始截取
            console.log(`get path ${path}`);
            router.get(path, mapping[url]);
            console.log(`GET ${path}`)
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);// 从第5位开始截取
            console.log(`post path ${path}`);
            router.post(path, mapping[url]);
            console.log(`POST ${path}`)
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);// 从第4位开始截取
            console.log(`PUT path ${path}`);
            router.get(path, mapping[url]);
            console.log(`PUT ${path}`)
        } else {
            console.log('无效的url')
        }
    }
}

/**
 * 遍历controllers目录下所有的js文件，然后读取文件内容
 * @param router
 * @param dir
 */
function addControllers(router, dir) {
    console.log('__dirname', __dirname);
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_file = files.filter((f) => {
        return f.endsWith('.js')
    });
    for (var f of js_file) {
        console.log(`文件名 ${f}`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping)
    }
}
module.exports = function (dir) {
    var controllers_dis = dir || 'controllers';
    var router = require('koa-router')();
    addControllers(router, controllers_dis);
    return router.routes()
};