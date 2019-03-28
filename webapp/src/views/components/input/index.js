import React, { Component } from 'react';
import { AButton } from 'components';
import {SEARCH} from '../../store/action';
import './index.scss';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch,ownProps)=>{
    // console.log('props',ownProps)
    return {
        search:(url)=>{
            dispatch(SEARCH(url))
        },
        onSearch:ownProps.onSearch
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    _search(e) {
        const { onSearch, search } = this.props;
        search(this.state.value);
        onSearch(this.state.value);
    }
    handleKeydown(e){
        if(e.keyCode==13){
            this._search()
        }
    }

    render() {
        const { ContainerStyle, ButtonStyle, style, placeholder } = this.props;
        return (
            <div className="container" style={ContainerStyle}>
                <input
                    className="input"
                    style={style}
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={(e)=>{
                        this.setState({
                            value:e.target.value
                        })
                    }}
                    onKeyDown={(e)=>{this.handleKeydown(e);}}
                />
                <AButton
                    className="button"
                    style={ButtonStyle}
                    onClick={e => {
                        this._search(e);
                    }}
                >
                    Search
                </AButton>
            </div>
        );
    }
}

export default connect(undefined,mapDispatchToProps)(Input)
