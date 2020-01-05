<script>
  // COMPONENTS
  import Currency from '../Currency.svelte'
  import { OrderItem } from './index'

  // IMPORTS
  export let order = {}, items = []

  // LOGIC

</script>
<style type="text/scss">
  @import "../../../theme/variables";


  .order_items
  {
    margin-top: 67px;
  }
  .order_list
  {
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
  }
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
  .order_total
  {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-right: 46px;
    padding-left: 15px;
  }
  .order_total_title
  {
    display: inline-block;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
    line-height: 60px;
  }
  .order_total_amount
  {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    margin-left: 26px;
    line-height: 60px;
  }
  .order_buttons
  {
    margin-top: 60px;
    text-align: right;
  }
  .order_button_clear
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: rgba(0,0,0,0.5);
    background: #FFFFFF;
    border: solid 1px #b2b2b2;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    margin-right: 26px;
  }
  .order_button_clear:hover
  {
    border-color: #0e8ce4;
    color: #0e8ce4;
  }
  .order_button_checkout
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: #FFFFFF;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    vertical-align: top;
  }

</style>

<!-- Order Items -->
<div class="order_items">
  <div class="list-group order_list">
    {#each items as item, i (item.item_uuid)}
      <OrderItem {item} />
    {:else}
      <div class="list-group-item">
        <div class="text-center mt-5">
          <h2>Order Empty</h2>
          <p>It looks like this list is empty...</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Order Total -->
<div class="order_total">
  <div class="order_total_content text-md-right">
    <div class="order_total_title">Order Total:</div>
    <div class="order_total_amount">
      <Currency
        price={order.total_due}
        currency={order.currency}
      />
    </div>
  </div>
</div>
