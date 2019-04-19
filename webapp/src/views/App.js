import React, { Component, Fragment, createRef } from 'react';
import { AInput, MInput } from 'components';
import Recent from './pages/recent';
import Topboard from './pages/topboard';
import Aritcle from './pages/article';
// const Topboard = ()=>{/*webpackChunkName:async-topboard*/import('./pages/topboard')};
// const Aritcle = ()=>{/*webpackChunkName:async-article*/import('./pages/article')};
import './styles/index.scss';
import $fetch from './request';
import img from '../res/dabai3.jpg';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: '',
            mode: 0, //模式：0 正常 1 高级（自定义选择器）
        };

        this.selector = createRef();
        this.urlDomain = createRef();
        this.browserHeight = createRef();
        this.browserWidth = createRef();
    }

    async onSearch(url) {
        console.log('url', url);
        var paramStr = '';
        if (url) {
            paramStr += `?url=${url}`;
        }
        // if(this.selector && this.selector.current.value){
        //     let symbol = url?'&&':'?';
        //     paramStr+=`${symbol}selector=${this.selector.current.value}`
        //     console.log('selector',this.selector.current.value,paramStr)

        // }

        const res = await $fetch('/getArticle' + paramStr);
        if (res.status === 1 && res.data) {
            this.setState({
                article: res.data,
            });
        }
    }
    render() {
        return (
            <Fragment>
                <div className="main">
                    <MInput
                        placeholder="请输入文章链接"
                        onSearch={url => {
                            this.onSearch(url);
                        }}
                    />
                    <div className="row main-mode">
                        <span
                            className="a mode"
                            onClick={() => {
                                this.setState({
                                    mode: this.state.mode === 0 ? 1 : 0,
                                });
                            }}
                        >
                            {this.state.mode === 0 ? '高级模式' : '普通模式'}
                        </span>
                        {this.state.mode === 1 && (
                            <Fragment>
                                <form className="inline-form">
                                    <div className="form-item inline-form-item">
                                        <span style={{ marginLeft: '20px' }}>
                                            设置选择器：
                                        </span>
                                        <input
                                            ref={this.selector}
                                            className="input mode-input"
                                            style={{
                                                height: '30px',
                                                padding: '0 4px',
                                            }}
                                        />
                                    </div>

                                    <div className="form-item inline-form-item">
                                        <span style={{ marginLeft: '20px' }}>
                                            图片域名：
                                        </span>
                                        <input
                                            ref={this.urlDomain}
                                            className="input mode-input"
                                            style={{
                                                height: '30px',
                                                padding: '0 4px',
                                            }}
                                        />
                                    </div>

                                    <div className="form-item inline-form-item">
                                        <span style={{ marginLeft: '20px' }}>
                                            浏览器高度：
                                        </span>
                                        <input
                                            ref={this.browserHeight}
                                            className="input mode-input"
                                            style={{
                                                height: '30px',
                                                padding: '0 4px',
                                            }}
                                        />
                                    </div>

                                    <div className="form-item inline-form-item">
                                        <span style={{ marginLeft: '20px' }}>
                                            浏览器宽度：
                                        </span>
                                        <input
                                            ref={this.browserWidth}
                                            className="input mode-input"
                                            style={{
                                                height: '30px',
                                                padding: '0 4px',
                                            }}
                                        />
                                    </div>
                                </form>
                                <span className="a" style={{ marginLeft: '20px' }}>
                                    配置文件
                                </span>
                            </Fragment>
                        )}
                    </div>

                    {/* <div className="main-right">
                        <section>
                            <Topboard />
                        </section>
                        <section style={{ marginTop: '50px' }}>
                            <Recent />
                        </section>
                    </div> */}
                    <div className="main-left">
                        <Aritcle article={this.state.article} />
                    </div>
                </div>
                <div className="footer" />
            </Fragment>
        );
    }
}
