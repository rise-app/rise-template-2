<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import { post } from 'utils.js'

  // COMPONENTS
  import ListErrors from '../_components/ListErrors.svelte'
  import LoginForm from '../_components/forms/LoginForm.svelte'

  // LOGIC

  let errors = null
  let inProgress = false

  const {preloading, session, page} = stores()

  $: redirect = $page.query && $page.query.redirect ? $page.query.redirect : '/'

  $: formValue = {
    email: null,
    password: null
  }

  async function submit(event) {
    inProgress = true

    // Set the reactive value
    formValue = event.detail

    const response = await post(`auth/login`, event.detail)
      .catch(err => {
        console.log('BRK Unexpected Error', err)
        inProgress = false
      })

    inProgress = false

    if (response.errors || response.error) {
      errors = response.errors ? response.errors : [response.error]
    }

    if (response.data) {
      // Authentication
      $session.session_uuid = response.session
      $session.token = response.token

      // Utilities
      $session.channel = response.data.Channel
      $session.user = response.data.ChannelUser
      $session.cart = response.data.ChannelCart
      $session.customer = response.data.ChannelCustomer

      goto(redirect)
    }
  }
</script>

<svelte:head>
  <title>Sign in • rise</title>
</svelte:head>

<div class="auth-page">
  <div class="container page">
<!--    <div class="row justify-content-center">-->
<!--      <div class="col-md-6 col-sm-12 col-xs-12 mb-5 mt-5">-->
<!--        <div class="hero text-center">-->
<!--          <img src="branding/logos/rise_75x150_wht.png" alt="RiSE">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="row justify-content-center">
      <div class="col-md-6 col-xs-12 mb-5 mt-5">

        <h1 class="display-2 text-center mb-3">
          Sign In
        </h1>
        <h4 class="text-muted text-center mb-4">
          <small>Just sign in if you have an account already</small>
        </h4>

        <div class="card">
          <div class="card-body">
          <ListErrors {errors} />

          <LoginForm
            value={ formValue }
            inProgress={ inProgress }
            preloading="{ $preloading }"
            on:login={ submit }
          >
          </LoginForm>
          </div>
        </div>

        <br />
        <p class="text-center">
          <a href="/forgotpassword">Forgot your password?</a>
        </p>

        <p class="text-center">
          <a href="/register">Don't have a RiSE account? Register Here.</a>
        </p>
      </div>
    </div>
  </div>
</div>
