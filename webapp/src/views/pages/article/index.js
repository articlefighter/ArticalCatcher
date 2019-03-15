import React, { Component } from 'react';
import './index.scss'
import {connect} from 'react-redux';
import $ from 'jquery';

const mapStateToProps = (state,ownProps)=>{
    return {
        url:state.search_url
    }
}

class Article extends Component {
    shouldComponentUpdate(prev,newProps){
        console.log('new',newProps)
        return true
    }

    click(e){
        // var iframe = window.frames[0];
        // iframe.docu
        // console.log(iframe)
    }

    render() {
        console.log('url',this.props.url)
        return (
            this.props.url?(
                <div>
                    <button onClick={(e)=>{
                        this.click(e)
                    }}>down</button>
                    <iframe className='article' src={this.props.url}></iframe>
                </div>
            ):(<div className='article'></div>)
        );
    }
}

export default connect(mapStateToProps)(Article)