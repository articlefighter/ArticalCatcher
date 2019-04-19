import React, { Component, Fragment } from 'react';

export default class AButton extends Component {
    _click(e) {
        let { onClick } = this.props;
        onClick && onClick(e);
    }

    _focus(e) {
        let { onFocus } = this.props;
        onFocus && onFocus(e);
        console.log('focus')
    }

    _blur(e) {
        let { onBlur } = this.props;
        console.log('blur')
        onBlur && onBlur(e);
    }

    render() {
        const { className, ButtonStyle, children, type } = this.props;
        let defaultClass = `btn-${type || 'default'}`;
        return (
            <button
                type="button"
                className={`btn ${defaultClass} ${className}`}
                style={ButtonStyle || {}}
                onClick={e => this._click(e)}
                onFocus={e => {
                    this._focus(e);
                }}
                onBlur={e => {
                    this._blur(e);
                }}
            >
                <span>{children}</span>
            </button>
        );
    }
}
