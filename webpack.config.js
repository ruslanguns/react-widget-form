const path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/main.js',
        mode: 'production',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                  test: /\.s[ac]ss$/i,
                  use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                  ],
                },
                {
                  test: /\.css$/i,
                  use: [
                    'style-loader',
                    'css-loader',
                  ],
                },
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: [
          new copyWebpackPlugin([{ from: 'demo/' }])
        ]
    }];
};