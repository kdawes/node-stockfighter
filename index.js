var request = require('request')
var promise = require('promise')

var config = require('./config/config')
//
module.exports = api
function api (opts) {
  if (! (this instanceof api)) {
    return new api(opts)
  }
}

api.prototype.getApiKey = function () {
  return config.api_key
}

function promisifyRequest (options) {
  var P = new promise(function (resolve, reject) {
    request(options, function (e, r, b) {
      if (e) { console.log('error', e); reject(e); return }
      resolve({error: e, result: r, body: b})
    })
  }).then(function (body) {
    return body
  }).catch(function (err) {
    return err
  })
  return P
}

api.prototype.cancelBid = function (venueId, stockId, bidId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks/' + stockId + '/orders/' + bidId
  var options = {
    method: 'DELETE',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.getAllBidStatus = function (venueId, acountId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/accounts/' + accountId + '/orders'
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

// https://api.stockfighter.io/ob/api/venues/:venue/accounts/:account/stocks/:stock/orders
api.prototype.getAllBidStatusForStock = function (venueId, acountId, stockId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/accounts/' + accountId + '/stocks/' + stockId + '/orders'
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.getBidStatus = function (bidId, venueId, stockId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks/' + stockId + '/orders/' + bidId
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.getQuote = function (venueId, stockId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks/' + stockId + '/quote'
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.bid = function (accountId, venueId, stockId, price, qty, orderType) {
  var direction = 'buy'
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks/' + stockId + '/orders'
  var options = {
    method: 'POST',
    url: url,
    json: true,
    body: {
      account: accountId,
      venue: venueId,
      stock: stockId,
      price: price,
      qty: qty,
      direction: direction,
      orderType: orderType
    },
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.orderbook = function (venueId, stockId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks/' + stockId
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.venueStocks = function (venueId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/stocks'
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.venueHeartbeat = function (venueId) {
  var url = 'https://api.stockfighter.io/ob/api/venues/' + venueId + '/heartbeat'
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}

api.prototype.heartbeat = function () {
  var options = {
    method: 'GET',
    url: 'https://api.stockfighter.io/ob/api/heartbeat',
    headers: {
      'X-Starfighter-Authorization': config.api_key
    }
  }
  return promisifyRequest(options)
}
