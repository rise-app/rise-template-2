<script>

  // MODULES
  import { createEventDispatcher } from 'svelte'

  // IMPORTS
  export let total = 0, query = {}, query_names = { limit: 'limit', offset: 'offset' }

  // LOGIC

  function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) {
      throw "maxLength must be at least 5"
    }

    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth*2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth*2 - 2) >> 1;
    if (totalPages <= maxLength) {
      // no breaks in list
      return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      // no break on left of page
      return range(1, maxLength-sideWidth-1)
              .concat([0])
              .concat(range(totalPages-sideWidth+1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      // no break on right of page
      return range(1, sideWidth)
              .concat([0])
              .concat(range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    // Breaks on both sides
    return range(1, sideWidth)
            .concat([0])
            .concat(range(page - leftWidth, page + rightWidth))
            .concat([0])
            .concat(range(totalPages-sideWidth+1, totalPages));
  }

  const getPages = function(totalPages) {
    let p = []
    for (let i = 0; i < totalPages; i++) {
      p = [...p, i]
    }
    return p
  }

  const getIndexes = function(curr, pages) {
    let start = Math.max(curr - 4, 0)
    let stop = Math.min(Math.max(curr + 3, 5), pages.length)
    const indexes = pages.slice(start, stop)
    return indexes
  }

  $: limit = query[query_names.limit] || 10
  $: offset = query[query_names.offset] || 0

  $: totalPages = Math.round(Math.max(total/limit, 1))

  $: pages = getPages(totalPages)

  $: currentPage = Math.max(offset/limit, 0) + 1

  $: firstDisabled = (currentPage - 1 <= 0) || totalPages === 0

  $: lastDisabled = (currentPage + 1 > totalPages) || totalPages === 0

  $: pageList = getPageList(totalPages, currentPage, 10)

  // $: showFirstElipse = indexesToShow.pop() > 6
  // $: showLastElipse = indexesToShow.shift() < Math.max(totalPages - 7, 0)

  const dispatch = createEventDispatcher()

  function prevPage(page) {
    dispatch('prevPage', { page })
  }

  function goToPage(page) {
    dispatch('goToPage', { page })
  }

  function nextPage(page) {
    dispatch('nextPage', { page })
  }
</script>

<style type="text/scss">

  @import "../../theme/variables";

  .shop_page_nav {
    width: 100%;
    height: 50px;
    margin-top: 80px;
  }

  .page_prev,
  .page_next {
    width: 50px;
    height: 100%;
    line-height: 50px;
    text-align: center;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    cursor: pointer;
  }

  .page_prev i,
  .page_next i {
    font-size: 12px;
    line-height: 50px;
    text-align: center;
    width: 50px;
    height: 50px;
    color: #e5e5e5;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .page_prev:hover i,
  .page_next:hover i {
    color: #636363;
  }

  .page_nav {
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
    padding: 0px;
    height: 100%;
  }

  .page_nav li {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-right: solid 1px #e5e5e5;
    cursor: pointer;
  }

  .page_nav li a {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .page_nav li:hover a {
    color: $pagination-hover-color;
  }

  .page_nav li:last-child {
    border-right: none;
  }

  .page-item.active {
    background: $pagination-active-bg;
    a {
      color: $pagination-active-color;
    }
  }
</style>

<nav class="shop_page_nav d-flex flex-row justify-content-center">

  <div
    class="page_prev d-flex flex-column align-items-center justify-content-center"
  >
    <a
      class:disabled="{firstDisabled}"
      on:click={e=> prevPage(currentPage - 1)}
    >
      <i class="fas fa-chevron-left"></i>
    </a>
  </div>

  <ul class="page_nav d-flex flex-row">
<!--    {#if showFirstElipse }-->
<!--      <li class="page-item">-->
<!--        <a on:click={e=> goToPage(1)}>...</a>-->
<!--      </li>-->
<!--    {/if}-->
    {#each pageList as page}
      <li class="page-item" class:active="{currentPage === (page)}">
        {#if page === 0}
        <span>...</span>
        {:else}
        <a on:click={e=> goToPage(page)}>{ page }</a>
        {/if}
      </li>
    {/each}
<!--    {#if showLastElipse }-->
<!--      <li class="page-item">-->
<!--        <a on:click={e=> goToPage(totalPages)}>...</a>-->
<!--      </li>-->
<!--    {/if}-->
  </ul>

  <div
    class="page_next d-flex flex-column align-items-center justify-content-center"
  >
    <a on:click={e=> prevPage(currentPage + 1)} class:disabled="{lastDisabled}">
      <i class="fas fa-chevron-right"></i>
    </a>
  </div>
</nav>
