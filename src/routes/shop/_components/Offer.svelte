<script>
  // COMPONENTS
  import ImageLoader from '../../_components/ImageLoader.svelte'
  import Currency from '../../_components/Currency.svelte'
  import { OfferItem } from '../../_components/OfferItem'

  // IMPORTS
  export let
    offer = {}, index = 0

  // LOGIC
  let image = offer && offer.image_primary ? offer.image_primary : {}
</script>

<style type="text/scss">

  @import "../../../theme/variables";

</style>

<!-- Product Item -->
<div class="item col-sm-6 col-md-4 col-lg-3 mb-2">
  <OfferItem {offer} />
</div>
