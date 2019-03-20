/** 
 * miaoxiongtao@made-in-china.com
 * 
 * TODO:
 * [ ] 先适应 segmentfault ， jianshu等后续在做
 * [ ] infoq 国外网站支持（utilService）
 * 
 * [ ] 提取 service ， 简化 controller 中的处理函数
 * [ ] segmentfault 部分图片（data-src） 需要请求 segmentfault 域名获取图片地址
*/

const Router = require('koa-router');
const IndexController = require('./indexController');
const router = new Router();




router
    .get('/getArticle', IndexController.get())
    .get('/test', IndexController.test());

const controller = {
    init: app => {
        app.use(router.routes());
    },
};

module.exports = controller;
