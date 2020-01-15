<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    // Fixes deep nested objects
    let primary_navigation_campaigns_query = riseQuery(pluckQuery(query, 'pnq'))

    let campaign_attributes = [
      'collection_uuid',
      'title',
      'description',
      'handle',
      'image_primary'
    ]

    const primaryNavReq = async() => rise.channelPublicCampaign.listDescendantsByHandle({}, {
      session: session_uuid,
      token: token,
      params: {
        handle: riseConfig.primary_navigation_handle
      },
      query: riseQuery({
        ...primary_navigation_campaigns_query,
        attributes: campaign_attributes
      })
    })

    // return rise.channelPublic.get()
    // .then((channel) => { })
    return Promise.all([primaryNavReq()])
      .then(([nav_campaigns]) => {
        console.log('brk nav_campaigns', nav_campaigns)
        return {
          primary_navigation_campaigns_query,
          primary_navigation_campaigns: nav_campaigns.data,
          primary_navigation_campaigns_total: nav_campaigns.total,
          primary_navigation_campaigns_offset: nav_campaigns.offset,
          primary_navigation_campaigns_limit: nav_campaigns.limit
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
  import { onMount, onDestroy } from 'svelte'

  // INCLUDES
  import * as config from 'config'

  // COMPONENTS
  import Header from './_components/header/Header'
  import Footer from './_components/footer/Footer'

  // IMPORTS
  export let segment,
    primary_navigation_campaigns_query = {},
    primary_navigation_campaigns = [],
    primary_navigation_campaigns_total,
    primary_navigation_campaigns_offset,
    primary_navigation_campaigns_limit


  // INCLUDES
  let brand = config.brand

  // LOGIC
  const { preloading, page, session } = stores()

  let path = ''
  $: path = $page.path

  $: if ($session.user) {
    console.log('BRK HELLO USER', $session.user)
  }
  else {
    console.log('BRK HELLO USER 2', $session.user)
  }

  let progress = 50
  preloading.subscribe(value => {
    if (value !== true) {
      progress = 105
    } else {
      progress = 50
    }
  })
</script>

<style global type="text/scss">

  @import "../theme/variables";
  // main {
  //   position: relative;
  //   box-sizing: border-box;
  //   padding-top: 69px;
  //   margin-top: 0px;
  // }

  #progress {
    position: fixed;
    z-index: 2147483647;
    top: 0;
    left: -6px;
    width: 0%;
    height: 4px;
    background: theme-color('primary');
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    border-radius: 1px;
    -moz-transition: width 500ms ease-out, opacity 400ms linear;
    -ms-transition: width 500ms ease-out, opacity 400ms linear;
    -o-transition: width 500ms ease-out, opacity 400ms linear;
    -webkit-transition: width 500ms ease-out, opacity 400ms linear;
    transition: width 500ms ease-out, opacity 400ms linear;
  }
  #progress.done {
    opacity: 0;
  }
  #progress dd,
  #progress dt {
    position: absolute;
    top: 0;
    height: 4px;
    -moz-box-shadow: theme-color('primary') 1px 0 6px 1px;
    -ms-box-shadow: theme-color('primary') 1px 0 6px 1px;
    -webkit-box-shadow: theme-color('primary') 1px 0 6px 1px;
    box-shadow: theme-color('primary') 1px 0 6px 1px;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
  }
  #progress dd {
    opacity: 1;
    width: 20px;
    right: 0;
    clip: rect(-6px, 22px, 14px, 10px);
  }
  #progress dt {
    opacity: 1;
    width: 180px;
    right: -80px;
    clip: rect(-6px, 90px, 14px, -6px);
  }
  @-moz-keyframes pulse {
    30% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-ms-keyframes pulse {
    30% {
      opacity: 0.6;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }
  @-o-keyframes pulse {
    30% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes pulse {
    30% {
      opacity: 0.6;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }
  @keyframes pulse {
    30% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  #progress.waiting dd,
  #progress.waiting dt {
    -moz-animation: pulse 2s ease-out 0s infinite;
    -ms-animation: pulse 2s ease-out 0s infinite;
    -o-animation: pulse 2s ease-out 0s infinite;
    -webkit-animation: pulse 2s ease-out 0s infinite;
    animation: pulse 2s ease-out 0s infinite;
  }
</style>

<div class="super_container">
  <Header
    {segment}
    {brand}
    user={$session.user}
    customer={$session.customer}
    cart={$session.cart}
    {primary_navigation_campaigns}
    preloading={$preloading}
    {path}
  ></Header>
  <main>
    <!--  TODO handle with over time of load-->
    <div id="progress" class="waiting {!$preloading ? 'done' : ''}" style="width:{ progress }%">
      <dt/>
      <dd/>
    </div>

    <slot></slot>
  </main>
  <Footer
    {segment}
    {brand}
    user={$session.user}
    customer={$session.customer}
    cart={$session.cart}
    {primary_navigation_campaigns}
  ></Footer>
</div>
