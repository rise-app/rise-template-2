<script>
  export let
    campaign = {}

</script>
<style type="text/scss">
  @import "../../../theme/variables";

  h5 {
    z-index: 1;
    text-transform: uppercase;
    border-bottom: 1px solid $card-border-color;
    margin: 0px;
    line-height: 3rem;
    font-weight: 700;
  }

  .header {
    border-bottom: 1px solid $card-border-color;
    line-height: 3rem;
    font-weight: 700;
  }

</style>

<div class="row mt-5 mb-5">
  <div class="col-12">
    <div class="header d-flex justify-content-between">
      <h5>
        { campaign.title || 'Featured'}
      </h5>
      <a href="/shop/{campaign.collection_handle || campaign.handle}">
        Browse All
        &nbsp;
        <i class="fa fa-chevron-right"></i>
      </a>
    </div>
  </div>
</div>
