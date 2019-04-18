import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AButton} from 'components';


const mapDispatchToProps = (dispatch,ownProps)=>{
    // console.log('props',ownProps)
    return {
        search:(url)=>{
            dispatch(SEARCH(url))
        },
        onSearch:ownProps.onSearch
    }
}

class MInput extends Component {
    state = {
        value:''
    };

    

    render() {
        const { ContainerStyle, ButtonStyle, style, placeholder } = this.props;
        return (
            <div className="mInput-row" style={ContainerStyle}>
                <div>
                    <AButton className='mInput-btn'>Seach <i className='icon i-menu'></i></AButton>
                    <ul>
                        <li>Search</li>
                        <li>Html2Markdown</li>
                    </ul>
                </div>
                <input
                    className="input"
                    style={style}
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={e => {
                        this.setState({
                            value: e.target.value,
                        });
                    }}
                    onKeyDown={e => {
                        this.handleKeydown(e);
                    }}
                />
            </div>
        );
    }
}

export default connect(undefined,mapDispatchToProps)(MInput)