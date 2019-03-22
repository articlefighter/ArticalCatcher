const fs = require('fs');

function generateConfigPlugin({
    path,
    filename = 'config.json',
    content = {},
}) {
    this.path = path || path.resolve(__dirname);
    this.content = content;
    this.filename = filename;
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
generateConfigPlugin.prototype.apply = function(compiler) {
    // console.log('mode===============================================',this.path,'\n content:+++++',this.content)
    // console.log('compiler+++++++++++++++++++++++++++++++',compiler.options)
    // 指定一个挂载到 webpack 自身的事件钩子。
    const content = this.content;
    const path = this.path;
    const filename = this.filename;
    compiler.plugin('beforeRun', function(
        compilation /* 处理 webpack 内部实例的特定数据。*/
    ) {
        // console.log("This is an example plugin!!!---------------------------------------------------",compilation);
        let data = JSON.stringify(content);
        fs.writeFileSync(
            `${path}/${filename}`,
            data,
            { encoding: 'utf-8' },
            err => {
                if (err) throw err;
                console.log(`${path}/${filename} 写入成功！！！！！！！！！！！`);
            }
        );
    });
};

module.exports = generateConfigPlugin;
