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
      res.status('401').end(JSON.stringify(err))
    })
}
