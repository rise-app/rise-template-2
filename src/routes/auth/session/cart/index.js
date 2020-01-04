import { rise } from 'sdk'
import * as config from 'config'

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
      res.setHeader('Content-Type', 'application/json')
      req.session.cart = response.data
      res.end(JSON.stringify({ ...response }))
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

  rise.channelAuth.updateSessionCart(cart, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      req.session.cart = response.data
      res.end(JSON.stringify({ ...response }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}
