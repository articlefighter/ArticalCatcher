/**
 * miaoxiongtao@made-in-china.com
 * TODO:
 * [x] 简书 width 620，segmentfault (pad 720,pc 825) 知乎(690)，掘金(647)，InfoQ(760)， 文章最小宽度
 */


import React, { Component } from 'react';
import TurndownService from 'turndown';
import './index.scss'
import {connect} from 'react-redux';
import {AButton} from 'components';
const turndownService = new TurndownService();


const mapStateToProps = (state,ownProps)=>{
    return {
        url:state.search_url,
        article:ownProps.article
    }
}

class Article extends Component {
    state = {
        markdown:false
    }
    shouldComponentUpdate(prev,newProps){
        return true
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

    click(e){
        let article = this.props.article;
        if(article){
            let content = turndownService.turndown(article);
            console.log('content',content)
            this._downloadFile(content,'test.md')
        }

    }

    render() {
        // console.log('url',this.props.url)
        let {article} = this.props
        console.log('article',article)
        const main = (<div id='D-article' className='article' dangerouslySetInnerHTML={{__html:article}}></div>)
        return (
            <div>
                {main}
                <div style={{marginTop:'12px'}}>
                    {/* <AButton type='default'>{this.state.markdown?'Markdown 预览':'查看原文'}</AButton> */}
                    <AButton type='default' onClick={()=>{
                        this.click();
                    }}>Markdown 预览</AButton>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Article)