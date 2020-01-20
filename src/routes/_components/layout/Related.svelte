<script>
  import OfferItem from '../OfferItem/OfferItem.svelte'
  import BlockHeader from './BlockHeader.svelte'

  export let
    offer = {},
    cross_sells_query = {},
    cross_sells = [],
    cross_sells_total = 0,
    cross_sells_offset = 0,
    cross_sells_limit = 10,
    cross_sells_loading = false,
    cross_sells_errors = null

</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>
<div class="container">
  <BlockHeader campaign={{ title: 'Related' }} showAll="{false}"></BlockHeader>
  <div class="row mt-5 mb-5">
  {#each cross_sells as offer, i (offer.offer_uuid)}
    <div class="col-4" >
      <OfferItem
        {offer}
      />
    </div>
  {:else}
    {#if cross_sells_loading}
    <div class="col-12 text-center text-muted" >
      <h5>Loading related offers...</h5>
    </div>
    {:else}
    <slot name="empty">
      <div class="col-12 text-center text-muted" >
        <h5>No Related Offers</h5>
        <p>This offer is pretty unique!</p>
      </div>
    </slot>
    {/if}
  {/each}
  </div>
</div>
