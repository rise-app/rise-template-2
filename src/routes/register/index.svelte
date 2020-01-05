<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import { post } from 'utils.js'

  // COMPONENTS
  import ListErrors from '../_components/ListErrors.svelte'
  import RegisterForm from '../_components/forms/RegisterForm.svelte'

  // LOGIC

  const { preloading, session, page } = stores()

  let errors = null
  let inProgress = false

  let redirect, formValue
  $: redirect = $page.query && $page.query.redirect ? $page.query.redirect : '/account'
  $: formValue = {
    name_prefix: null,
    name_first: null,
    name_last: null,
    name_suffix: null,
    company: null,
    email: null,
    // username: null,
    phone: null,
    phone_sms: null,
    password: null,
    password_confirm: null
  }

  async function submit(event) {
    inProgress = true

    // Set the reactive value
    formValue = event.detail

    // Internal Server API
    const response = await post(`auth/register`, event.detail)
      .catch(err => {
        console.log('BRK Unexpected Error', err)
        inProgress = false
      })

    if (response.errors || response.error) {
      errors = response.errors ? response.errors : [response.error]
    }

    inProgress = false

    if (response.data) {
      $session.session_uuid = response.session
      $session.token = response.token
      $session.user = response.data.ChannelUser
      $session.cart = response.data.ChannelCart
      $session.customer = response.data.ChannelCustomer
      goto(redirect)
    }
  }
</script>

<svelte:head>
  <title>Sign up • rise</title>
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
          Sign Up
        </h1>
        <h4 class="text-muted text-center mb-4">
          <small>Let’s Sign Up first and start shopping.</small>
        </h4>

        <div class="card">
          <div class="card-body">
            <ListErrors {errors} />

            <RegisterForm
              value={ formValue }
              inProgress={ inProgress }
              preloading="{ $preloading }"
              on:register={submit}
            ></RegisterForm>
          </div>
        </div>

        <br />
        <p class="text-center">
          <a href="/login">Already have an account? Login here.</a>
        </p>
      </div>
    </div>
  </div>
</div>
