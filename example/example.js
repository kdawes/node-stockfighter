var request = require('request')
var api = require('..')
var Api = new api({})
var config = require('../config/config')
// level.json is retrieved thus : curl -X POST -H ${HEADER} ${URL}/levels/chock_a_block > level.json
var levelcfg = require('./level.json')

var orderBook = Api.venueStocks(levelcfg.venues[0])
  .then(function (results) {
    var js = JSON.parse(results.body)
    return Api.orderbook(levelcfg.venues[0], js.symbols[0].symbol)
      .then(function (res) {
        return JSON.parse(res.body)
      }).catch(function (error) {
      console.log('orderbook:', error)
      return null
    })
  }).catch(function (error) {
  console.log('error:venueStocks:', error)
})

orderBook.then(function (results) {
  console.log('ORDERBOOKRESULTS: ', JSON.stringify(results))
})
