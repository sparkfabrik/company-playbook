module.exports = ({ file, options, env }) => ({
    map: {
      inline: false
    },
    plugins: {
      'postcss-import': { root: file.dirname },
      'cssnano': env === 'production' ? options.cssnano : false
    }
  })
  