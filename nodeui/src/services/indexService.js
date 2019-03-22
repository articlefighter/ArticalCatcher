const cheerio = require('cheerio');

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
};

// const imgDomain={
//   segmentfault:()=>{
//     return
//   }
// }

const format = (type, domian, main) => {
    console.log(type, htmlFormat[type]);
    if (type in htmlFormat) {
        return htmlFormat[type](domian, main);
    }
    return '<h1>暂不支持该网站！</h1>';
};

module.exports = {
    format,
};
