import React, { Component } from 'react';
import { AButton } from 'components';
import {SEARCH} from '../../store/action';
import './index.scss';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        onSearch:(url)=>{
            console.log('dis',url)
            dispatch(SEARCH(url))
        }
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
        console.log('search')
        const { onSearch } = this.props;
        onSearch(this.state.value);
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
