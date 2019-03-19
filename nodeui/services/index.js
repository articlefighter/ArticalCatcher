const cheerio = require('cheerio');

const htmlFormat={
  segmentfault:(main)=>{
    let $ = cheerio.load(main);
    let title = $('#articleTitle').text();
    title = `<h1>${title}</h1>`;
    let content = $('.article__content').html();
    return `${title}<div class="J-article-content">${content}</div>`
  }
}

module.exports = htmlFormat