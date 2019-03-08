import React, { Component } from 'react';
import {AInput} from '../index';

export default class AHeader extends Component{

    render(){
        return (
            <header>
                <p>支持网站：知乎、掘金、InfoQ、简书</p>
                <div>
                    <AInput></AInput>
                    
                </div>
            </header>
        )
    }
}