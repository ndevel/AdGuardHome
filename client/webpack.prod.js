const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                failOnError: true,
                configFile: 'prod.eslintrc',
            },
        }],
    },
    plugins: [
	new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
	  'process.env': {
		'NODE_ENV': JSON.stringify('production')
	  }
	}),
	new webpack.optimize.DedupePlugin(), //删除类似的重复代码
	new webpack.optimize.UglifyJsPlugin(), //最小化一切
	new webpack.optimize.AggressiveMergingPlugin(),//合并块
        new StyleLintPlugin({
            files: '**/*.css',
        }),
        new UglifyJsPlugin(),
    ],
});
