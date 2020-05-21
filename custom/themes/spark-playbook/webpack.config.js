const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');

module.exports = env => {
  // inProduction is true when we are building the production code.
  const inProduction = env.NODE_ENV === 'production';
  const sourceMapEnabled = !!env.enableSourceMap;

  return {
    plugins: [
      // Process SCSS input files before converting to CSS,
      // using Stylelint specific config files (see theme root folder).
      new StylelintPlugin({
        // fix: inProduction, // Enable if you want to autofix SCSS files when building production dist files.
        lintDirtyModulesOnly: true,
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ],

    entry: [
      './public/js/app.js',
      './scss/app.scss'
    ],

    output: {
      filename: 'dist/main.js',
      path: path.resolve(__dirname, 'public'),
      // publicPath: '../',
    },

    watch: false,

    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },

    module: {
      rules: [
        // Javascript files.
        {
          test: /\.js?$/,
          exclude: /(node_modules|vendor)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|vendor)/,
          use: [
            // Save the output CSS file.
            {
              loader: 'file-loader',
              options: {
                name: 'dist/style.css',
              }
            },
            // Extract the CSS from the bundle.
            {
              loader: "extract-loader",
            },
            // Translates CSS into CommonJS.
            {
              loader: 'css-loader',
              options: {
                sourceMap: sourceMapEnabled,
                url: false,
                import: true,
                importLoaders: 2, // 2 => postcss-loader, sass-loader
              }
            },
            // Loader for webpack to process CSS with PostCSS
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: sourceMapEnabled,
                plugins: [
                  require('postcss-import')(),
                  // Autoprefixer get settings from the .browserslistrc file
                  require('autoprefixer'),
                ],
                config: {
                  ctx: {
                    cssnano: {
                      preset: 'default',
                    }
                  }
                }
              }
            },
            // Compiles Sass to CSS.
            {
              loader: 'sass-loader',
              options: {
                sourceMap: sourceMapEnabled,
              }
            }
          ]
        }
      ]
    }
  }
}
