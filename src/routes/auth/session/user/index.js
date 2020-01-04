import { rise } from 'sdk'
import * as config from 'config'

export function get(req, res) {
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.sessionUser({}, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      req.session.user = response.data
      res.end(JSON.stringify({ user: req.session.user || null }))
    })
    .catch(err => {
      console.log('auth/session/user', err)
      res.status('401').end(JSON.stringify(err))
    })
}

export function put(req, res) {
  const user = req.body
  const channel_uuid = req.session && req.session.channel && req.session.channel.channel_uuid
    ? req.session.channel.channel_uuid
    : config.rise.default_channel

  rise.channelAuth.updateSessionUser(user, {
    session: req.session.session_uuid,
    token: req.session.token,
    params: {
      channel_uuid: channel_uuid
    }
  })
    .then(response => {
      res.setHeader('Content-Type', 'application/json')
      req.session.user = response.data
      res.end(JSON.stringify({ user: req.session.user || null }))
    })
    .catch(err => {
      console.log('auth/session/user', err)
      res.status('401').end(JSON.stringify(err))
    })
}
