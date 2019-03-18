const Router = require('koa-router');
const fetch = require('node-fetch');
const url = require('url');
const fs = require('fs');
const cheerio = require('cheerio');
const router = new Router();

const ArticleController = {
    get() {
        return async (ctx, next) => {
            let params = url.parse(ctx.url,true)
            // console.log('params',params)
            let path = params.query.url||'';
            console.log('url',params)
            try{
                let res = await fetch(
                    // 'https://segmentfault.com/a/1190000018524106?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com&share_user=1030000000178452'
                    // "https://github.com/"
                    path
                )
                let html = await res.text();
                const $ = cheerio.load(html);
                var $imgs = $('.main').find('img');
                $imgs.each((idx,item)=>{
                    let src = $(item).attr('data-src');
                    if(src){
                        $(item).attr('src',"https://segmentfault.com"+src)
                    }
                    
                })
                let str = $('.main').html();
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
