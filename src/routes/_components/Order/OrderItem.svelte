<script>
  import Currency from '../Currency.svelte'
  import ImageLoader from '../ImageLoader.svelte'

  export let item = {}

  let image = item.image_primary ? item.image_primary : {}
</script>

<style type="text/scss">
  @import "../../../theme/variables";

  .order_item
  {
    width: 100%;
    padding: 15px;
    padding-right: 46px;
  }
  .order_item_image
  {
    width: 133px;
    height: 133px;
    float: left;
  }
  .order_item_image img
  {
    max-width: 100%;
  }
  .order_item_info
  {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px;
  }
  .order_item_name
  {
    margin-left: 7.53%;
  }
  .order_item_title
  {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .order_item_text
  {
    font-size: 18px;
    margin-top: 35px;
  }
  .order_item_text span
  {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 11px;
    -webkit-transform: translateY(4px);
    -moz-transform: translateY(4px);
    -ms-transform: translateY(4px);
    -o-transform: translateY(4px);
    transform: translateY(4px);
  }
  .order_item_price
  {
    text-align: right;
  }
  .order_item_total
  {
    text-align: right;
  }
</style>


<div class="list-group-item order_item clearfix">
  <div class="order_item_image">
    <ImageLoader
            src={image.src}
            alt="{item.variant_sku}"
            width="100%"
    />
  </div>
  <div class="order_item_info d-flex flex-md-row flex-column justify-content-between">
    <div class="order_item_name order_info_col">
      <div class="order_item_title">Name</div>
      <div class="order_item_text">
        { item.variant_title || item.offer_title }
      </div>
      <div class="order_item_subtext">
        { item.variant_sku || item.sku }
      </div>
    </div>
    <div class="order_item_color order_info_col">
      <!-- TODO SHOW OPTIONS -->
      <!--      <div class="order_item_title">Color</div>-->
      <!--      <div class="order_item_text">-->
      <!--        <span style="background-color:#999999;"></span>Silver-->
      <!--      </div>-->
    </div>
    <div class="order_item_quantity order_info_col">
      <div class="order_item_title">Quantity</div>
      <div class="order_item_text">
        { item.quantity || 0 }
      </div>
    </div>
    <div class="order_item_price order_info_col">
      <div class="order_item_title">Price</div>
      <div class="order_item_text">
        <Currency
          price={item.price_per_unit}
          currency={item.currency}
        />
      </div>
    </div>
    <div class="order_item_total order_info_col">
      <div class="order_item_title">Total</div>
      <div class="order_item_text">
        <Currency
          price={item.price_total}
          currency={item.currency}
        />
      </div>
    </div>
  </div>
</div>
