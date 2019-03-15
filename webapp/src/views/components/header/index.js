import React, { Component } from 'react';
import { AInput } from 'components';

export default class AHeader extends Component {
    render() {
        return (
            <header>
                {/* <p>支持网站：知乎、掘金、InfoQ、简书</p> */}
                <div>
                    <AInput
                        placeholder="支持网站：知乎、掘金、InfoQ、简书"
                        onSearch={(e) => {
                            console.log('search',e)
                        }}
                    />
                </div>
            </header>
        );
    }
}
