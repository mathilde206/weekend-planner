const path = require('path')

module.exports = {
    entry: './frontend/src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'frontend/static/js'),
        filename: 'weekend_planner.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }]
            }
        ]
    },
    mode: "development"
};

//TODO: add plugin to uglify/minify
