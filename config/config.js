module.exports = (function (environment) {
  return {
    api_root: 'https://api.stockfighter.io/ob/api',
    host: '127.0.0.1',
    port: 8181,
    api_key: 'lolwut',
  }
})(process.env.NODE_ENV || 'dev')
