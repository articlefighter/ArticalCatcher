const isSegmentfault = (url)=>{
    let regx = /http(s)\:\/\/segmentfault\.com/;
    if(regx.test(url)){
        return true
    }
    return false
}

const isJueJin = (url)=>{
    let regx = /http(s)\:\/\/juejin\.im/;
    if(regx.test(url)){
        return true
    }
    return false
}

const isJianShu = (url)=>{
    let regx = /http(s)\:\/\/jianshu\.com/;
    if(regx.test(url)){
        return true
    }
    return false
}

const isZhiHu = (url)=>{
    let regx = /http(s)\:\/\/zhuanlan\.zhihu\.com/;
    if(regx.test(url)){
        return true
    }
    return false
}

const isInfoQ = (url)=>{
    let regx = /http(s)\:\/\/www\.infoq\.cn/;
    if(regx.test(url)){
        return true
    }
    return false
}

const CHECK_DOMAIN_SET = new Map([
    ['segmentfault',isSegmentfault],
    ['juejin',isJueJin],
    ['jianshu',isJianShu],
    ['zhihu',isZhiHu],
    ['infoq',isInfoQ],
])

const DOMAIN_SET = new Map([
    ['segmentfault','https://segmentfault.com'],
    ['juejin','https://juejin.im'],
    ['jianshu','https://jianshu.com'],
    ['zhihu','https://zhuanlan.zhihu.com'],
    ['infoq','https://www.infoq.cn'],
])




const getDomainNameByUrl = (url)=>{
    let domain_name='';
    CHECK_DOMAIN_SET.forEach((method,domain)=>{
        if(method(url)){
            domain_name = domain;
            return
        }
    })
    return domain_name
}

const getDomainByDomainName = (type)=>{
    return DOMAIN_SET.get(type)
}

module.exports = {
    getDomainNameByUrl,
    getDomainByDomainName
}