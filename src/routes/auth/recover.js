import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {
  const user = req.body

  rise.channelAuth.recover(user, {
    session: req.session.session_uuid,
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
      console.log('auth/recover', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
