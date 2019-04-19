/**
 * miaoxiongtao@made-in-china.com
 * TODO:
 * [x] 简书 width 620，segmentfault (pad 720,pc 825) 知乎(690)，掘金(647)，InfoQ(760)， 文章最小宽度
 */

import React, { Component } from 'react';
import TurndownService from 'turndown';
var turndownPluginGfm = require('turndown-plugin-gfm')
var gfm = turndownPluginGfm.gfm
var tables = turndownPluginGfm.tables
var strikethrough = turndownPluginGfm.strikethrough
import './index.scss';
import { connect } from 'react-redux';
import { AButton } from 'components';
const turndownService = new TurndownService();
turndownService.use(gfm)

// Use the table and strikethrough plugins only
turndownService.use([tables, strikethrough])

const mapStateToProps = (state, ownProps) => {
    return {
        url: state.search_url,
        article: ownProps.article,
    };
};

class Article extends Component {
    state = {
        markdown: false,
    };
    shouldComponentUpdate(prev, newProps) {
        return true;
    }
    _downloadFile = function(content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };

    click(e) {
        let article = this.props.article;
        if (article) {
            let content = turndownService.turndown(article);
            let h1 = document.getElementsByTagName('h1');
            let title='';
            if(h1.length){
                title = h1[0].innerText;
                title = title.trim()+'.md';
            }
            console.log('title',title)
            this._downloadFile(content, title);
        }
    }

    render() {
        let { article } = this.props;
        // console.log('url',this.props.url)
        // console.log('article',article)
        // 支持网站：知乎、掘金、InfoQ、简书
        const main = this.props.article ? (
            <div
                id="D-article"
                className="article"
                dangerouslySetInnerHTML={{ __html: article }}
            ></div>
        ) : (
            <p className="holder-text">
                截取网站文章，转成 markdown
                文件，支持网站：Segmentfault
                {/* 、知乎、掘金、InfoQ、简书 */}
            </p>
        );
        return (
            <div className="article-container">
                {main}
                {this.props.article && (
                    <div style={{ marginTop: '12px' }}>
                        <AButton
                            type="main"
                            className="btn-large"
                            onClick={() => {
                                this.click();
                            }}
                        >
                            Markdown 下载
                        </AButton>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Article);
