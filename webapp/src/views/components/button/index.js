import React, { Component } from 'react';

export default class AButton extends Component {
    render() {
        const { className, ButtonStyle, children, onClick } = this.props;
        return (
            <div>
                <button className={className} style={ButtonStyle}
                onClick={()=>{onClick()}}>
                    {children}
                </button>
            </div>
        );
    }
}
