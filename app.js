/*
* 这部分是引用对象部分
*/
// 调用的koa暴露的对象
// koa核心
const Koa = require('koa');

// 是调用的router暴露的方法 相当于：const fn_router = require('koa-router');const router = fn_router();
// 处理路由的对象
//const router = require('koa-router')();

// 处理POST表单Parse的对象
const bodyParser = require('koa-bodyparser');

// 生成koa对象
const app = new Koa();

// 导入controller middleware:
const controller = require('./controller');



//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
// 使用自定义router middleware: 默认不传入参数选择扫描controllers 文件夹
app.use(controller());


app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});
// 在端口12345 监听
app.listen(12345);
console.log('app started at port 12345')