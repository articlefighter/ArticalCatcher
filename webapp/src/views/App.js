import React, { Component, Fragment } from 'react';
import { AInput } from 'components';
import Recent from './pages/recent';
import Topboard from './pages/topboard';
import Aritcle from './pages/article';
import './styles/index.scss';
export default class App extends Component {
    state = {
        article: '',
    };

    onSearch(url) {
        fetch('/api/getArticle?url=' + url)
            .then(res => {
                if (res.ok) {
                    res.text().then(val => {
                        this.setState({
                            article: val,
                        });
                    });
                }
            })
            .catch(err => {
                console.log('fetch err:', err);
            });
    }
    render() {
        return (
            <Fragment>
                <main className="main">
                    <AInput
                        placeholder='请输入文章链接'
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
                    
                </main>
            </Fragment>
        );
    }
}
