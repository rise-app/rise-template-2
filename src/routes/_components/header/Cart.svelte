<script>
  export let cart = {}
</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>

{#if cart.total_item > 0 }
<span class="">{cart.total_item}</span>
{/if}
<i class="fa fa-shopping-cart" />
