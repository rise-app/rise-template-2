import { rise, utils } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionCustomer({}, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      // Update the customer in session
      if (response.data) {
        req.session.customer = response.data
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, customer: req.session.customer}))
        })
    })
    .catch(err => {
      console.log('auth/session/customer', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}

export function put(req, res) {
  const customer = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.updateSessionCustomer(customer, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      // Update the customer in session
      if (response.data) {
        req.session.customer = response.data
      }

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...response, customer: req.session.customer}))
        })
    })
    .catch(err => {
      console.log('auth/session/customer', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
