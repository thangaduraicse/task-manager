// Webpack dev server creates two sections in developer tools 'Soruces'
// 1. localhost:<PORT> => Actual application running in the port. With help of this, we can able to view the UI in browser.
// 2. webpack:// => Socket connection established between my app and browser.
// What is the use of webpack:// (point 2)?
// With help of socket connection, we are loading all supporting libraries to run our app on certain port number with dev mode supports like hot reloading, mapping the bundled modules to the actual src file... etc. The main purpose of this support libraries to enable debugging mode with more declaritive error messages

const path = require('path');

// Code splitting - Will multiple bundle js
// Minfiying strategy - Webpack 4 itself will provide default minification. We have add configuration to minimise code in more efficient way. eg: removing console log. Yes - UglifyJSPlugin, TerserPlugin.
// CSS extraction - At the moment, all the css bundled into single file called bundle.js. With help css extract plugin, we can extract css to seperate file. Yes - ExtractCSSPlugin, MiniCSSExtractPlugin
// Templating strategy - html-webpack-plugin

module.exports = (env) => {
    const prod = env && env.production;

    return {
        mode: prod && 'production' || 'development',
        watch: !prod,
        entry: './src/index.jsx',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                components: path.resolve(__dirname, 'src/components'),
                pages: path.resolve(__dirname, 'src/pages')
            },
            extensions: ['.js', '.jsx', '.css', '.scss']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', {loader: 'css-loader', options: {url: false}}]
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', {loader: 'css-loader', options: {url: false}}, 'sass-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 3000,
            hot: true
        }
    };
};
