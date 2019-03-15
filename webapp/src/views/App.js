import React, { Component,Fragment} from 'react';
import {AHeader} from 'components'
import Recent from './pages/recent'
import Topboard from './pages/topboard'
import Aritcle from './pages/article'
import './styles/index.scss'
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <main className='main'>
                    <div className='main-left'>
                        <AHeader></AHeader>
                        <Aritcle></Aritcle>
                    </div>
                    <div className='main-right'>
                        <section>
                            <Topboard></Topboard>
                        </section>
                        <section style={{marginTop:"50px"}}>
                            <Recent></Recent>
                        </section>
                    </div>
                </main>
            </Fragment>
        )
    }
}




