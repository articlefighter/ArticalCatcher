const path = require('fs');
const chreeio = require('cheerio');

const { CHROME_PATH } = require('../../config');

const defaultConf = {
    executablePath: CHROME_PATH,
    headless: false,
};

const browserObj = {
    browser: null,
    page: null,
    async initBrowser(options) {
        if (this.browser) {
            return;
        }
        let _opt = Object.assign({}, defaultConf, options || {});
        this.browser = await puppeteer.launch(_opt);
        this.page = await browser.newPage();
    },
    async spiderHtml({
        selector,
        height,
        width,
        url_domain = undefined,
        url = '',
    }) {
        if (!this.browser) {
            await this.initBrowser();
        }
        if (url) {
            await page.setViewport({
                width,
                height,
            });
            await page.goto(url);
            let html = await page.content();
            const $ = $.load(html);
            return $(selector).html();
        }
    },
};

module.exports = browserObj;
