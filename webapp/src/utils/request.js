/**
 * miaoxiongtao@made-in-china.com
 * @description XMLhttpRequset 封装
 * 
 * TODO:
 * 1. get params serialize
 * 2. resolve different type of data due to response content-type 
 */

var xmlhttp = null; 
if (window.XMLHttpRequest) {
    xmlhttp = true; 
}

const defaultConf = {
    method:'get',
    'content-type':'application/json',
    async: true,
    data:''
}

class requset{
    constructor(options){
        this.options = options;
        let {url,method} = this.options
        this.url = url;
        this.method = method;
        this.xhr = null;
        this.init();
    }

    init(){
        if (!xmlhttp) {
            alert('do not support XMLHttpRequest!')
            return
        }
        this.xhr = new XMLHttpRequest();
        XMLHttpRequest.onstatechange = function(res){
            if(this.xhr.state == 4){
                let data = this.xhr.responseText;
                let type = this.xhr.getResponseHeader('content-type')
                if(this.xhr.status == 200){
                    return Promise.resolve({
                        data:data
                    })
                }
                return Promise.reject({
                    error:data
                })
            }
        }

    }

    get(){
        let {url} = this.options;
        this.xhr.open('GET',url,true);
        this.xhr.send();
    }

    post(){
        let {data} = this.options;
        this.xhr.open('POST',url);
        data = data || null;
        this.xhr.send(data)
    }
}


function serializeParam(){

}

export default request