const path = require('path');

module.exports = {
    entry: './content.js',
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ],
    },
};