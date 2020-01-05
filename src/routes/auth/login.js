// import * as api from 'api.js'
import { rise } from 'sdk'
import * as config from 'config'

export function post(req, res) {

  const user = req.body
  user.username = req.body.email

  rise.channelAuth.login(user, {
    session: req.session.session_uuid,
    params: {
      channel_uuid: req.body.channel_uuid || config.rise.default_channel
    }
  })
    .then((response) => {

      if (response.data) {
        req.session.session_uuid = response.session
        req.session.token = response.token

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

      delete req.session.token
      delete req.session.channel
      delete req.session.user
      delete req.session.cart
      delete req.session.customer

      res.status('401').end(JSON.stringify(err))
    })
}
