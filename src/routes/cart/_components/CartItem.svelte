<script>
  // MODULES

  import {createEventDispatcher} from 'svelte'

  // COMPONENTS
  import Currency from '../../_components/Currency.svelte'
  import ImageLoader from '../../_components/ImageLoader.svelte'

  // IMPORTS
  export let item = {}, btnsDisabled = false

  // LOGIC
  const dispatch = createEventDispatcher()

  let image = item.image_primary ? item.image_primary : {}


  function remove() {
    dispatch('remove', item)
  }
</script>

<style type="text/scss">
  @import "../../../theme/variables";

  .cart_item
  {
    width: 100%;
    padding: 15px;
    padding-right: 46px;
  }
  .cart_item_image
  {
    width: 133px;
    height: 133px;
    float: left;
  }
  .cart_item_image img
  {
    max-width: 100%;
  }
  .cart_info_col {
    width: 15%;
  }
  .cart_item_info
  {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px;
  }
  .cart_item_name
  {
    margin-left: 7.53%;
    width: calc(100% - 133px);
  }
  .cart_item_title
  {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .cart_item_text
  {
    font-size: 18px;
    margin-top: 35px;
  }
  .cart_item_text span
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
  .cart_item_price
  {
    text-align: left;
  }
  .cart_item_quantity
  {
    text-align: center;
  }
  .cart_item_total
  {
    text-align: right;
  }
  .cart_item_actions
  {
    text-align: right;
  }
</style>


<div class="list-group-item cart_item clearfix">
  <div class="cart_item_image">
    <ImageLoader
      src={image.src}
      alt="{item.variant_sku}"
      width="100%"
    />
  </div>
  <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
    <div class="cart_item_name cart_info_col">
      <div class="cart_item_title">Name</div>
      <div class="cart_item_text">
        <a href="/offer/{ item.offer_handle || item.handle }?sku={item.variant_sku}">
          { item.variant_title || item.offer_title }
        </a>
      </div>
      <div class="cart_item_subtext">
        { item.variant_sku || item.sku }
      </div>
    </div>
    <div class="cart_item_color cart_info_col">
      <!-- TODO SHOW OPTIONS -->
<!--      <div class="cart_item_title">Color</div>-->
<!--      <div class="cart_item_text">-->
<!--        <span style="background-color:#999999;"></span>Silver-->
<!--      </div>-->
    </div>
    <div class="cart_item_price cart_info_col">
      <div class="cart_item_title">Price</div>
      <div class="cart_item_text">
        <Currency
          price={item.price_per_unit}
          currency={item.currency}
        />
      </div>
    </div>
    <div class="cart_item_quantity cart_info_col">
      <div class="cart_item_title">Quantity</div>
      <div class="cart_item_text">
        { item.quantity || 0 }
      </div>
    </div>
    <div class="cart_item_total cart_info_col">
      <div class="cart_item_title">Total</div>
      <div class="cart_item_text">
        <Currency
          price={item.total_price_calculated}
          currency={item.currency}
        />
      </div>
    </div>
    <div class="cart_item_actions cart_info_col">
      <div class="cart_item_title">
        &nbsp;
      </div>
      <button
        class="btn btn-outline-danger"
        on:click={remove}
        aria-label="remove item"
        disabled="{btnsDisabled}"
      >
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</div>
