const path = require('path');
const webpack = require('webpack');
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
                  test: /\.(css)$/ ,
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                    // hashPrefix: 'rus',
                    // modules: {
                    //   mode: 'local',
                    //   exportGlobals: true,
                    //   context: path.resolve(__dirname, 'src'),
                    // },
                  },
                },
                {
                  test: /\.(sass)$/ ,
                  loader: 'sass-loader',
                  options: {
                    modules: {
                      localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                    // hashPrefix: 'rus',
                    // modules: {
                    //   mode: 'local',
                    //   exportGlobals: true,
                    //   context: path.resolve(__dirname, 'src'),
                    // },
                  },
                },
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: [
          new copyWebpackPlugin([{ from: 'demo/' }]),
          
        ]
    }];
};