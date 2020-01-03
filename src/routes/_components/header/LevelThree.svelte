<script>
  // MODULES
  import { layout } from 'config'

  // COMPONENTS
  import Categories from './Categories.svelte'

  // IMPORTS
  export let
    segment,
    primary_navigation_campaigns = []

  // LOGIC

</script>
<style type="text/scss">
  @import "../../../theme/variables";
  .header-level--3 {
    background: lighten(theme-color('primary'), 4);
    color: $navbar-dark-color !important;
  }
</style>
<div class="header-level--3">
  <div class="container">
    <Categories {primary_navigation_campaigns }></Categories>
  </div>
</div>
