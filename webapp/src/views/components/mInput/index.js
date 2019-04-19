import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AButton } from 'components';
import {SEARCH} from '../../store/action';

const mapDispatchToProps = (dispatch, ownProps) => {
    // console.log('props',ownProps)
    return {
        dis_search: url => {
            dispatch(SEARCH(url));
        },
        onSearch: ownProps.onSearch,
    };
};

class MInput extends Component {
    state = {
        value: '',
        selectWrapClass: '',
    };

    hideSelection() {
        setTimeout(() => {
            this.setState({
                selectWrapClass: '',
            });
        }, 200);
    }

    _search() {
        const { dis_search, onSearch } = this.props;
        dis_search(this.state.value);
        onSearch && onSearch(this.state.value);
    }

    handleKeydown(e){
        if(e.keyCode==13){
            this._search()
        }
    }

    componentDidMount() {}

    render() {
        const { ContainerStyle, ButtonStyle, style, placeholder } = this.props;
        return (
            <div className="mInput-row" style={ContainerStyle}>
                <div className="mInput-btn-wrap">
                    <AButton
                        className="mInput-btn"
                        onFocus={() => {
                            this.setState({
                                selectWrapClass: 'visible',
                            });
                        }}
                        onBlur={() => {
                            this.hideSelection();
                        }}
                    >
                        Search <i className="iconfont icon-menu" />
                    </AButton>
                    <ul className={this.state.selectWrapClass}>
                        <li>
                            <a href="javascript:;">Search</a>{' '}
                        </li>
                        <li>
                            <a
                                href="javascript:;"
                                // onClick={() => {
                                //     this.hideSelection();
                                //     //to html2md
                                // }}
                            >
                                Html2Markdown
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mInput-input-wrap">
                    <input
                        className="mInput-input"
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
                <AButton
                    className="mInput-search"
                    type="main"
                    onClick={e => {
                        this._search();
                    }}
                >
                    {' '}
                    <i className="iconfont icon-search" />{' '}
                </AButton>
            </div>
        );
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(MInput);
