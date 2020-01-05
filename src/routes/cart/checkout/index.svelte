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

  // LOGIC
  const {preloading, session, page} = stores()

  let cart = {}, items = []
  $: cart = $session.cart || {}
  $: items = $session.cart && $session.cart.items ? $session.cart.items : []


  let inProgress = false,
          isLoggedIn = false,
          countries = [],
          countriesLoading = false,
          provinces = [],
          provincesLoading = false,
          registerFormValue,
          billingFormValue,
          shippingFormValue,
          shippingMatchesBilling = true

  $: isLoggedIn = !!($session.user && $session.user.username)
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
          : {}
  $: shippingFormValue = $session.cart && $session.cart.address_shipping
          ? $session.cart.address_shipping
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

  async function setBilling() {

  }

  async function setShipping() {

  }

  async function register() {

  }

  async function setPayment() {

  }

  async function checkout() {
    inProgress = true
    inProgress = false
    return goto('/cart/checkout/confirmation')
  }

  onMount(async () => {
    return listCountries()
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

    <Steps on:complete={checkout}>
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
            <div class="list-group-item">
              <div class="text-muted">Account Setup</div>
              <RegisterForm
                value={ registerFormValue }
                inProgress={ inProgress }
                preloading="{ $preloading }"
                on:register={register}
              />
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
                on:address={setBilling}
              />
            </div>
          </div>
          <div class="list-group-item">
            <h5 class="text-muted">Payment Information</h5>

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
                on:address={setShipping}
              />
              {/if}
            </div>
          </div>
        </div>
      </StepPanel>
    </Steps>
  </div>
</div>
