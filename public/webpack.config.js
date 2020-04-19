const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');

const path = require('path');
const glob = require('glob');

let plugins = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin([
    // static files to the site root folder (index and robots)
    {
      from: './src/static/**/*',
      to: path.resolve('./dist/'),
      toType: 'dir',
      flatten: true,
    },
  ]),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
]

const productionPlugins = [
  new PurgeCssPlugin({
    paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
      nodir: true,
    }),
  }),
]

module.exports = (env, args) => {
  let production = false;

  if (args && args.mode === 'production') {
    production = true;
    console.log('== Production mode');
    plugins = [...plugins, ...productionPlugins];
  } else {
    console.log('== Development mode');
  }

  return {
    entry: {
      main: './src/render.tsx',
    },
    output: {
      path: path.resolve('./dist'),
    },
    target: 'web',
    devtool: production ? false : 'source-map',
    optimization: {
      splitChunks: {
        // always create vendor.js
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.html', '.txt'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      inline: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://[::1]:8000',
          pathRewrite: {'^/api' : ''},
        }
      }
    },
    plugins: plugins
  };
};
