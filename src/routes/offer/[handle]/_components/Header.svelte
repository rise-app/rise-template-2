<script>
  // MODULES
  import { rise as riseConfig } from 'config'


  // IMPORTS
  export let
    offer = {}
    // ancestors = []

  $: title = offer ? offer.title : 'Untitled Offer'

</script>

<style type="text/scss">

  @import "../../../../theme/variables";

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
