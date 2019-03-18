import React, { Component } from 'react';
import './index.scss'
import {connect} from 'react-redux';
import {AButton} from 'components';
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
        // console.log('new',newProps)
        return true
    }

    click(e){

    }

    render() {
        // console.log('url',this.props.url)
        // const main = this.props.url?(
        //     <iframe className='article' src={this.props.url}></iframe>
        // ):(<div className='article'></div>);
        let {article} = this.props
        console.log('article',article)
        const main = (<div className='article' dangerouslySetInnerHTML={{__html:article}}></div>)
        return (
            <div>
                {main}
                <img src='https://avatar-static.segmentfault.com/860/641/860641164-58758406e608e_big64' />
                <AButton type='default'>{this.state.markdown?'Markdown 预览':'查看原文'}</AButton>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Article)