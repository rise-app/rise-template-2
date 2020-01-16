import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {

  rise.channelAuth.logout({}, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then((result) => {
      res.setHeader('Content-Type', 'application/json')
      // Auth
      delete req.session.token

      // Utilities
      delete req.session.channel
      delete req.session.user
      delete req.session.cart
      delete req.session.customer

      res.end(JSON.stringify({ ok: true }))

    })
    .catch(err => {
      console.log('auth/logout', err)
      const error = err.error ? { error: err.error } : err

      // Auth
      delete req.session.token

      // Utilities
      delete req.session.channel
      delete req.session.user
      delete req.session.cart
      delete req.session.customer

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
