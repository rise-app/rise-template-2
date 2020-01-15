<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'

  // IMPORTS
  export let
    offers_query = {},
    offers_total = 0,
    offers_offset = 0,
    offers_limit = 10

  // LOGIC
  const dispatch = createEventDispatcher()

  function sort(type) {
    dispatch('sort', type)
  }

</script>
<style type="text/scss">

  @import "../../../theme/variables";

  .shop_bar {
    border-bottom: solid 1px #dadada;
    padding-bottom: 14px;
    z-index: 1;
  }

  .shop_product_count {
    font-size: 14px;
    font-weight: 500;
    float: left;
  }

  .shop_product_count span {
    color: #0e8ce4;
  }

  .shop_sorting {
    float: right;
  }

  .shop_sorting span {
    display: inline-block;
    font-weight: 500;
  }

  .shop_sorting > ul {
    display: inline-block;
    position: relative;
    margin-left: 6px;

  }

  .shop_sorting ul li {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    list-style: none;
    text-transform: capitalize;
  }

  .shop_sorting ul li:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  .shop_sorting ul li i {
    display: inline-block;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
    margin-left: 4px;
    vertical-align: middle;
    -webkit-transform: translateY(-1px);
    -moz-transform: translateY(-1px);
    -ms-transform: translateY(-1px);
    -o-transform: translateY(-1px);
    transform: translateY(-1px);
  }

  .shop_sorting ul li ul {
    display: block;
    position: absolute;
    z-index: 100;
    top: calc(100% + 15px);
    right: 0;
    text-align: right;
    background: #FFFFFF;
    width: auto;
    padding-top: 15px;
    padding-left: 0px;
    padding-right: 0px;
    visibility: hidden;
    opacity: 0;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .shop_sorting ul li:hover ul {
    top: 100%;
    visibility: visible;
    opacity: 1;
  }

  .shop_sorting ul li ul li {
    white-space: nowrap;
    padding-right: 13px;
    padding-left: 20px;
    margin-bottom: 5px;
    border-bottom: solid 1px #f2f2f2;
    padding-top: 5px;
    padding-bottom: 9px;
  }

  .shop_sorting ul li ul li:last-child {
    border-bottom: none;
  }

</style>

<!-- Shop Content -->

<div class="shop_bar clearfix">
  <div class="shop_product_count"><span>{offers_total}</span> products found</div>
  <div class="shop_sorting">
    <span>Sort by:</span>
    <ul class="shop_sorting--list">
      <li>
        <span class="sorting_text">highest rated<i class="fas fa-chevron-down"></i></span>
        <ul>
          <li class="shop_sorting_button" on:click={e=> sort(['rating', 'DESC'])}>
            highest rated
          </li>
          <li class="shop_sorting_button" on:click={e=> sort(['name', 'ASC'])}>
            name
          </li>
          <li class="shop_sorting_button" on:click={e=> sort(['price_channel', 'DESC'])}>
            price
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
