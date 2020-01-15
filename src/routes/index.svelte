<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  export async function preload({params, query}, {user, token, session_uuid}) {

    let featured_query = riseQuery(pluckQuery(query, 'fq'))
    let on_sale_query = riseQuery(pluckQuery(query, 'osq'))
    let best_rated_query = riseQuery(pluckQuery(query, 'brq'))
    let deals_of_the_week_query = riseQuery(pluckQuery(query, 'dotwq'))
    let popular_categories_query = riseQuery(pluckQuery(query, 'pcq'))
    let hot_new_arrivals_query = riseQuery(pluckQuery(query, 'hnaq'))
    let hot_new_arrivals_featured_query = riseQuery(pluckQuery(query, 'hnafq'))
    let hot_best_sellers_query = riseQuery(pluckQuery(query, 'hbsq'))
    let hot_best_sellers_featured_query = riseQuery(pluckQuery(query, 'hbsfq'))
    let trending_sellers_query = riseQuery(pluckQuery(query, 'tsq'))
    let brands_query = riseQuery(pluckQuery(query, 'bq'))

    let offer_attributes = [
      'offer_uuid',
      'title',
      'description',
      'handle',
      'price_channel',
      'total_price_calculated',
      'image_primary',
      'tags',
      'options'
    ]

    let campaign_attributes = [
      'collection_uuid',
      'title',
      'description',
      'handle',
      'image_primary'
    ]

    const featuredReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.featured_handle
      },
      query: riseQuery({
        ...featured_query,
        attributes: offer_attributes
      })
    })

    const onSaleReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.on_sale_handle
      },
      query: riseQuery({
        ...on_sale_query,
        attributes: offer_attributes
      })
    })

    const bestRatedReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.best_rated_handle
      },
      query: riseQuery({
        ...best_rated_query,
        attributes: offer_attributes
      })
    })

    const dealsOfTheWeekReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.deals_of_the_week_handle
      },
      query: riseQuery({
        ...deals_of_the_week_query,
        attributes: offer_attributes
      })
    })

    const popularCategoriesReq = async() => rise.channelPublicCampaign.listChildrenByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.popular_categories_handle
      },
      query: riseQuery({
        ...popular_categories_query,
        attributes: campaign_attributes
      })
    })

    const hotNewArrivalsReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.hot_new_arrivals_handle
      },
      query: riseQuery({
        ...hot_new_arrivals_query,
        attributes: offer_attributes
      })
    })

    const hotNewArrivalsFeaturedReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.hot_new_arrivals_featured_handle
      },
      query: riseQuery({
        ...hot_new_arrivals_featured_query,
        attributes: offer_attributes
      })
    })

    const hotBestSellersReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.hot_best_sellers_handle
      },
      query: riseQuery({
        ...hot_best_sellers_query,
        attributes: offer_attributes
      })
    })

    const hotBestSellersFeaturedReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.hot_best_sellers_featured_handle
      },
      query: riseQuery({
        ...hot_best_sellers_featured_query,
        attributes: offer_attributes
      })
    })

    const trendingSellersReq = async() => rise.channelPublicCampaign.listOffersByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.trending_sellers_handle
      },
      query: riseQuery({
        ...trending_sellers_query,
        attributes: offer_attributes
      })
    })

    const brandsReq = async() => rise.channelPublicCampaign.listChildrenByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.brands_handle
      },
      query: riseQuery({
        ...brands_query,
        attributes: campaign_attributes
      })
    })

    return Promise.all([
      featuredReq(),
      Promise.resolve(), // onSaleReq(),
      Promise.resolve(), // bestRatedReq(),
      Promise.resolve(), // dealsOfTheWeekReq(),
      Promise.resolve(), // popularCategoriesReq(),
      Promise.resolve(), // hotNewArrivalsReq(),
      Promise.resolve(), // hotBestSellersReq(),
      Promise.resolve(), // trendingSellersReq(),
      brandsReq()
    ])
      .then(([
        featured_offers = {},
        on_sale_offers = {},
        best_rated_offers = {},
        deals_of_the_week_offers = {},
        popular_categories_campaigns = {},
        hot_new_arrivals_offers = {},
        hot_best_sellers_offers = {},
        trending_sellers_offers = {},
        brands_campaigns = {}
      ]) => {

        return {
          featured_query,
          featured_offers: featured_offers.data,
          featured_offers_total: featured_offers.total,
          featured_offers_offset: featured_offers.offset,
          featured_offers_limit: featured_offers.limit,

          on_sale_query,
          on_sale_offers: on_sale_offers.data,
          on_sale_offers_total: on_sale_offers.total,
          on_sale_offers_offset: on_sale_offers.offset,
          on_sale_offers_limit: on_sale_offers.limit,

          best_rated_query,
          best_rated_offers: best_rated_offers.data,
          best_rated_offers_total: best_rated_offers.total,
          best_rated_offers_offset: best_rated_offers.offset,
          best_rated_offers_limit: best_rated_offers.limit,

          deals_of_the_week_query,
          deals_of_the_week_offers: deals_of_the_week_offers.data,
          deals_of_the_week_offers_total: deals_of_the_week_offers.total,
          deals_of_the_week_offers_offset: deals_of_the_week_offers.offset,
          deals_of_the_week_offers_limit: deals_of_the_week_offers.limit,

          popular_categories_query,
          popular_categories_campaigns: popular_categories_campaigns.data,
          popular_categories_campaigns_total: popular_categories_campaigns.total,
          popular_categories_campaigns_offset: popular_categories_campaigns.offset,
          popular_categories_campaigns_limit: popular_categories_campaigns.limit,

          hot_new_arrivals_query,
          hot_new_arrivals_offers: hot_new_arrivals_offers.data,
          hot_new_arrivals_offers_total: hot_new_arrivals_offers.total,
          hot_new_arrivals_offers_offset: hot_new_arrivals_offers.offset,
          hot_new_arrivals_offers_limit: hot_new_arrivals_offers.limit,

          hot_new_arrivals_featured_query,

          hot_best_sellers_query,
          hot_best_sellers_offers: hot_best_sellers_offers.data,
          hot_best_sellers_offers_total: hot_best_sellers_offers.total,
          hot_best_sellers_offers_offset: hot_best_sellers_offers.offset,
          hot_best_sellers_offers_limit: hot_best_sellers_offers.limit,

          hot_best_sellers_featured_query,

          trending_sellers_query,
          trending_sellers_offers: trending_sellers_offers.data,
          trending_sellers_offers_total: trending_sellers_offers.total,
          trending_sellers_offers_offset: trending_sellers_offers.offset,
          trending_sellers_offers_limit: trending_sellers_offers.limit,

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
  // IMPORTS
  import { goto, stores } from '@sapper/app'

  // COMPONENTS
  import RecentlyViewed from './_components/RecentlyViewed.svelte'
  import Brands from './_components/Brands.svelte'
  import Newsletter from './_components/Newsletter.svelte'
  import Reviews from './_components/Reviews.svelte'
  import Trends from './_components/Trends.svelte'
  import Adverts from './_components/Adverts.svelte'
  import BestSellers from './_components/BestSellers.svelte'
  import HotArrivals from './_components/HotArrivals.svelte'
  import PopularCampaigns from './_components/PopularCampaigns.svelte'
  import DealsOfTheWeek from './_components/DealsOfTheWeek.svelte'
  import Characteristics from './_components/Characteristics.svelte'
  import BannerOne from './_components/banners/BannerOne.svelte'
  import BannerTwo from './_components/banners/BannerTwo.svelte'



  export let featured_query,
    featured_offers,
    featured_offers_total,
    featured_offers_offset,
    featured_offers_limit,

    on_sale_query,
    // on_sale_offers,
    // on_sale_offers_total,
    // on_sale_offers_offset,
    // on_sale_offers_limit,

    best_rated_query,
    // best_rated_offers,
    // best_rated_offers_total,
    // best_rated_offers_offset,
    // best_rated_offers_limit,

    deals_of_the_week_query,
    deals_of_the_week_offers,
    deals_of_the_week_offers_total,
    deals_of_the_week_offers_offset,
    deals_of_the_week_offers_limit,

    popular_categories_query,
    popular_categories_campaigns,
    popular_categories_campaigns_total,
    popular_categories_campaigns_offset,
    popular_categories_campaigns_limit,

    hot_new_arrivals_query,
    hot_new_arrivals_offers,
    hot_new_arrivals_offers_total,
    hot_new_arrivals_offers_offset,
    hot_new_arrivals_offers_limit,

    hot_new_arrivals_featured_query,

    hot_best_sellers_query,
    hot_best_sellers_offers,
    hot_best_sellers_offers_total,
    hot_best_sellers_offers_offset,
    hot_best_sellers_offers_limit,

    hot_best_sellers_featured_query,

    trending_sellers_query,
    trending_sellers_offers,
    trending_sellers_offers_total,
    trending_sellers_offers_offset,
    trending_sellers_offers_limit,

    brands_query,
    brands_campaigns,
    brands_campaigns_total,
    brands_campaigns_offset,
    brands_campaigns_limit

  // LOGIC

  const { session } = stores()

</script>

<style type="text/scss">

</style>

<svelte:head>
  <title>RiSE Template</title>
</svelte:head>

<!--<BannerOne></BannerOne>-->

<!--<Characteristics></Characteristics>-->

<DealsOfTheWeek
  {deals_of_the_week_query}
  {deals_of_the_week_offers}
  {deals_of_the_week_offers_limit}
  {deals_of_the_week_offers_offset}
  {deals_of_the_week_offers_total}

  {featured_query}
  {featured_offers}
  {featured_offers_limit}
  {featured_offers_offset}
  {featured_offers_total}

  {on_sale_query}

  {best_rated_query}

></DealsOfTheWeek>

<!--<PopularCampaigns-->
<!--  {popular_categories_query}-->
<!--  {popular_categories_campaigns}-->
<!--  {popular_categories_campaigns_limit}-->
<!--  {popular_categories_campaigns_offset}-->
<!--  {popular_categories_campaigns_total}-->
<!--&gt;</PopularCampaigns>-->

<!--<BannerTwo></BannerTwo>-->

<!--<HotArrivals-->
<!--  {hot_new_arrivals_query}-->
<!--  {hot_new_arrivals_featured_query}-->
<!--  {hot_new_arrivals_offers}-->
<!--  {hot_new_arrivals_offers_limit}-->
<!--  {hot_new_arrivals_offers_offset}-->
<!--  {hot_new_arrivals_offers_total}-->
<!--&gt;</HotArrivals>-->

<!--<BestSellers-->
<!--  {hot_best_sellers_query}-->
<!--  {hot_best_sellers_featured_query}-->
<!--  {hot_best_sellers_offers}-->
<!--  {hot_best_sellers_offers_limit}-->
<!--  {hot_best_sellers_offers_offset}-->
<!--  {hot_best_sellers_offers_total}-->
<!--&gt;</BestSellers>-->

<!--<Adverts></Adverts>-->

<!--<Trends-->
<!--  {trending_sellers_query}-->
<!--  {trending_sellers_offers}-->
<!--  {trending_sellers_offers_limit}-->
<!--  {trending_sellers_offers_offset}-->
<!--  {trending_sellers_offers_total}-->
<!--&gt;</Trends>-->

<!--<Reviews></Reviews>-->

<!--<RecentlyViewed></RecentlyViewed>-->

<!--<Brands-->
<!--  {brands_query}-->
<!--  {brands_campaigns}-->
<!--  {brands_campaigns_total}-->
<!--  {brands_campaigns_offset}-->
<!--  {brands_campaigns_limit}-->
<!--&gt;</Brands>-->

<Newsletter></Newsletter>
