// import * as api from 'api.js'
import { rise } from 'sdk'
import * as config from 'config'

function validateEmail(str) {
  if (str && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
    return true
  }
  else {
    return false
  }
}

export function post(req, res) {

  const user = req.body

  if (validateEmail(user.email)) {

  }
  else {
    user.username = user.email
  }

  rise.channelAuth.login(user, {
    session: req.session.session_uuid || req.headers.session,
    params: {
      channel_uuid: req.body.channel_uuid || config.rise.default_channel
    }
  })
    .then((response) => {

      if (response.data) {
        // Authentication
        req.session.session_uuid = response.session
        req.session.token = response.token

        // Utilities
        req.session.channel = response.data.Channel
        req.session.user = response.data.ChannelUser
        req.session.cart = response.data.ChannelCart
        req.session.customer = response.data.ChannelCustomer
      }

      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))

    })
    .catch(err => {
      console.log('auth/login', err)

      const error = err.error ? { error: err.error } : err

      // Authentication
      delete req.session.token

      // Utilities
      delete req.session.channel
      delete req.session.user
      // delete req.session.cart
      delete req.session.customer


      res.setHeader('Content-Type', 'application/json')
      res.statusCode = err.statusCode ? err.statusCode : 500
      res.end(JSON.stringify(error))
    })
}
