import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import cookieSession from 'cookie-session'
import * as sapper from '@sapper/server'

import uuidv4 from 'uuid/v4'
import helmet from 'helmet'

const FileStore = sessionFileStore(session)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.locals = {}
    res.locals.nonce = uuidv4()
    next()
  })
  .use(
    helmet({
      // contentSecurityPolicy: {
      //   directives: {
      //     defaultSrc: ["'self'"],
      //     scriptSrc: [
      //       "'self'",
      //       "'api.sandbox.rise.com'",
      //       "'api.beta.rise.com'",
      //       "'api.rise.com'",
      //       "'sandbox.rise.com'",
      //       "'beta.rise.com'",
      //       "'rise.com'",
      //       "'www.rise.com'",
      //       "'code.jquery.com'",
      //       "'cdnjs.cloudflare.com'",
      //       "'maxcdn.bootstrapcdn.com'",
      //       (req, res) => `'nonce-${res.locals.nonce}'`
      //     ],
      //     styleSrc: [
      //       "'self'",
      //       "'api.sandbox.rise.com'",
      //       "'api.beta.rise.com'",
      //       "'api.rise.com'",
      //       "'sandbox.rise.com'",
      //       "'beta.rise.com'",
      //       "'rise.com'",
      //       "'www.rise.com'",
      //       "'fonts.googleapis.com'",
      //       "'maxcdn.bootstrapcdn.com'",
      //       (req, res) => `'nonce-${res.locals.nonce}'`
      //     ],
      //     // browserSniff: false
      //   }
      // }
    })
  )
  // .use(cookieSession({
  //   name: 'rise_session',
  //   // Cookie Options
  //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // }))
  .use(function(req, res, next) {
    // console.log("ENV NON_WWW", process.env.NON_WWW, req.host)
    if (process.env.NON_WWW && req.host.match(/^www/) !== null) {
      if (process.env.FORCE_HTTPS) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          res.writeHead(301, {
            Location: 'https://' + req.headers.host.replace(/^www\./, '') + req.url
          })
          return res.end();
        }
      }
      else {
        res.writeHead(301, {
          Location: '//' + req.headers.host.replace(/^www\./, '') + req.url
        })
        return res.end();
        // return res.redirect('http://' + req.host.replace(/^www\./, '') + req.url)
      }
    }
    next()
  })
  .use(function(req, res, next) {
    // console.log("ENV FORCE_HTTPS", process.env.FORCE_HTTPS, req.headers['x-forwarded-proto'])
    if (process.env.FORCE_HTTPS) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        res.writeHead(301, {
          Location: 'https://' + req.headers.host + req.url
        })
        return res.end();
      }
    }
    next()
  })
  .use(
    // TODO: It's likely you will want to use a Redis Store for this instead of a file session
    session({
      secret: 'risebyrise',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000,
      },
      store: new FileStore({
        path: process.env.NOW ? `/tmp/sessions` : `.sessions`,
      }),
    })
  )
  .use(
    compression({
      level: 9,
      // threshold: 4096,
      threshold: 0,
    }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => ({
        // Authentication
        session_uuid: req.session && req.session.session_uuid,
        token: req.session && req.session.token,

        // Utilities
        channel: req.session && req.session.channel,
        user: req.session && req.session.user,
        cart: req.session && req.session.cart,
        customer: req.session && req.session.customer
      }),
    })
  )
  .listen(PORT, err => {
    if (err) {
      console.log('error', err)
    }
  })
