const {override,fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    //加载 less 样式配置
    style: true,
}), 
    //添加 less loader 样式配置
    addLessLoader({
    javascriptEnabled: true,
    
        modifyVars: { '@primary-color': '#1DA57A' },  //颜色指定位置
    }), 
);