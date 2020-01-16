import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  const user = req.body

  rise.channelAuth.register(user, {
    session: req.session.session_uuid || req.headers.session,
    params: {
      channel_uuid: req.body.channel_uuid || config.rise.default_channel
    }
  })
    .then((response) => {
      console.log('BRK response', response)

      if (response.data) {
        // Auth
        req.session.session_uuid = response.session
        req.session.token = response.token

        // Utilities
        req.session.channel = response.data.Channel
        req.session.user = response.data.ChannelUser
        req.session.cart = response.data.ChannelCart
        req.session.customer = response.data.ChannelCustomer
      }

      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify(response))
    })
    .catch(err => {
      console.log('auth/register', err)
      // Auth
      delete req.session.token

      // Utilities
      delete req.session.channel
      delete req.session.user
      // delete req.session.cart
      delete req.session.customer

      res.status('401').end(JSON.stringify(err))
    })
}
