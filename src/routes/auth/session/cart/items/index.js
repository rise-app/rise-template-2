import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const query = req.query
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCart({}, {
    session: req.session.session_uuid,
    token: req.session.token,
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
        session: req.session.session_uuid,
        token: req.session.token,
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
      res.status('401').end(JSON.stringify(err))
    })
}

export function post(req, res) {
  const cartItems = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.createSessionCartItems(cartItems, {
    session: req.session.session_uuid,
    token: req.session.token,
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
        session: req.session.session_uuid,
        token: req.session.token,
        params: {
          channel_uuid: channel_uuid
        }
      })
        .then(_response => {
          if (response.session) {
            req.session.session_uuid = response.session
          }
          if (response.token) {
            req.session.token = response.token
          }
          if (_response.data) {
            req.session.cart = response.data
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
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}
