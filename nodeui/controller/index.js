/** 
 * miaoxiongtao@made-in-china.com
 * 
 * TODO:
 * [ ] 先适应 segmentfault ， jianshu等后续在做
 * 
 * [ ] 提取 service ， 简化 controller 中的处理函数
 * [ ] segmentfault 部分图片（data-src） 需要请求 segmentfault 域名获取图片地址
*/

const Router = require('koa-router');
const fetch = require('node-fetch');
const url = require('url');
const fs = require('fs');
const cheerio = require('cheerio');
const htmlFormat = require('../services')
const router = new Router();


const ArticleController = {
    get() {
        return async (ctx, next) => {
            let params = url.parse(ctx.url,true)
            let path = params.query.url||'';
            let domain = '';
            let regx = /^(http|https)?\:\/\/([\w|\d|-]+)\.(com|cn)/;
            if(regx.test(path)){
                domain = `${RegExp.$1}://${RegExp.$2}.${RegExp.$3}`
                console.log('domain:',domain)
            }
            // console.log('url',params)
            try{
                let res = await fetch(path);
                let html = await res.text();
                let fmtHtml = htmlFormat.segmentfault(html);
                const $ = cheerio.load(fmtHtml);
                var $imgs = $('img');
                $imgs.each((idx,item)=>{
                    let src = $(item).attr('data-src');
                    if(src){
                        $(item).attr('src',domain + src)
                    }
                })
                let str = $.html();
                console.log(str)
                ctx.contentType = 'text/html'
                ctx.body = str;
            }catch(err){
                console.warn('err',err)
            }
        };
    },
    test() {
        return async (ctx, next) => {
            ctx.body = 'test';
        };
    },
};

router
    .get('/getArticle', ArticleController.get())
    .get('/test', ArticleController.test());

const controller = {
    init: app => {
        app.use(router.routes());
    },
};

module.exports = controller;
