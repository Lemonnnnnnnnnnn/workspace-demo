const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry : './src/index.tsx',
    module:{
        rules : [
            {
                test: /\.tsx?$/,
                use:'ts-loader',
            }
        ]
    },
    // 尝试按顺序解析这些后缀名,能够使用户在引入模块时不带扩展
    resolve:{
        extensions: ['.tsx','.ts','.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};