import * as config from 'config'
import { rise, utils } from '../../../../../../node_modules/sdk'

export function get(req, res) {
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
      return rise.channelAuth.getSessionCartItem({}, {
        session: req.session.session_uuid,
        token: req.session.token,
        params: {
          channel_uuid: channel_uuid,
          item_uuid: req.params.item_uuid
        }
      })
    })
    .then(response => {

      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })

    })
    .catch(err => {
      console.log('auth/session/cart/items/[item_uuid]', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
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
      channel_uuid: channel_uuid,
      item_uuid: req.params.item_uuid
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
      console.log('auth/session/cart/items/[item_uuid]', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}

export function del(req, res) {
  const cartItem = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.removeSessionCartItem(cartItem, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid,
      item_uuid: req.params.item_uuid
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
      console.log('auth/session/cart/items/[item_uuid]', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
