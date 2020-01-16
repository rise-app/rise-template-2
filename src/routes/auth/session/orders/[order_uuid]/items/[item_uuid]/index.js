import * as config from 'config'
import { rise, utils } from 'sdk'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  const order_uuid = req.params.order_uuid
  const item_uuid = req.params.item_uuid

  rise.channelAuth.getSessionCustomerOrderItem({}, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid,
      order_uuid: order_uuid,
      item_uuid: item_uuid
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
          return res.end(JSON.stringify({...response}))
        })

    })
    .catch(err => {
      console.log('auth/session/order/items/[item_uuid]', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const orderItem = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.updateSessionOrderItem(orderItem, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid,
      item_uuid: req.params.item_uuid
    }
  })
    .then(response => {
      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }

      return rise.channelAuth.sessionOrder({}, {
        session: req.session.session_uuid || req.headers.session,
        token: req.session.token || req.headers.authorization,
        params: {
          channel_uuid: channel_uuid
        }
      })
        .then(_response => {
          if (response.session) {
            req.session.session_uuid = response.session
          }
          if (response.token) {
            req.session.token = response.token
          }
          if (_response.data) {
            req.session.order = response.data
          }
          return [response, _response]
        })
    })
    .then(([items, order]) => {

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...items, order: req.session.order}))
        })
    })
    .catch(err => {
      console.log('auth/session/order/items/[item_uuid]', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}

export function del(req, res) {
  const orderItem = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.removeSessionOrderItem(orderItem, {
    session: req.session.session_uuid || req.headers.session,
    token: req.session.token || req.headers.authorization,
    params: {
      channel_uuid: channel_uuid,
      item_uuid: req.params.item_uuid
    }
  })
    .then(response => {
      if (response.session) {
        req.session.session_uuid = response.session
      }
      if (response.token) {
        req.session.token = response.token
      }

      return rise.channelAuth.sessionOrder({}, {
        session: req.session.session_uuid || req.headers.session,
        token: req.session.token || req.headers.authorization,
        params: {
          channel_uuid: channel_uuid
        }
      })
        .then(_response => {
          if (response.session) {
            req.session.session_uuid = response.session
          }
          if (response.token) {
            req.session.token = response.token
          }
          if (_response.data) {
            req.session.order = response.data
          }
          return [response, _response]
        })
    })
    .then(([items, order]) => {

      return utils.saveSession(req)
        .then(() => {
          // req.session.save( function(err) {
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({...items, order: req.session.order}))
        })
    })
    .catch(err => {
      console.log('auth/session/order/items/[item_uuid]', err)
      const error = err.error ? { error: err.error } : err
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
