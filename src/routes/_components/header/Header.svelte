<script>
  // MODULES
  import { layout } from 'config'
  import { goto } from '@sapper/app'

  // COMPONENTS
  import Search from './Search.svelte'
  import Currency from '../Currency.svelte'
  import Categories from './Categories.svelte'
  import Cart from './Cart.svelte'
  import Wishlist from './Wishlist.svelte'
  import LevelOne from './LevelOne.svelte'
  import LevelThree from './LevelThree.svelte'
  import LevelTwo from './LevelTwo.svelte'

  // IMPORTS
  export let
    segment,
    brand = {},
    user = {},
    cart = {},
    wishlist = {},
    customer = {},
    primary_navigation_campaigns = [],
    preloading = false,
    path = ''

  // LOGIC

  async function search(_term) {
    return goto(`/shop?oq_term=${_term}`)
  }

  async function goToCampaign(_campaign) {
    return goto(`/shop/${_campaign}`)
  }

</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>

<!-- Header -->

<header class="header">
  <LevelOne />
  <LevelTwo
    {segment}
    {brand}
    {primary_navigation_campaigns}
    {customer}
    {user}
    {cart}
    {wishlist}
    {preloading}
    {path}
    on:search={e=> search(e.detail)}
    on:goToCampaign={e=> goToCampaign(e.detail)}
  />
  <LevelThree
    {segment}
    {primary_navigation_campaigns}
  />
</header>
