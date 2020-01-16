import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCartShipping({}, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      if (response.data) {
        req.session.cart.address_shipping = response.data
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart/address_shipping', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}

export function put(req, res) {
  const cart = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.setSessionCartShipping(cart, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      if (response.data) {
        req.session.cart.address_shipping = response.data
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart/address_shipping', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
