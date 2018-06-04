const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: sourcePath,
    entry: ['./index.tsx'],
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },
    target: 'web',
    mode: 'development',
    resolve: {
        modules: [sourcePath, 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    externals: {
        fs: true
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['awesome-typescript-loader'],
        }, {
            test: /\.wasm$/,
            use: ['wasm-loader'],
        }, {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: 'file-loader',
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            use: [
                'file-loader', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                },
            ],
        }, {
            test: /\.html$/,
            use: 'html-loader',
        }, {
            test: /\.json$/,
            use: 'json-loader',
        }, {
            test: /\.(mp4|webm)$/,
            use: {
                loader: 'url-loader',
                query: {
                    limit: 10000,
                },
            },
        }],
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
            },
        }),
    ],

    devServer: {
        contentBase: sourcePath,
        historyApiFallback: {
            index: '/',
        },
        hot: true,
        disableHostCheck: true,
        stats: {
            warnings: false,
        },
        publicPath: '/',
    },
};
