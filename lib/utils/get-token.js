'use strict';

var jws = require('jws');
var getSha256Hash = require('./get-sha256-hash');

function getToken (resource, apiSecret, method, body) {
  var claimData = {
    header: {
      typ: 'JWT',
      alg: 'HS256'
    },
    payload: {
      key: 'master',
      exp: Date.now() + (1000 * 60),
      method: method || 'GET',
      path: resource
    },
    secret: apiSecret
  };

  if (body) {
    claimData.payload.body = {
      alg: 'sha256',
      hash: getSha256Hash(body)
    };
  }

  return jws.sign(claimData);
}

module.exports = getToken;
