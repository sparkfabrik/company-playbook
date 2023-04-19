const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
  const sourceMapEnabled = !!env.enableSourceMap;

  return {
    plugins: [
      // Process SCSS input files before converting to CSS,
      // using Stylelint specific config files (see theme root folder).
      new StylelintPlugin({
        // fix: inProduction, // Enable if you want to autofix SCSS files when building production dist files.
        lintDirtyModulesOnly: true,
      }),
      new CopyPlugin({
        patterns: [
          // copy the theme assets to the public folder
          {
            context: 'public',
            from: '**/*',
            to: "../../../../assets/",
            toType: 'dir',
          },
          // copy the content static files to the public folder
          {
            context: '../../../content/static',
            from: '**/*',
            to: "../../../../assets/",
            toType: 'dir',
          },
        ],
      }),   
    ],

    entry: [
      './public/js/app.js',
      './scss/app.scss'
    ],

    output: {
      filename: 'dist/main.js',
      // public path is the 'assets' folder in the project root
      path: path.resolve(__dirname, 'public'),
      // publicPath: '../',
    },

    watch: false,

    optimization: {
      minimize: true,
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
                sourceMap: sourceMapEnabled,
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    'autoprefixer',
                    'cssnano'
                  ],
                },
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
