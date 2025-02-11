'use strict';
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

module.exports = (env, args) => {
    const isDevelopment = args.mode === 'development';

    const plugins = () => {
        const config = [
            /* If we need jquery
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            */
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new PurgeCSSPlugin({
                paths: glob.sync(
                    [
                        `${path.join(__dirname, 'src')}/**/*`,
                        `${path.join(__dirname)}/index.html`,
                        `${path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')}/bootstrap.min.js`,
                        `${path.join(__dirname, 'node_modules', 'lite-youtube-embed', 'src')}/lite-yt-embed.js`,
                        `${path.join(__dirname, 'node_modules', 'glightbox', 'dist', 'js')}/glightbox.min.js`,
                    ],
                    { nodir: true }
                ),
                fontFace: true,
                keyframes: true,
                variables: true,
                safelist: [
                    /^h[1-6]/,
                    /^text-/,
                    /^[mp]\w?-/,
                    /^(glightbox-|gloader|goverlay|gdesc|gslide|desc-)/,
                    /^(gfadeIn|gfadeOut|gslideOutLeft|gslideInLeft|gslideOutRight|gslideInRight|gzoomIn|gzoomOut)/,
                    /^swiper-/,
                ],
            }),
        ];

        return config;
    };

    const optimization = () => {
        const config = {};

        if (!isDevelopment) {
            config.minimizer = [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                }),
                new TerserWebpackPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ];
        }
        return config;
    };

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            filename: '[name].js',
            assetModuleFilename: 'assets/[name][ext][query]',
        },

        devtool: isDevelopment ? 'cheap-module-source-map' : false,
        devServer: {
            static: './',
            devMiddleware: {
                writeToDisk: true,
            },
            watchFiles: ['./src/**/*', './*.html'],
            hot: true,
        },
        watchOptions: {
            ignored: '**/node_modules',
        },

        optimization: optimization(),
        plugins: plugins(),

        module: {
            rules: [
                // Hack for recompile webpack when html changes
                {
                    test: /\.html$/,
                    use: 'null-loader',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.37 }]],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /\.module.(s[ac]ss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: ['postcss-preset-env'],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
                                // https://github.com/webpack-contrib/sass-loader#sassoptions
                                sassOptions: {
                                    // If set to true, Sass won’t print warnings that are caused by dependencies (like bootstrap):
                                    // https://sass-lang.com/documentation/js-api/interfaces/options/#quietDeps
                                    quietDeps: true,
                                    silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext][query]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext][query]',
                    },
                },
            ],
        },
    };
};
