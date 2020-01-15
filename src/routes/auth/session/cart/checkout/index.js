import { rise, utils } from 'sdk'
import * as config from 'config'

export function put(req, res) {
  const cart = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  // Checkout the Current Session Cart
  rise.channelAuth.checkoutSessionCart(cart, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {

      // Get the new Session Cart
      return rise.channelAuth.sessionCart(cart, {
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

          return utils.saveSession(req)
            .then(() => {
              // req.session.save( function(err) {
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({
                ...response,
                cart: req.session.cart
              }))
            })
        })
    })
    .catch(err => {
      console.log('auth/session/cart/checkout', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
