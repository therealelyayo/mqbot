const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const withProgressBar = require('next-progressbar')
const withSass = require('@zeit/next-sass')
const withImages =  require('next-images')
module.exports = withProgressBar(withImages({
  progressBar: {
    profile:true
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/adm': { page: '/adm' }
    }
  },
//  ...withSass()
}))
