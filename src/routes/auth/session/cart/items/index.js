import { rise } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const query = req.query
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCartItems({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    },
    query: query
  })
    .then(response => {
      console.log('BRK RESPONSE', response)
      res.setHeader('Content-Type', 'application/json')
      // req.session.cart = response.data
      res.end(JSON.stringify({ ...response }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
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
          if (_response.data) {
            req.session.cart = response.data
          }
          return [response, _response]
        })
    })
    .then(([items, cart]) => {

      console.log('BRK RESPONSE', items)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ...items, cart: cart }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const cartItem = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.updateSessionCartItem(cartItem, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      // req.session.cart = response.data
      res.end(JSON.stringify({ cart: req.session.cart || null }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}
