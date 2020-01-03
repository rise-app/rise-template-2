<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery, pageQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    const { handle } = params

    // Fixes deep nested objects
    let offers_query = riseQuery(pluckQuery(query, 'oq'))
    let campaigns_query = riseQuery(pluckQuery(query, 'cq'))
    let ancestors_query = riseQuery(pluckQuery(query, 'aq'))
    let brands_query = riseQuery(pluckQuery(query, 'bq'))


    /**
     * Query General Offers or Campaign Offers based on parameters
     * @param _handle
     * @return {Promise<import("../..").RiSEResponse>}
     */
    const offersReq = async(_handle) => {
      if (_handle) {
        return rise.channelPublicCampaign.listOffersByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          },
          query: riseQuery(offers_query)
        })
      }
      else {
        return rise.channelPublicOffer.list({}, {
          session: session_uuid,
          token: token,
          params: {},
          query: riseQuery(offers_query)
        })
      }
    }

    const campaignReq = async(_handle) => {
      if (_handle) {
        return rise.channelPublicCampaign.getByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          }
        })
      }
      else {
        return Promise.resolve()
      }
    }

    const campaignsReq = async(_handle) => {
      if (_handle) {
        return Promise.resolve()
      }
      else {
        return rise.channelPublicCampaign.listChildrenByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: riseConfig.primary_navigation_handle
          }
        })
      }
    }

    const campaignAncestorReq = async(_handle) => {
      if (_handle) {
        return rise.channelPublicCampaign.listAncestorsByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          },
          query: riseQuery(ancestors_query)
        })
      }
      else {
        return Promise.resolve()
      }
    }

    const brandsReq = async(handle) => {
      return rise.channelPublicCampaign.listChildrenByHandle({}, {
        session: session_uuid,
        token: token,
        params: {
          handle: riseConfig.brands_handle
        },
        query: riseQuery(brands_query)
      })
    }

    return Promise.all([
      offersReq(handle),
      campaignsReq(handle),
      campaignReq(handle),
      Promise.resolve(), // campaignAncestorReq(handle),
      brandsReq(handle)
    ])
      .then(([
         offers = {},
         campaigns = {},
         campaign = {},
         ancestors = {},
         brands_campaigns = {}
       ]) => {
        return {
          offers_query,
          offers: offers.data,
          offers_total: offers.total,
          offers_offset: offers.offset,
          offers_limit: offers.limit,

          campaigns_query,
          campaigns: campaigns.data,
          campaigns_total: campaigns.total,
          campaigns_offset: campaigns.offset,
          campaigns_limit: campaigns.limit,

          campaign: campaign.data,
          ancestors: ancestors.data,

          brands_query,
          brands_campaigns: brands_campaigns.data,
          brands_campaigns_total: brands_campaigns.total,
          brands_campaigns_offset: brands_campaigns.offset,
          brands_campaigns_limit: brands_campaigns.limit,
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

  // COMPONENTS
  import RecentlyViewed from '../_components/RecentlyViewed.svelte'
  import Brands from '../_components/Brands.svelte'
  import Newsletter from '../_components/Newsletter.svelte'
  import Sidebar from './_components/Sidebar.svelte'
  import Offers from './_components/Offers.svelte'
  import Sort from './_components/Sort.svelte'
  import Navigation from './_components/Navigation.svelte'
  import Header from './_components/Header.svelte'

  // IMPORTS

  export let
    campaign = {},
    ancestors = [],

    offers_query = {},
    offers = [],
    offers_total = 0,
    offers_offset = 0,
    offers_limit = 10,

    campaigns_query = {},
    campaigns = [],
    campaigns_total = 0,
    campaigns_offset = 0,
    campaigns_limit = 10,

    brands_query = {},
    brands_campaigns = [],
    brands_campaigns_total = 0,
    brands_campaigns_offset = 0,
    brands_campaigns_limit = 10

  // LOGIC

  let title = campaign && campaign.title ? campaign.title : 'Shop'
  let image = campaign && campaign.image_primary ? campaign.image_primary : {}

  // LOGIC
  const {preloading, session, page} = stores()

  // subscribed value to path
  $: path = $page.path
  // subscribed value to query
  $: query = $page.query

  /**
   * Go To An Individual Record
   * @param detail
   * @return {boolean}
   */
  function goTo({detail}) {
    const {collection_handle, handle} = detail
    goto(`shop/${collection_handle || handle}`)
    return false
  }

  // Table Click Events
  function goToSort({detail}) {
    const _query = sortQuery(offers_query, detail.query)
    goto(`${path}?${_query}`)
    return false
  }

  // Pagination Events
  function goToPage({detail}) {
    const {page} = detail
    const _query = pageQuery(offers_query, page, offers_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

  function nextPage({detail}) {
    const {page} = detail
    const _query = pageQuery(offers_query, page, offers_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

  function prevPage({detail}) {
    const {page} = detail
    const _query = pageQuery(offers_query, page, offers_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

</script>
<style type="text/scss">

  @import "../../theme/variables";

  /*********************************
  5. Shop
  *********************************/

  .shop {
    background: #FFFFFF;
    padding-top: 80px;
    padding-bottom: 139px;
  }

  .shop_content {
    width: 100%;
  }

  /*********************************
  7. Recently Viewed
  *********************************/

  .viewed {
    padding-top: 51px;
    padding-bottom: 60px;
    background: #eff6fa;
  }

  .viewed_title_container {
    border-bottom: solid 1px #dadada;
  }

  .viewed_title {
    margin-bottom: 14px;
  }

  .viewed_nav_container {
    position: absolute;
    right: -5px;
    bottom: 14px;
  }

  .viewed_nav {
    display: inline-block;
    cursor: pointer;
  }

  .viewed_nav i {
    color: #dadada;
    font-size: 18px;
    padding: 5px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .viewed_nav:hover i {
    color: #606264;
  }

  .viewed_prev {
    margin-right: 15px;
  }

  .viewed_slider_container {
    padding-top: 50px;
  }

  .viewed_item {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .viewed_image {
    width: 115px;
    height: 115px;
  }

  .viewed_image img {
    display: block;
    max-width: 100%;
  }

  .viewed_content {
    width: 100%;
    margin-top: 25px;
  }

  .viewed_price {
    font-size: 16px;
    color: #000000;
    font-weight: 500;
  }

  .viewed_item.discount .viewed_price {
    color: #df3b3b;
  }

  .viewed_price span {
    position: relative;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 8px;
  }

  .viewed_price span::after {
    display: block;
    position: absolute;
    top: 6px;
    left: -2px;
    width: calc(100% + 4px);
    height: 1px;
    background: #8d8d8d;
    content: '';
  }

  .viewed_name {
    margin-top: 3px;
  }

  .viewed_name a {
    font-size: 14px;
    color: #000000;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .viewed_name a:hover {
    color: #0e8ce4;
  }

  .item_marks {
    position: absolute;
    top: 18px;
    left: 18px;
  }

  .item_mark {
    display: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 500;
    line-height: 36px;
    text-align: center;
  }

  .item_discount {
    background: #df3b3b;
    margin-right: 5px;
  }

  .item_new {
    background: #0e8ce4;
  }

  .viewed_item.discount .item_discount {
    display: inline-block;
  }

  .viewed_item.is_new .item_new {
    display: inline-block;
  }

</style>

<svelte:head>
  <title>{ title }</title>
</svelte:head>

<!-- Shop Slot -->

<Header
  {campaign}
  {ancestors}
  {offers_limit}
  {offers_offset}
  {offers_total}
  {offers_query}
/>

<div class="shop">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <Sidebar
          {campaign}
          {ancestors}
          {campaigns} {campaigns_limit} {campaigns_offset} {campaigns_total} {campaigns_query}
          {brands_query} {brands_campaigns} {brands_campaigns_total} {brands_campaigns_offset} {brands_campaigns_limit}
        />
      </div>
      <div class="col-lg-9">
        <div class="shop_content">
          <Sort {offers_limit} {offers_offset} {offers_total} {offers_query} />
          <Offers {offers} />
          <Navigation
            {offers_limit}
            {offers_offset}
            {offers_total}
            {offers_query}

            on:nextPage="{nextPage}"
            on:prevPage="{prevPage}"
            on:goToPage="{goToPage}"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<!--<RecentlyViewed></RecentlyViewed>-->

<!--<Brands></Brands>-->

<Newsletter></Newsletter>
