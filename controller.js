const fs = require('fs');

/*
* 这里自动扫描controllers目录，找到所有js文件，导入，然后注册每个URL：
*/
// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');
// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

// 处理每个js文件:
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 将controller导入router
function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        // 是调用的router暴露的方法 相当于：const fn_router = require('koa-router');const router = fn_router();
		// 处理路由的对象
		router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};