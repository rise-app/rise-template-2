<script>
  export let campaign = {}

  let image = campaign && campaign.image_primary
    ? campaign.image_primary.src
    : null

</script>
<style type="text/scss">
  @import "../../../../theme/variables";

  .title {
    height: 100px;
    top: 50%;
    position: absolute;
    width: 100%;
    text-align: center;

    font-size: 2rem;
    font-weight: 700;
  }

  .buttons {
    top: calc(50% + 100px);
    position: absolute;
    width: 100%;
    text-align: center;
  }

</style>

<div class="title">
  { campaign.title }
</div>
<div class="buttons">
  <a
    href="/shop/{campaign.collection_handle || campaign.handle}"
    class="btn btn-primary"
  >
    Shop Now
  </a>
</div>
<img
  class="d-block w-100"
  src="{image}"
  alt="{campaign.title}"
>
