const cheerio = require('cheerio');
const browser = require('./spiderService');


const htmlFormat = {
    segmentfault: (domain, main) => {
        let $ = cheerio.load(main);
        let title = $('#articleTitle').text();
        title = `<h1>${title}</h1>`;
        let content = $('.article__content').html();
        let fmtHtml = `${title}<div class="J-article-content">${content}</div>`;
        const $fmtHtml = cheerio.load(fmtHtml);
        //img change src
        var $imgs = $fmtHtml('img');
        $imgs.each((idx, item) => {
            let src = $(item).attr('data-src');
            if (src) {
                $(item).attr('src', domain + src);
            }
        });
        let str = $fmtHtml.html();
        return str;
    },
    juejin: (domain, main) => {
        console.log(main);
        return '';
    },
    jianshu: (domain, main) => {
        let $ = cheerio.load(main);
        let $content = $('.article');
        let $imgs = $('.article img');
        $('.article .image-container-fill').css('display', 'none');
        // console.log('imgs',$imgs)
        $imgs.each((idx, item) => {
            console.log('idx', idx);
            let src = $(item).attr('data-original-src');
            console.log('src1', src);
            if (src) {
                console.log('src', src);
                $(item).attr('src', `${src}`);
            }
        });
        let str = $content.html();
        return str;
    },
    zhihu: (domain, main) => {
        let $ = cheerio.load(main);
        let title = $('.Post-Title').text();
        $('article img').each((idx,item)=>{
            console.log('idx', idx);
            let src = $(item).attr('data-actualsrc');
            if (src) {
                $(item).attr('src', `${src}`);
            }
        })
        let content = $('.Post-RichTextContainer').html();
        return `<h1>${title}</h1>${content}`

    },
    //TODO: 图片资源等未做处理，可能无法显示
    customQuery: (main,selector)=>{
        let $ = cheerio.load(main);
        return $(selector).html();
    }
};

// const imgDomain={
//   segmentfault:()=>{
//     return
//   }
// }

//存在 selector 时使用自定义 selector，否则判断是否是 htmlFormat 的 type
const format = (type, domian, main,selector) => {
    console.log(type,selector);
    if(!selector){
        if (type in htmlFormat) {
            return htmlFormat[type](domian, main);
        }
        return '<h1>暂不支持该网站！</h1>';
    }
    return htmlFormat.customQuery(main,selector)
};

const spiderHtml = options=>{
    return browser.spiderHtml(options)
}

module.exports = {
    format,
    spiderHtml
};
