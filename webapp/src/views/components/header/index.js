import React, { Component } from 'react';
import { AInput } from 'components';

export default class AHeader extends Component {
    _search(url){
        const {onSearch} = this.props;
        onSearch(url);
        fetch(url).then((res)=>{
            console.log('fetch')
        }).catch(err=>{
            console.log('fetch err:',err)
        })
    }
    render() {
        return (
            <header>
                {/* <p>支持网站：知乎、掘金、InfoQ、简书</p> */}
                <div>
                    <AInput
                        placeholder="支持网站：知乎、掘金、InfoQ、简书"
                        onSearch={(url) => {
                            console.log('search',url)
                            _this._search(url)
                        }}
                    />
                    
                </div>
            </header>
        );
    }
}
