import { rise } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  rise.channelAuth.getSessionCart({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      req.session.cart = response.data
      res.end(JSON.stringify({ cart: req.session.cart || null }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const cart = req.body

  rise.channelAuth.updateSessionCart(cart, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      req.session.cart = response.data
      res.end(JSON.stringify({ cart: req.session.cart || null }))
    })
    .catch(err => {
      console.log('auth/session/cart', err)
      res.status('401').end(JSON.stringify(err))
    })
}
