const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
require('dotenv').config();

module.exports = withSass(withFonts({
  target: "serverless",
  env: {
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
    SU_CONTENTFUL_API_TOKEN: process.env.SU_CONTENTFUL_API_TOKEN,
    SU_CONTENTFUL_SPACE_ID: process.env.SU_CONTENTFUL_SPACE_ID,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      child_process : 'empty',
      dns: 'empty',
      net: 'empty',
      tls: 'empty'
    };

    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
    );

    return config;
  },
}));
