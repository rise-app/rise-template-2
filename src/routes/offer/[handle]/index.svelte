<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    const {handle} = params

    // Fixes deep nested objects
    let variants_query = riseQuery(pluckQuery(query, 'vq'))

    const offerReq = async (_handle) => {
      if (_handle) {
        return rise.channelPublicOffer.getByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          }
        })
      } else {
        return Promise.resolve()
      }
    }

    const variantsReq = async (_handle) => {
      if (_handle) {
        return rise.channelPublicOfferVariant.listVariantsByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          },
          query: riseQuery(variants_query)
        })
      } else {
        Promise.resolve()
      }
    }


    return Promise.all([
      offerReq(handle),
      variantsReq(handle)
    ])
      .then(([
         offer = {},
         variants = {}
       ]) => {
        return {
          offer: offer.data,

          variants_query,
          variants: variants.data,
          variants_total: variants.total,
          variants_offset: variants.offset,
          variants_limit: variants.limit,
        }
      })
      .catch(err => {
        return this.error(err)
      })
  }

</script>

<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import { post } from 'utils'

  // COMPONENTS
  import { Tab, TabList, TabPanel, Tabs } from '../../_components/Tabs'
  import Currency from '../../_components/Currency.svelte'
  import OfferForm from './_components/OfferForm.svelte'
  import Gallery from './_components/Gallery.svelte'


  // IMPORTS
  export let
    offer = {},
    variants_query = {},
    variants = [],
    variants_total = 0,
    variants_offset = 0,
    variants_limit = 10


  // LOGIC
  const { preloading, session, page } = stores()

  let errors, inProgress = false

  let formValue = {
    offer_uuid: offer.offer_uuid,
    // variant_uuid
    quantity: 1
  }

  $: inCart = $session.cart && $session.cart.items && $session.cart.items.find(i => i.offer_uuid === offer.offer_uuid)

  async function addItemToCart(item) {
    //
    inProgress = true

    return post(`auth/session/cart/items`, item)
      .then(response => {
        console.log('brk response!', response)

        inProgress = false

        if (response.errors || response.error) {
          errors = response.errors ? response.errors : [response.error]
        }


        if (response.data) {
          return goto('/cart')
        }
        else {
          return response
        }

        return response
      })
      .catch(err => {
        inProgress = false
        errors = err
        return err
      })
  }

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
  <title>{ offer.title }</title>
</svelte:head>

<!-- Single Offer -->
<div class="offer">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <Gallery { offer } />
      </div>
      <div class="col-sm-12 col-md-6">

        <div class="product_category">
          <small class="text-muted text-uppercase">
            { offer.type || 'uncategorized' }
          </small>
        </div>
        <div class="product_name mb-2">
          <h1>
            { offer.title || 'Untitled' }
          </h1>
        </div>
        <div class="product_price mb-2">
          <Currency price={ offer.price_channel } currency={ offer.currency }/>
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
              Categories: NA
            </li>
            <li class="list-group-item">
              Tags: { offer.tags }
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
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
            <div class="mt-2 mb-2">
              <div class="text-muted">
                <h2>No Reviews Yet...</h2>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  </div>
</div>
