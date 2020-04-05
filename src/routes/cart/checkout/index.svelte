<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  const countriesReq = async (session_uuid, token) => rise.channelPublicCountry.list({}, {
    session: session_uuid,
    token: token,
    query: {
      limit: 100
    }
  })

  const countryProvincesReq = async (session_uuid, token, country_code) => rise.channelPublicCountryProvince.list({}, {
    session: session_uuid,
    token: token,
    params: {
      country_code
    },
    query: {
      limit: 100
    }
  })

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    return {
      channel_uuid: channel
    }
  }
</script>

<script>
  // MODULES
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get, put, post } from 'utils'

  // COMPONENTS
  import { StepList, StepPanel, Steps, Step } from '../../_components/Steps'
  import RegisterForm from '../../_components/forms/RegisterForm.svelte'
  import AddressForm from '../../_components/forms/AddressForm.svelte'
  import Currency from '../../_components/Currency.svelte'
  import { ListErrors } from '../../_components/ListErrors'
  import { CreditCard } from '../../_components/CreditCard'
  import LoginForm from '../../_components/forms/LoginForm.svelte'
  import Dialog, { Title, Content, Actions } from '@smui/dialog'
  import { RisePaymentForm, RisePaymentPreview } from '@rise/payment-form/src/components/components.module'

  import Modal from '../../_components/material/modal/Modal'

  // LOGIC
  const {preloading, session, page} = stores()

  let errors

  /************************
   * DIALOGS
   ************************/
  let dialogPayment

  /*******************************
   * DIALOG HANDLERS
   *******************************/
  function closeHandler(event) {
    console.log('closed', event)
  }


  let cart = {},
      items = [],
      sources = []

  $: cart = $session.cart || {}
  $: items = $session.cart && $session.cart.items
      ? $session.cart.items
      : []

  let
    inProgress = false,
    isLoggedIn = false,
    countries = [],
    countriesLoading = false,
    provinces = [],
    provincesLoading = false,
    registerFormValue,
    billingFormValue,
    shippingFormValue,
    shippingMatchesBilling = true,
    paymentFormValue = {
      // amount: 100,
      // gateway_token: null
    }

  // WEIRD but works
  $: if ($session.user) {
    isLoggedIn = !!($session.user && $session.user.user_uuid)
  }
  else {
    isLoggedIn = !!($session.user && $session.user.user_uuid)
  }

  $: registerFormValue = {
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

  $: billingFormValue = $session.cart && $session.cart.address_billing
      ? $session.cart.address_billing
      : $session.customer && $session.customer.address_billing
        ? $session.customer.address_billing
        : {}
  $: shippingFormValue = $session.cart && $session.cart.address_shipping
      ? $session.cart.address_shipping
      : $session.customer && $session.customer.address_shipping
        ? $session.customer.address_shipping
        : {}


  /************************
   * REQUESTS
   ************************/

  async function listCountries() {
    countriesLoading = true

    return countriesReq($session.session_uuid, $session.token)
      .then(results => {
        countriesLoading = false
        countries = results.data

        return results
      })
      .catch(err => {
        countriesLoading = false
        console.log('BRK err', err)
      })
  }

  async function listCountryProvinces(country_code) {
    provincesLoading = true

    return countryProvincesReq($session.session_uuid, $session.token, country_code)
      .then(results => {
        provincesLoading = false
        provinces = results.data
        return results
      })
      .catch(err => {
        provincesLoading = false
      })
  }

  async function setCustomer() {

  }

  async function setBilling(address) {
    inProgress = true
    return put(`auth/session/cart/address_billing`, address, {}, $session.token, $session.session_uuid)
      .then(response => {
        inProgress = false
        console.log('brk response!', response)
        let sessionValues = {
          ...$session
        }

        if (response.session) {
          sessionValues.session_uuid = response.session
        }
        if (response.token) {
          sessionValues.token = response.token
        }
        if (response.cart) {
          sessionValues.cart = response.cart
        }
        // Update the session store
        session.set(sessionValues)

        return response

      })
      .catch(err => {
        inProgress = false
        errors = err
        return
      })
  }

  async function setShipping(address) {
    inProgress = true
    return put(`auth/session/cart/address_shipping`, address, {}, $session.token, $session.session_uuid)
      .then(response => {
        inProgress = false
        console.log('brk response!', response)

        if (response.session) {
          sessionValues.session_uuid = response.session
        }
        if (response.token) {
          sessionValues.token = response.token
        }
        if (response.cart) {
          sessionValues.cart = response.cart
        }
        // Update the session store
        session.set(sessionValues)

        return response
      })
      .catch(err => {
        inProgress = false
        errors = err
        return
      })
  }

  async function login(user) {
    inProgress = true

    // Internal Server API
    return post(`auth/login`, user)
      .then(response => {

        console.log('BRK login', response)

        if (response.errors || response.error) {
          errors = response.errors ? response.errors : [response.error]
        }

        inProgress = false

        if (response.data) {
          const sessionValues = {
            ...$session,
            session_uuid: response.session,
            token: response.token,
            user: response.data.ChannelUser,
            channel: response.data.Channel,
            cart: response.data.ChannelCart,
            customer: response.data.ChannelCustomer
          }
          session.set(sessionValues)

          return response
        }
        else {
          return
        }

      })
      .catch(err => {
        console.log('BRK Unexpected Error', err)
        inProgress = false
        errors = err
      })
  }

  async function register(user) {
    inProgress = true

    // Internal Server API
    return post(`auth/register`, user)
      .then(response => {

        console.log('BRK register', response)

        if (response.errors || response.error) {
          errors = response.errors ? response.errors : [response.error]
        }

        inProgress = false

        if (response.data) {
          const sessionValues = {
            ...$session,
            session_uuid: response.session,
            token: response.token,
            user: response.data.ChannelUser,
            cart: response.data.ChannelCart,
            channel: response.data.Channel
          }

          session.set(sessionValues)

          return response
        }
        else {
          return
        }

      })
      .catch(err => {
        console.log('BRK Unexpected Error', err)
        inProgress = false
        errors = err
        return
      })
  }

  async function setPayment(payment) {
    inProgress = true
    return put(`auth/session/cart/payment_details`, payment, {}, $session.token, $session.session_uuid)
      .then(response => {
        inProgress = false
        console.log('brk response!', response)
        return
      })
      .catch(err => {
        inProgress = false
        errors = err
        return
      })
  }

  async function setFulfillment(fulfillment) {
    inProgress = true
    return put(`auth/session/cart/fulfillment_details`, fulfillment, {}, $session.token, $session.session_uuid)
      .then(response => {
        inProgress = false
        console.log('brk response!', response)
        return
      })
      .catch(err => {
        inProgress = false
        errors = err
        return
      })
  }

  async function checkout(details) {
    console.log('BRK checkout', details)
    // Disable Btns
    inProgress = true
    return put(`auth/session/cart/checkout`, {}, {}, $session.token, $session.session_uuid)
      .then(response => {

        // re-enable Btns
        inProgress = false

        console.log('brk response!', response)

        const sessionValues = {
          ...$session
        }

        if (response.session) {
          sessionValues.session_uuid = response.session
        }
        if (response.token) {
          sessionValues.token = response.token
        }
        if (response.cart) {
          sessionValues.cart = response.cart
        }

        // Update the session store
        session.set(sessionValues)

        if (response.data.ChannelOrder) {
          return goto(`/cart/checkout/confirmation?order_uuid=${response.data.ChannelOrder.order_uuid}`)
        }
        else {
          errors = [
            'Checkout did not return an order!'
          ]
        }
      })
      .catch(err => {
        // re-enable Btns
        inProgress = false
        errors = err
        return
      })
  }


  /************************
   * UTILITIES
   ************************/

  let demoToken, demoSuccess, demoFailed, demoEdit
  function token(event) {
    console.log('HAVE TOKEN', event)
    demoToken = event.detail
    paymentFormValue.gateway_token = event.detail
    dialogPayment.close()
  }
  function success(event) {
    console.log('HAVE SUCCESS', event)
    demoSuccess = event.detail
  }
  function failed(event) {
    console.log('HAVE FAILED', event)
    demoFailed = event.detail
  }
  function edit(event) {
    console.log('EDIT CLICKED!', event)
    demoEdit = event.detail
  }

  // Load the countries on mounting of the component
  onMount(async () => {
    await listCountries()
    if (billingFormValue.country_code || shippingFormValue.country_code) {
      await listCountryProvinces(billingFormValue.country_code || shippingFormValue.country_code)
    }
  })

</script>
<style type="text/scss">
  @import "../../../theme/variables";

  .cart_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }

