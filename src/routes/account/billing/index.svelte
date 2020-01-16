<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    const addressBillingReq = async () => {
      return rise.channelAuth.sessionCustomerBilling({}, {
        session: session_uuid,
        token: token
      })
    }

    const countriesReq = async () => {
      return rise.channelPublicCountry.list({}, {
        session: session_uuid,
        token: token,
        query: {
          limit: 100
        }
      })
    }

    return Promise.all([
      addressBillingReq(),
      countriesReq()
    ])
      .then(([
         addressBilling = {},
         countries = {}
       ]) => {
        return {
          addressBilling: addressBilling.data,

          countries: countries.data,
          countries_offset: countries.offset,
          countries_limit: countries.limit,
          countries_total: countries.total
        }
      })
      .catch(err => {
        return this.error(err)
      })
  }

</script>

<script>

  // MODULES
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get, put, post } from 'utils'


  // COMPONENTS
  import AddressForm from '../../_components/forms/AddressForm.svelte'
  import { ListErrors } from '../../_components/ListErrors'

  // IMPORTS
  export let
    addressBilling = {},
    errors,
    countries = [],
    countries_offset = 0,
    countries_limit = 100,
    countries_total = 0

  // LOGIC
  const {preloading, session, page} = stores()

  let inProgress = false,
    countriesLoading = false,
    provinces = [],
    provincesLoading = false

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

  async function setBilling(address) {
    inProgress = true
    return put(`auth/session/customer/address_billing`, address, {}, $session.token, $session.session_uuid)
      .then(response => {
        inProgress = false

        let sessionValues = {
          ...$session
        }

        if (response.session) {
          sessionValues.session_uuid = response.session
        }

        if (response.customer) {
          sessionValues.customer = response.customer
        }

        if (response.data) {
          sessionValues.customer.address_billing = response.data
        }

        session.set(sessionValues)

        console.log('brk response!', response)

        return response
      })
      .catch(err => {
        inProgress = false
        errors = err
      })
  }

  onMount(async () => {
    return listCountryProvinces(addressBilling.country_code)
  })

</script>

<style type="text/scss">
  @import "../../../theme/variables";

  .address_section
  {
    width: 100%;
  }
  .address_title
  {
    font-size: 30px;
    font-weight: 500;
  }
</style>

<svelte:head>
  <title>Address Billing - Account</title>
</svelte:head>

<div class="address_section">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="address_title mb-3">
          Address Billing
        </div>
        <ListErrors {errors} />
        <AddressForm
          value="{addressBilling}"
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
  </div>
</div>
