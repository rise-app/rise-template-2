<script>
  import OfferItem from '../OfferItem/OfferItem.svelte'
  import BlockHeader from './BlockHeader.svelte'

  export let
    campaign = {},
    on_sale_query = {},
    on_sale_offers = [],
    on_sale_offers_total = 0,
    on_sale_offers_offset = 0,
    on_sale_offers_limit = 10

</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>
<div class="container">
  <BlockHeader {campaign}></BlockHeader>
  <div class="row mt-5 mb-5">
  {#each on_sale_offers as offer, i (offer.offer_uuid)}
    <div class="col-4" >
      <OfferItem {offer} />
    </div>
  {:else}
    <slot name="empty">
      <div class="col-12 text-center text-muted" >
        <h5>Oppps!</h5>
        <p>Attach offers to "{campaign.collection_handle || campaign.handle}" to display them here</p>
      </div>
    </slot>
  {/each}
  </div>
</div>
