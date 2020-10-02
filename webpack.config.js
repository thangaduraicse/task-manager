const path = require('path');

// config should be return as a function or an object
// Is it possible to run application using webpack?
// Yes, its possible to develop application only for small scale and will utilise more system resoure like RAM and CPU. The reason is, we are actually writing a file whenever make a change

// Why webpack dev server is required for development even webpack does watch and dev build?
// 1. It will create the actual output file in output folder and it is a costlier process when application grows larger.
// 2. It will not support Hot reloading in browser.

// What is hot reloading?
// In simple, don't reload the full page after the source file changes, just reload only the part of code which is changed

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
        }
    };
};
