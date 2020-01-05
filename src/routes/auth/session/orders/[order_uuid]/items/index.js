import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel
  const order_uuid = req.params.order_uuid

  rise.channelAuth.listSessionCustomerOrderItems({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid,
      order_uuid: order_uuid
    }
  })
    .then(response => {
      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response }))
        })
    })
    .catch(err => {
      console.log('auth/session/order/items', err)
      res.status('401').end(JSON.stringify(err))
    })
}
