<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'


  const offerReq = async (session_uuid, token, handle) => {
    if (handle) {
      return rise.channelPublicOffer.getByHandle({}, {
        session: session_uuid,
        token: token,
        params: {
          handle: handle
        }
      })
    } else {
      return Promise.resolve()
    }
  }

  const variantsReq = async (session_uuid, token, handle, variants_query) => {
    if (handle) {
      return rise.channelPublicOfferVariant.listByHandle({}, {
        session: session_uuid,
        token: token,
        params: {
          handle: handle
        },
        query: riseQuery(variants_query)
      })
    } else {
      Promise.resolve()
    }
  }

  const crossSellsReq = async (session_uuid, token, offer_uuid, cross_sells_query) => {
    if (offer_uuid) {
      return rise.channelPublicOffer.listCrossSells({}, {
        session: session_uuid,
        token: token,
        params: {
          offer_uuid: offer_uuid
        },
        query: riseQuery(cross_sells_query)
      })
    } else {
      return Promise.resolve({})
    }
  }

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    const {handle} = params

    // Fixes deep nested objects
    let variants_query = riseQuery(pluckQuery(query, 'vq'))
    let cross_sells_query = riseQuery(pluckQuery(query, 'cs'))


    return Promise.all([
      offerReq(session_uuid, token, handle),
      variantsReq(session_uuid, token, handle, variants_query),
      Promise.resolve() // crossSellsReq(session_uuid, token, handle, cross_sells_query)
    ])
      .then(([
         offer = {},
         variants = {},
        cross_sells = {}
       ]) => {
        return {
          offer: offer.data,
          offer_uuid: offer.data.offer_uuid,

          variants_query,
          variants: variants.data,
          variants_total: variants.total,
          variants_offset: variants.offset,
          variants_limit: variants.limit,

          cross_sells_query,
          cross_sells: cross_sells.data,
          cross_sells_total: cross_sells.total,
          cross_sells_offset: cross_sells.offset,
          cross_sells_limit: cross_sells.limit
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
  import { post } from 'utils'

  // COMPONENTS
  import { Tab, TabList, TabPanel, Tabs } from '../../_components/Tabs'
  import Currency from '../../_components/Currency.svelte'
  import OfferForm from './_components/OfferForm.svelte'
  import Gallery from './_components/Gallery.svelte'
  import Header from './_components/Header.svelte'
  import Related from '../../_components/layout/Related.svelte'


  // IMPORTS
  export let
    offer = {},
    offer_uuid,

    variants_query = {},
    variants = [],
    variants_loading = false,
    variants_total = 0,
    variants_offset = 0,
    variants_limit = 10,
    variants_errors = null,
    variants_sort = [['position', 'ASC']],

    cross_sells_query = {},
    cross_sells_loading = false,
    cross_sells = [],
    cross_sells_errors = null,
    cross_sells_total = 0,
    cross_sells_offset = 0,
    cross_sells_limit = 10,
    cross_sells_sort = [['position', 'ASC']]


  // LOGIC
  const {preloading, session, page} = stores()

  let errors, inProgress = false

  let formValue = {
    offer_uuid: offer_uuid,
    // variant_uuid
    quantity: 1
  }

  let title = offer && offer.title ? offer.title : 'Shop'
  let description = offer ? offer.description_seo || offer.description : 'Offer'
  let tags = offer ? offer.tags : 'offer'

  let inCart
  $:
  {
    // inCart = $session.cart
    //         && $session.cart.items
    //         && ($session.cart.items || []).find(i => i.offer_uuid === offer_uuid)
    console.log('brk session inCart', $session && $session.cart ? $session.cart.items : null)
  }

  async function addItemToCart(item) {
    // Disable Buttons
    inProgress = true

    return post(`auth/session/cart/items`, item, {}, $session.token, $session.session_uuid)
      .then(response => {
        console.log('brk response!', response)

        // Re-enable Buttons
        inProgress = false

        if (response.errors || response.error) {
          errors = response.errors ? response.errors : [response.error]
        }

        // Create a placeholder for the current session values
        const sessionValues = {
          ...$session
        }

        // If the request returned a session_uuid, update the local session.session_uuid
        if (response.session_uuid || response.session) {
          sessionValues.session_uuid = response.session_uuid || response.session
        }
        // If the request returned a token, update the local session.token
        if (response.token) {
          sessionValues.token = response.token
        }
        // If the request returned the full cart, update the local session.cart
        if (response.cart) {
          sessionValues.cart = response.cart
        }
        // Update the Session Store
        session.set(sessionValues)

        // If this returned the new cart item(s), then redirect to the cart view
        if (response.data) {
          return goto(`/cart?offer_uuid=${offer_uuid}`)
        } else {
          return response
        }
      })
      .catch(err => {
        // Re-enable Buttons
        inProgress = false
        errors = err
        return err
      })
  }

  async function listCrossSells() {
    cross_sells_loading = true
    return crossSellsReq(
      $session.session_uuid,
      $session.token,
      offer_uuid,
      cross_sells_query
    )
    .then(res => {
      cross_sells_loading = false
      cross_sells = res.data
      cross_sells_limit = res.limit
      cross_sells_offset = res.offset
      cross_sells_total = res.total
      cross_sells_sort = res.sort

      return res
    })
    .catch(err => {
      cross_sells_loading = false
      cross_sells_errors = err
    })
  }

  onMount(async () => {
    return Promise.all([
      listCrossSells()
    ])
  })

</script>

<style type="text/scss">
  @import "../../../theme/variables";

  /*********************************
  5. Single Offer
  *********************************/

  .offer {
    padding-top: 80px;
    padding-bottom: 139px;
  }

</style>

<svelte:head>
  <title>{ title }</title>
  <meta name="description" content="{ description }">
  <meta name="keywords" content="{ tags }">
</svelte:head>

<!-- Single Offer -->
<Header { offer } />
<div class="offer">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <Gallery { offer } />
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="product_name mb-2">
           <h1>{ title }</h1>
        </div>
        <div class="product_price mb-2">
          <h3>
            {#if offer.price_compare_at > offer.total_price_calculated}
              <strike>
                <Currency price="{ offer.price_compare_at }" currency="{offer.currency}" />
              </strike>
            {/if}
            <Currency price={ offer.price_channel } currency={ offer.currency }/>
          </h3>
        </div>
        <!-- <div class="product_category"> // placed below
          <small class="text-muted text-uppercase">
            { offer.type || 'uncategorized' }
          </small>
        </div> -->
        <div class="product_except mb-2">
          <small class="text-muted">
            {@html offer.excerpt_html || '' }
          </small>
        </div>
        <div class="product_stock mb-2">
            <span class="text-muted">In Stock:</span> { offer.inventory_quantity || 0 }
        </div>

        <div class="product_description mb-2">
          {@html offer.description || '' }
        </div>

        <div class="product_form mb-2">
          <OfferForm
            {offer}
            {errors}
            value={ formValue }
            preloading={ $preloading }
            { inProgress }
            on:addItem={(e=> addItemToCart(e.detail))}
          />
        </div>

        <div class="product_specs mb-2">
          <ul class="list-group">
            <li class="list-group-item">
              SKU: { offer.variant_sku || 'Select One' }
            </li>
            <li class="list-group-item">
              Categories: <small class="text-muted text-uppercase"> { offer.type || 'uncategorized' } </small>
            </li>
            <li class="list-group-item">
              Tags: { offer.tags }
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm-12">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Additional Information</Tab>
            <Tab>Reviews (0)</Tab>
          </TabList>

          <TabPanel>
            <div class="mt-2 mb-2">
            {@html offer.body_html || '' }
            </div>
          </TabPanel>
          <TabPanel>
            <div class="mt-2 mb-2">
            {@html offer.excerpt_html || '' }
            </div>
          </TabPanel>
          <TabPanel>
            <div class="mt-5 mb-2">
              <div class="text-center text-muted">
                <h5>No Reviews Yet...</h5>
                <p>
                  Become a verified customer to leave a review!
                </p>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <Related
          {offer}
          {cross_sells_query}
          {cross_sells_loading}
          {cross_sells}
          {cross_sells_total}
          {cross_sells_offset}
          {cross_sells_limit}
          {cross_sells_errors}
        ></Related>
      </div>
    </div>
  </div>
</div>
