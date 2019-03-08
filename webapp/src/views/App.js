import React, { Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {AHeader} from 'components'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <main className={'main'}>
                    <div className={['main-left']}>
                        <AHeader></AHeader>
                    </div>
                    <div className={['marin-right']}></div>
                </main>
            </Fragment>
        )
    }
}




