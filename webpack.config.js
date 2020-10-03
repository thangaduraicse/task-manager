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
            extensions: ['.js', '.jsx', '.css', '.scss']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 3000
        }
    };
};
