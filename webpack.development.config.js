const path = require('path')
const webpack = require('webpack');

//with this config we tell webpack to look into client.jsx and server.jsx, resolve all files with js and jsx extension, apply babel-loader to them and output final bundles into static directory that ill be also our public path

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: './client.js',
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'client.js',
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.sass$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hase:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"development"'
				}
			})
		]
  },
  {
    name: 'server',
    target: 'node',
    entry: './server.js',
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/static/'
    },
    //This option controls if and how source maps are generated
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.sass$/,
          use: [
            {
              loader: 'isomorphic-style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hase:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  }
]
