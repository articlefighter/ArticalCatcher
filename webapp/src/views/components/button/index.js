import React, { Component, Fragment } from 'react';

export default class AButton extends Component {
    _click(e) {
        let { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    }

    render() {
        const {
            className,
            ButtonStyle,
            children,
            type,
        } = this.props;
        let defaultClass = `btn-${type||'default'}`;
        return (
            <button type='button' className={`btn ${defaultClass} ${className}`} style={ButtonStyle||{}} onClick={(e)=>this._click(e)}> 
                <span>
                    {children}
                </span>
            </button>
        )
    }
}
