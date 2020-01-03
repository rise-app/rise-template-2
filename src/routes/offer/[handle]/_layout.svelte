<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    return {}
  }

</script>
<script>
  import Newsletter from '../../_components/Newsletter.svelte'
  import RecentlyViewed from '../../_components/RecentlyViewed.svelte'
  import Brands from '../../_components/Brands.svelte'
</script>

<slot></slot>

<!--<RecentlyViewed />-->
<!--<Brands />-->
<Newsletter />
