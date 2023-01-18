let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: mode,
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    experiments: {
        topLevelAwait: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HTMLWebpackPlugin({
            template: './index.html',
        }),
    ],
    devServer: {
        open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    { loader: 'postcss-loader' },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|tts|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(mp3|waw)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'audio/[name][ext]',
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
}
