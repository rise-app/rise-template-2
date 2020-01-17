<script>
  import BlockHeader from './BlockHeader.svelte'
  import { OfferItem } from '../OfferItem'

  export let
    offer = {},
    recent_query = {},
    recent_offers = [],
    recent_offers_total = 0,
    recent_offers_offset = 0,
    recent_offers_limit = 10

</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>
<div class="container">
  <BlockHeader campaign={{ title: 'Recently Viewed' }} showAll="{false}"></BlockHeader>
  <div class="row mt-5 mb-5">
    {#each recent_offers as offer, i (offer.offer_uuid)}
      <div class="col-4" >
        <OfferItem {offer} />
      </div>
    {:else}
      <slot name="empty">
        <div class="col-12 text-center text-muted" >
          <h5>No Recent Activity</h5>
          <p>We're having trouble finding your recently viewed offers...</p>
        </div>
      </slot>
    {/each}
  </div>
</div>
