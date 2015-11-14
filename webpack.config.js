var path = require('path');
var webpack = require('webpack');

// sass-loader needs this
require('es6-promise').polyfill();

module.exports = {
    entry: [
        'webpack-hot-middleware/client', // WebpackDevServer host and port
        'babel-polyfill',
        './ui/js/willow-main'
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist/js'),
        filename: 'willow-main.js'
    },

    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules', 'ui/js']
    },
    
    module: {
        loaders: [
            {
                loaders: [
                    'react-hot',
                    'babel?' + JSON.stringify({
                        plugins: [['transform-runtime']],
                        presets: ['es2015', 'stage-0', 'react']
                    })
                ],

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "ui"),
                ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    devtool: 'source-map',
    debug: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}