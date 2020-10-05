const path = require('path');

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
                    // style-loader but all css into bundle.js. It will not create seperate style.
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 3000
        }
    };
};
