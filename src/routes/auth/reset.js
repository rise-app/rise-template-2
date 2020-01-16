import * as api from 'api.js'
import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  const user = req.body

  rise.channelAuth.setRecovery(user, {
    session: req.session.session_uuid || req.headers.session,
    params: {
      channel_uuid: req.body.channel_uuid || config.rise.default_channel
    }
  })
    .then((response) => {

      console.log('BRK response', response)

      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify(response))

    })
    .catch(err => {
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
