<script>
  // COMPONENTS
  import ImageLoader from '../../_components/ImageLoader.svelte'
  import Currency from '../../_components/Currency.svelte'
  import Offer from './Offer.svelte'

  // IMPORTS
  export let
    offers = [],
    offers_query = {},
    offers_total = 0,
    offers_offset = 0,
    offers_limit = 10

  // LOGIC

</script>

<style type="text/scss">

  @import "../../../theme/variables";

  /*********************************
  5.1 Shop Products
  *********************************/

  .product_grid {
    -webkit-transform: translateX(-20px);
    -moz-transform: translateX(-20px);
    -ms-transform: translateX(-20px);
    -o-transform: translateX(-20px);
    transform: translateX(-20px);
    width: calc(100% + 40px);
  }

  .product_grid_border {
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 3px;
    height: 100%;
    background: #FFFFFF;
    z-index: 1;
  }

</style>


<div class="product_grid">
  <div class="product_grid_border"></div>
  {#each offers as offer, i (offer.offer_uuid )}
   <Offer {offer} index={i} />
  {:else}
    <div class="text-center mt-5">
      <h2>List Empty</h2>
      <p>It looks like this list is empty...</p>
    </div>
  {/each}
</div>
