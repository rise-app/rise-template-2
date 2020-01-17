<script>
  import OfferItem from '../OfferItem/OfferItem.svelte'
  import BlockHeader from './BlockHeader.svelte'

  export let
    offer = {},
    cross_sells_query = {},
    cross_sells_offers = [],
    cross_sells_offers_total = 0,
    cross_sells_offers_offset = 0,
    cross_sells_offers_limit = 10

</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>
<div class="container">
  <BlockHeader campaign={{ title: 'Related' }} showAll="{false}"></BlockHeader>
  <div class="row mt-5 mb-5">
  {#each cross_sells_offers as offer, i (offer.offer_uuid)}
    <div class="col-4" >
      <OfferItem {offer} />
    </div>
  {:else}
    <slot name="empty">
    <div class="col-12 text-center text-muted" >
      <h5>No Related Offers</h5>
      <p>This offer is pretty unique!</p>
    </div>
    </slot>
  {/each}
  </div>
</div>
