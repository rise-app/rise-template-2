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
    ancestors = [],
    campaigns_query = {},
    campaigns = [],
    campaigns_total = 0,
    campaigns_offset = 0,
    campaigns_limit = 10,

    brands_query = {},
    brands_campaigns = [],
    brands_campaigns_total = 0,
    brands_campaigns_offset = 0,
    brands_campaigns_limit = 10


  let showBrands = campaign.collection_handle !== riseConfig.brands_handle

</script>

<style type="text/scss">

  @import "../../../theme/variables";

  /*********************************
6. Shop Sidebar
*********************************/

  .shop_sidebar {
    width: 100%;
    -webkit-transform: translateX(-37px);
    -moz-transform: translateX(-37px);
    -ms-transform: translateX(-37px);
    -o-transform: translateX(-37px);
    transform: translateX(-37px);
  }

  .sidebar_title {
    font-size: 18px;
    font-weight: 500;
  }

  .sidebar_categories {
    margin-top: 37px;
  }

  .sidebar_categories li {
    margin-bottom: 7px;
  }

  .sidebar_categories li a {
    color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .sidebar_categories li a:hover {
    color: #0e8ce4;
  }

  .filter_by_section {
    margin-top: 45px;
  }

  .filter_price {
    margin-top: 28px;
  }

  .slider_range {
    max-width: 195px;
  }

  .filter_price p {
    display: inline-block;
    font-size: 12px;
    font-weight: 500 !important;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 0px;
  }

  .sidebar_subtitle {
    font-size: 14px;
    font-weight: 500;
    margin-top: 25px;
  }

  .filter_price p input {
    font-size: 12px;
    font-weight: 500 !important;
    color: rgba(0, 0, 0, 0.5)
  }

  .amount {
    margin-top: 18px;
  }

  .color_subtitle {
    margin-top: 27px;
  }

  .colors_list {
    margin-top: 14px;
  }

  .color {
    display: inline-block;
    margin-right: 6px;
  }

  .color a {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .brands_subtitle {
    margin-top: 27px;
  }

  .brands_list {
    margin-top: 12px;
  }

  .brand {
    margin-bottom: 7px;
  }

  .brand a {
    color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .brand a:hover {
    color: #0e8ce4;
  }

</style>

<!-- Shop Sidebar -->
<div class="shop_sidebar">
  <div class="sidebar_section">
    <div class="sidebar_title">Categories</div>
    <ul class="sidebar_categories">
      {#each campaigns as campaign, i (campaign.collection_uuid )}
      <li>
        <a href="/shop/{campaign.collection_handle || campaign.handle }">
          { campaign.title }
        </a>
      </li>
      {:else}
      <li>
        <a href="/shop">
          All
        </a>
      </li>
      {/each}
    </ul>
  </div>
  <div class="sidebar_section filter_by_section">
    <div class="sidebar_title">Filter By</div>
    <div class="sidebar_subtitle">Price</div>
    <div class="filter_price">
      <div id="slider-range" class="slider_range"></div>
      <p>Range: </p>
      <p><input type="text" id="amount" class="amount" readonly style="border:0; font-weight:bold;"></p>
    </div>
  </div>
  <div class="sidebar_section">
<!--    <div class="sidebar_subtitle color_subtitle">Color</div>-->
<!--    <ul class="colors_list">-->
<!--      <li class="color"><a href="#" style="background: #b19c83;"></a></li>-->
<!--      <li class="color"><a href="#" style="background: #000000;"></a></li>-->
<!--      <li class="color"><a href="#" style="background: #999999;"></a></li>-->
<!--      <li class="color"><a href="#" style="background: #0e8ce4;"></a></li>-->
<!--      <li class="color"><a href="#" style="background: #df3b3b;"></a></li>-->
<!--      <li class="color"><a href="#" style="background: #ffffff; border: solid 1px #e1e1e1;"></a></li>-->
<!--    </ul>-->
  </div>
  {#if showBrands }
  <div class="sidebar_section">
    <div class="sidebar_subtitle brands_subtitle">Brands</div>
    <ul class="brands_list">
      {#each brands_campaigns as campaign, i (campaign.collection_uuid )}
        <li>
          <a href="/shop/{campaign.collection_handle || campaign.handle }">
            { campaign.title }
          </a>
        </li>
      {:else}
        <li>
          <a href="/shop">
            Add Campaigns to "{ riseConfig.brands_handle }"
          </a>
        </li>
      {/each}
    </ul>
  </div>
  {/if}
</div>
