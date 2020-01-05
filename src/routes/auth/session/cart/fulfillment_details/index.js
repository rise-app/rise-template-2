import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCartFulfillment({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      req.session.cart.fulfillment_details = response.data

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const cart = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.setSessionCartFulfillment(cart, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      req.session.cart.fulfillment_details = response.data

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, cart: req.session.cart}))
        })
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}
