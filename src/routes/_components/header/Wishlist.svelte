<script>
  export let wishlist = {}
</script>
<style type="text/scss">
  @import "../../../theme/variables";

</style>

{#if wishlist.total_item > 0 }
<span class="">{wishlist.total_item}</span>
{/if}
<i class="fa fa-heart" />
