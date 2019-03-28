## ArticleSpider
> 解析Segmentfault、InfoQ、简书、掘金、知乎网站上的文章，将作者的原文章提取出来，转成 Markdown 文件。

## TODO
### miao
- [ ] 各网站 css 类名替换及样式兼容
- [ ] infoq juejin 使用爬虫爬取文章
- [ ] nodeui 代码优化
- [ ] 第一版部署至阿里云（配置shell脚本）

### 技术架构
- 前台: React
- 后台: Node

### 目录结构
ArticleSpider

```
+-- api // domi 模拟数据平台   
|  
+-- nodeui // 后台服务  
|   +--  config
|   +--  src
|   +--  controller
|   +--  services
|   +--  static
|     
+-- webapp // 前端项目  
|    +--  config // 配置文件  
|    +--  src  
|    |    +--  res // 静态资源文件  
|    |    +--  utils // 通用函数  
|    |    +--  views // UI  
|    |    |    +--  ajax // 请求  
|    |    |    +--  components // 封装组件  
|    |    |    +--  styles // 通用样式  
```
### 启动
前端项目要进入 webapp 启动
```
cd webapp
npm run dev
```

### 前端架构
#### 主要技术栈为 react redux
#### webpack 配置
- js 解析使用 


### issue
如果遇到无法下载的文章，请在 issue 中提供该文章链接。