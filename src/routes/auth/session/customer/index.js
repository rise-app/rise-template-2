import { rise } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  rise.channelAuth.sessionCustomer({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      // Update the customer in session
      req.session.customer = response.data

      res.end(JSON.stringify({ customer: req.session.customer || null }))
    })
    .catch(err => {
      console.log('auth/session/customer', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const customer = req.body

  rise.channelAuth.updateSessionCustomer(customer, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: req.session.channel.channel_uuid || config.rise.default_channel
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      // Update the customer in session
      req.session.customer = response.data

      res.end(JSON.stringify({ customer: req.session.customer || null }))
    })
    .catch(err => {
      console.log('auth/session/customer', err)
      res.status('401').end(JSON.stringify(err))
    })
}
