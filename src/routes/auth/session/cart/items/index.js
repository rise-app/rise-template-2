import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const query = req.query
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCart({}, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }
      if (response.data) {
        req.session.cart = response.data
      }
      return rise.channelAuth.sessionCartItems({}, {
        session: req.session.session_uuid || req.headers.session,
        token: req.session.token || req.headers.authorization,
        params: {
          channel_uuid: channel_uuid
        },
        query: query
      })
    })
    .then(response => {
      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }
      if (response.data) {
        req.session.cart.items = response.data
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart/items', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}

export function post(req, res) {
  const cartItems = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.createSessionCartItems(cartItems, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {

      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }

      return rise.channelAuth.sessionCart({}, {
        session: req.session.session_uuid || req.headers.session,
        token: req.session.token || req.headers.authorization,
        params: {
          channel_uuid: channel_uuid
        }
      })
        .then(_response => {
          if (_response.session) {
            req.session.session_uuid = _response.session
          }
          if (_response.token) {
            req.session.token = _response.token
          }
          if (_response.data) {
            req.session.cart = _response.data
          }
          return [response, _response]
        })
    })
    .then(([items, cart]) => {
      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...items, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart/items', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
