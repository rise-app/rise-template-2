import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {

  rise.channelAuth.logout({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then((result) => {
      res.setHeader('Content-Type', 'application/json')

      delete req.session.token

      delete req.session.channel
      delete req.session.user
      delete req.session.cart
      delete req.session.customer

      res.end(JSON.stringify({ ok: true }))

    })
    .catch(err => {
      console.log('auth/logout', err)

      delete req.session.token

      delete req.session.channel
      delete req.session.user
      delete req.session.cart
      delete req.session.customer

      res.status('401').end(JSON.stringify(err))
    })
}
