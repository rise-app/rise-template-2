<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'

  // COMPONENTS
  import Pagination from '../../_components/Pagination.svelte'

  // IMPORTS
  export let
    offers_query = {},
    offers_total = 0,
    offers_offset = 0,
    offers_limit = 10

  // LOGIC

  const dispatch = createEventDispatcher()

  function prevPage({detail}) {
    dispatch('prevPage', detail)
  }

  function goToPage({detail}) {
    dispatch('goToPage', detail)
  }

  function nextPage({detail}) {
    dispatch('nextPage', detail)
  }

</script>

<style type="text/scss">

  @import "../../../theme/variables";

</style>

<Pagination
  query={offers_query}
  total={offers_total}
  on:nextPage="{nextPage}"
  on:prevPage="{prevPage}"
  on:goToPage="{goToPage}"
/>
