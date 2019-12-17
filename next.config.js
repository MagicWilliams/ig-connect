const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
require('dotenv').config();

module.exports = withSass(withFonts({
  target: "serverless",
  env: {
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    };

    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
    );

    return config;
  },
}));
