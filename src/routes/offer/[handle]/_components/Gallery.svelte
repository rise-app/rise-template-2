<script>
  import ImageLoader from '../../../_components/ImageLoader.svelte'

  export let offer = {}

  let image = offer && offer.image_primary ? offer.image_primary : {}

</script>

<style type="text/scss">
  @import "../../../../theme/variables";
</style>

<ImageLoader src={image.src} alt={offer.title} width="100%"/>
