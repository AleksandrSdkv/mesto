const path = require('path'); // стандартная утилита Node.js для построения путей
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // __dirname - глобальная константа, указывающая на каталог, гле лежит этот файл
    entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', // contenthash каждый раз новый, чтобы файлы не кэшировались
        clean: true, // удалять каталог dist
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true // сайт будет открываться сам при запуске npm run dev
    },
    devtool: 'inline-source-map', // показывает ошибки в исходных файлах
    module: {
        rules: [
            // загружаем js-библиотеки
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    'postcss-loader',
                ],
            },
        ]
    },
    plugins: [
        // подключаем плагин, загружаем html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CleanWebpackPlugin(),
        // подключаем плагин
        new MiniCssExtractPlugin(),
    ],

}
