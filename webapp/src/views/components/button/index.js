import React, { Component } from 'react';

export default class AButton extends Component {
    _click(e){
        let {onClick} = this.props;
        if(onClick){
            onClick(e)
        }
    }

    render() {
        const { className, ButtonStyle, children, onClick ,type } = this.props;
        let defaultClass = `btn-${type}`
        return (
            <div>
                <button className={`${defaultClass} ${className}`} style={ButtonStyle}
                onClick={(e)=>{this._click(e)}}>
                    {children}
                </button>
            </div>
        );
    }
}
