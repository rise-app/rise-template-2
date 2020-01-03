<script>
  // MODULES
  import { rise as riseConfig } from 'config'


  // IMPORTS
  export let
          offers_query = {},
          offers_total = 0,
          offers_offset = 0,
          offers_limit = 10,

          campaign = {},
          ancestors = []

  $: title = campaign && campaign.title ? campaign.title : 'Shop'

</script>

<style type="text/scss">

  @import "../../../theme/variables";

  .header {
    background: darken(theme-color('primary'), 5);
    color: $white;

    h1 {
      font-size: 1.5rem;
    }
  }

  ol.breadcrumb {
    background: transparent;
    color: $white;
    padding: 0px;
    text-transform: uppercase;
    margin: 0px;

    li.breadcrumb-item {
      &::before {
        color: darken($white, 25);
      }
      &.active {
        color: $white;
      }
      a {
        color: $white;
      }
    }
  }

</style>
<div class="header pt-4 pb-4">
  <div class="container">
    <div class="row">
      <div class="col-9">
        <h1>{ title }</h1>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/shop">Home</a>
            </li>
<!--            {#each ancestors as c, i (c.collection_uuid)}-->
<!--              <li class="breadcrumb-item active" aria-current="page">-->
<!--                <a href="/shop/{c.collection_handle || c.handle}">-->
<!--                  { c.title }-->
<!--                </a>-->
<!--              </li>-->
<!--            {/each}-->
            <li class="breadcrumb-item active" aria-current="page">
              { title }
            </li>
          </ol>
        </nav>

      </div>
      <div class="col-3">

      </div>
    </div>
  </div>
</div>
<!--&lt;!&ndash; Shop Sidebar &ndash;&gt;-->
<!--<div class="shop_sidebar">-->
<!--  <div class="sidebar_section">-->
<!--    <div class="sidebar_title">Categories</div>-->
<!--    <ul class="sidebar_categories">-->
<!--      {#each campaigns as campaign, i (campaign.collection_uuid )}-->
<!--        <li>-->
<!--          <a href="/shop/{campaign.collection_handle || campaign.handle }">-->
<!--            { campaign.title }-->
<!--          </a>-->
<!--        </li>-->
<!--      {:else}-->
<!--        <li>-->
<!--          <a href="/shop">-->
<!--            All-->
<!--          </a>-->
<!--        </li>-->
<!--      {/each}-->
<!--    </ul>-->
<!--  </div>-->
<!--  <div class="sidebar_section filter_by_section">-->
<!--    <div class="sidebar_title">Filter By</div>-->
<!--    <div class="sidebar_subtitle">Price</div>-->
<!--    <div class="filter_price">-->
<!--      <div id="slider-range" class="slider_range"></div>-->
<!--      <p>Range: </p>-->
<!--      <p><input type="text" id="amount" class="amount" readonly style="border:0; font-weight:bold;"></p>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="sidebar_section">-->
<!--    &lt;!&ndash;    <div class="sidebar_subtitle color_subtitle">Color</div>&ndash;&gt;-->
<!--    &lt;!&ndash;    <ul class="colors_list">&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #b19c83;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #000000;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #999999;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #0e8ce4;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #df3b3b;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li class="color"><a href="#" style="background: #ffffff; border: solid 1px #e1e1e1;"></a></li>&ndash;&gt;-->
<!--    &lt;!&ndash;    </ul>&ndash;&gt;-->
<!--  </div>-->
<!--  {#if showBrands }-->
<!--    <div class="sidebar_section">-->
<!--      <div class="sidebar_subtitle brands_subtitle">Brands</div>-->
<!--      <ul class="brands_list">-->
<!--        {#each brands_campaigns as campaign, i (campaign.collection_uuid )}-->
<!--          <li>-->
<!--            <a href="/shop/{campaign.collection_handle || campaign.handle }">-->
<!--              { campaign.title }-->
<!--            </a>-->
<!--          </li>-->
<!--        {:else}-->
<!--          <li>-->
<!--            <a href="/shop">-->
<!--              Add Campaigns to "{ riseConfig.brands_handle }"-->
<!--            </a>-->
<!--          </li>-->
<!--        {/each}-->
<!--      </ul>-->
<!--    </div>-->
<!--  {/if}-->
<!--</div>-->
