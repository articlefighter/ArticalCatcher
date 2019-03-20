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

// const imgDomain={
//   segmentfault:()=>{
//     return 
//   }
// }

const format = (type,main)=>{
    console.log(type,htmlFormat[type])
    return htmlFormat[type](main)
}

module.exports = {
    format
}