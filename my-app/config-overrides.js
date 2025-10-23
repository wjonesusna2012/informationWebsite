const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = function override(config) {
  // Add NodePolyfillPlugin first - it provides most polyfills including:
  // stream-browserify, util, buffer, process, crypto-browserify, etc.
  config.plugins.push(new NodePolyfillPlugin());

  // Set fallbacks for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer'),
    // Disable Node.js modules that can't work in browser
    dns: false,
    net: false,
    tls: false,
    fs: false,
    child_process: false,
    worker_threads: false,
    module: false,
    cluster: false,
    dgram: false
  };

  // Add alias to resolve process/browser correctly
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser'),
    process: require.resolve('process/browser')
  };

  // Add ProvidePlugin to make globals available
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
