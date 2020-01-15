<script>
  export let cart = {}

  let totalItems
  $: totalItems = cart ? cart.total_items : 0
</script>
<style type="text/scss">
  @import "../../../theme/variables";

  .cart {
    position: relative;
  }
  .total_items {
    color: $white;
    background: theme-color('danger');
    position: absolute;

    font-size: 10px;
    width: 20px;
    height: 20px;
    line-height: 20px;

    top: -10px;
    right: -10px;

    border-top-left-radius: 99px;
    border-top-right-radius: 99px;
    border-bottom-right-radius: 99px;
    border-bottom-left-radius: 99px;

    -webkit-border-top-left-radius: 99px;
    -webkit-border-top-right-radius: 99px;
    -webkit-border-bottom-right-radius: 99px;
    -webkit-border-bottom-left-radius: 99px;

    -moz-border-top-left-radius: 99px;
    -moz-border-top-right-radius: 99px;
    -moz-border-bottom-right-radius: 99px;
    -moz-border-bottom-left-radius: 99px;
  }
</style>
<div class="cart">
{#if totalItems > 0 }
<span class="total_items">{ totalItems }</span>
{/if}
<i class="fa fa-shopping-cart" />
</div>
