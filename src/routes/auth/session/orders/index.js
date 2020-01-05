import { rise } from 'sdk'
import * as config from 'config'
import { utils } from '../../../../node_modules/sdk'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCustomerOrders({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response}))
        })

    })
    .catch(err => {
      console.log('auth/session/order', err)
      res.status('401').end(JSON.stringify(err))
    })
}
