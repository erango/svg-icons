'use strict';

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './bin'),
        libraryTarget: 'commonjs2'
    },
    externals: {
        'prop-types': 'prop-types',
        'react': 'react'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
            },
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    }
};
