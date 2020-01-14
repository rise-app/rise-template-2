<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

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

  // LOGIC
  const {preloading, session, page} = stores()

  let errors

  let cart = {}, items = []
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
    shippingMatchesBilling = true

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


  async function listCountries() {
    countriesLoading = true

    return rise.channelPublicCountry.list({}, {
      session: $session.session_uuid,
      token: $session.token,
      query: {
        limit: 100
      }
    })
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

    return rise.channelPublicCountryProvince.list({}, {
      session: $session.session_uuid,
      token: $session.token,
      params: {
        country_code
      },
      query: {
        limit: 100
      }
    })
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
            session_uuid: response.session,
            token: response.token,
            user: response.data.ChannelUser,
            channel: response.data.Channel,
            cart: response.data.ChannelCart,
            customer: response.data.ChannelCustomer,
            ...$session,
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
            session_uuid: response.session,
            token: response.token,
            user: response.data.ChannelUser,
            cart: response.data.ChannelCart,
            channel: response.data.Channel,
            ...$session,
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
    // Disable Btns
    inProgress = true
    return put(`auth/session/cart/checkout`, details, {}, $session.token, $session.session_uuid)
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
        <Step>Account Setup</Step>
        <Step>Billing Info</Step>
        <Step>Shipping Info</Step>
      </StepList>

      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="list-group">
          {#if isLoggedIn}
            <div class="list-group-item">
              <h5 class="text-muted">Account Setup</h5>
              <h3>{ $session.user.email }</h3>
              <div>Not you? <a href="/login">Click Here</a></div>
            </div>
          {:else}
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="list-group-item">
                  <div class="text-muted">Setup an Account</div>
                  <RegisterForm
                    value={ registerFormValue }
                    inProgress={ inProgress }
                    preloading="{ $preloading }"
                    on:register={e => register(e.detail)}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="list-group-item">
                  <div class="text-muted">
                    Log into an Account
                  </div>
                  <LoginForm
                    value={ registerFormValue }
                    inProgress={ inProgress }
                    preloading="{ $preloading }"
                    on:login={e => login(e.detail)}
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
            <h5 class="text-muted">Payment Information</h5>
            <CreditCard />
          </div>
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="list-group">
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
        </div>
      </StepPanel>
    </Steps>
  </div>
</div>