</style>


<svelte:head>
  <title>Checkout</title>
</svelte:head>

<div class="cart_section">
  <div class="container">


    <!-- Order Total -->
    <div class="order_total">
      <div class="order_total_content text-md-right">
        <div class="order_total_title">Cart Total:</div>
        <div class="order_total_amount">
          <Currency
            price={cart.total_due}
            currency={cart.currency}
          />
        </div>
      </div>
    </div>

    <ListErrors {errors} />

    <Steps on:complete={checkout} {inProgress} preloading="{$preloading}">
      <StepList>
        <Step>Account</Step>
        <Step>Address</Step>
        <Step>Payment</Step>
      </StepList>

      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="list-group">
          {#if isLoggedIn}
            <div class="list-group-item">
              <h4 class="text-muted">
                Account Setup
              </h4>
              <h3>{ $session.user.email }</h3>
              <div>Not you? <a href="/login">Click Here</a></div>
            </div>
          {:else}
            <div class="row">

              <div class="col-sm-12 col-md-6">
                <div class="list-group-item">
                  <h4 class="text-muted mt-2 mb-4">
                    Returning Customer
                  </h4>
                  <LoginForm
                    value={ registerFormValue }
                    inProgress={ inProgress }
                    preloading="{ $preloading }"
                    on:login={e => login(e.detail)}
                    errors={errors}
                  />
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="list-group-item">
                  <h4 class="text-muted mt-2 mb-4">
                    New Customer
                  </h4>
                  <RegisterForm
                    value={ registerFormValue }
                    inProgress={ inProgress }
                    preloading="{ $preloading }"
                    on:register={e => register(e.detail)}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          {/if}
          </div>
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="list-group">
            <div class="list-group-item">
              <h5 class="text-muted">Billing Information</h5>
              <AddressForm
                value="{billingFormValue}"
                inProgress={ inProgress }
                preloading="{ $preloading }"
                {countries}
                {provinces}
                loading="{ countriesLoading || provincesLoading}"
                on:countrySelected="{e => listCountryProvinces(e.detail)}"
                on:address={e=> setBilling(e.detail)}
              />
            </div>
          </div>
          <div class="list-group-item">
            <h5 class="text-muted">
              Shipping Information
            </h5>

            <fieldset class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="shipping_matches_billing"
                  bind:checked="{shippingMatchesBilling}"
                >
                <label class="form-check-label" for="shipping_matches_billing">
                  My Shipping Address is the same as Billing Address
                </label>
              </div>
            </fieldset>

            {#if !shippingMatchesBilling}
              <AddressForm
                value="{shippingFormValue}"
                inProgress={ inProgress }
                preloading="{ $preloading }"
                {countries}
                {provinces}
                loading="{ countriesLoading || provincesLoading}"
                on:countrySelected="{e => listCountryProvinces(e.detail)}"
                on:address={e=> setShipping(e.detail)}
              />
            {/if}
          </div>
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="list-group">
            <div class="list-group-item">
              <h5 class="text-muted">Payment Information</h5>

              <a
                class="btn btn-primary"
                on:click={e=> dialogPayment.open()}
              >
                Add Payment Method
              </a>
            </div>
          </div>
        </div>
      </StepPanel>
    </Steps>
  </div>
</div>

<Modal
  bind:this={dialogPayment}
  aria-labelledby="dialog-contact-title"
  aria-describedby="dialog-contact-content"
  on:MDCDialog:closed={closeHandler}
>
<!--  <CreditCard />-->
  <RisePaymentForm
    type="card"
    rise="{{
      channel_uuid: riseConfig.channel_uuid,
      key_public: riseConfig.public_key,
      live_mode: riseConfig.live_mode
    }}"
    cart="{{}}"
    customer="{{}}"
    nexio="{{
      live_mode: riseConfig.live_mode,
      processingOptions: {
        checkFraud: true,
        verifyCvc: false,
        // verifyAvs: 3,
        check3ds: true,
        saveCardToken: true,
        verboseResponse: true,
        webhookUrl: '',
        webhookFailUrl: ''
      },
      publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvWpIQFjQQCPpaIlJKpeg irp5kLkzLB1AxHmnLk73D3TJbAGqr1QmlsWDBtMPMRpdzzUM7ZwX3kzhIuATV4Pe 7RKp3nZlVmcrT0YCQXBrTwqZNh775z58GP2kZs+gVfNqBampJPzSB/hB62KkByhE Cn6grrRjiAVwJyZVEvs/2vrxaEpO+aE16emtX12RgI5JdzdOiNyZEQteU6zRBRJE ocPWVxExaOpVVVJ5+UnW0LcalzA+lRGRTrQJ5JguAPiAOzRPTK/lYFFpCAl/F8wt oAVG1c8zO2NcQ0Pko+fmeidRFxJ/did2btV+9Mkze3mBphwFmvnxa35LF+Cs/XJHDwIDAQAB'
    }}"
    card="{{
      gateway_type: 'nexio',
      card_type: null,
      card_name: '',
      card_year: '',
      card_month: '',
      email: null,
      phone: null,
      address_1: null,
      address_2: null,
      address_3: null,
      city: null,
      postal_code: null,
      province_code: null,
      country_code: null,
      is_processing: false,
      errors: null,
      disabled_fields: [],
      submit_text: 'Save Card'
    }}"
    on:token={token}
    on:success={success}
    on:failed={failed}
  />
</Modal>
