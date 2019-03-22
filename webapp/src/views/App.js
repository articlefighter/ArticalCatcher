import React, { Component, Fragment } from 'react';
import { AInput } from 'components';
import Recent from './pages/recent';
import Topboard from './pages/topboard';
import Aritcle from './pages/article';
import './styles/index.scss';
import _fetch from './request';
export default class App extends Component {
    state = {
        article: '',
    };

    async onSearch(url) {
        const res = await _fetch('/getArticle?url=' + url);
        if (res.status === 1 && res.data) {
            this.setState({
                article: res.data,
            });
        }

    }
    render() {
        console.log('app render ==============');
        return (
            <Fragment>
                <div className="main">
                    <AInput
                        placeholder="请输入文章链接"
                        onSearch={url => {
                            this.onSearch(url);
                        }}
                    />
                    <div className="main-right">
                        <section>
                            <Topboard />
                        </section>
                        <section style={{ marginTop: '50px' }}>
                            <Recent />
                        </section>
                    </div>
                    <div className="main-left">
                        <Aritcle article={this.state.article} />
                    </div>
                </div>
            </Fragment>
        );
    }
}
