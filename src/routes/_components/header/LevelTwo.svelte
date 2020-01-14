<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { debounce } from 'lodash'
  import { layout } from 'config'

  // COMPONENTS

  import Wishlist from './Wishlist.svelte'
  import Cart from './Cart.svelte'

  // IMPORTS
  export let
    segment,
    brand = {},
    user = {},
    cart = {},
    wishlist = {},
    customer = {},
    primary_navigation_campaigns = [],
    preloading = false,
    inProgress = false,
    path = ''


  let selectedCampaign

  // LOGIC
  const dispatch = createEventDispatcher()

  // Creates a debounced search for the input changes
  const debouncedSearch = debounce(search, 450)


  let isLoggedIn = false, term
  // WEIRD SVELTE!
  $: if (user && user.user_uuid) {
    isLoggedIn = !!(user && user.user_uuid)
  }
  else {
    isLoggedIn = !!(user && user.user_uuid)
  }


  let selectWidth = '55px';

  function resizeSelect(event) {
    console.log('EVENT', event)
    // selectWidth = '300px';
  }

  function goToCampaign() {
    dispatch('goToCampaign', selectedCampaign)
  }

  function selected() {
    resizeSelect()
    goToCampaign()
  }

  function search(_term) {
    dispatch('search', _term)
  }


</script>
<style type="text/scss">
  @import "../../../theme/variables";
  .header-level--2 {
    background: $white;

    .relative {
      position: relative;
    }
    i.suffix {
      position: absolute;
      right: 15px;
      top: 13px;
      color: $text-muted;
      z-index: 10;
      font-size: 12px;
      opacity: 0.4;
    }

    nav {
      height: 75px;

      input, select {
        background: $gray-100;
        height: 35px;
        color: rgba(0,0,0,0.4);
      }

      select {
        resize: horizontal;
        width: 55px;
      }
      select:active {
        width: auto;
      }

      select:focus {
        min-width: 150px;
      }

      .search_input::-webkit-input-placeholder {
        font-size: 14px;
        color: rgba(0,0,0,0.4);
      }
      .search_input::-webkit-select-placeholder {
        font-size: 14px;
        color: rgba(0,0,0,0.4);
      }
      .search_input:-moz-placeholder {
        font-size: 14px;
        color: rgba(0,0,0,0.4);
      }
      .search_input::-moz-placeholder {
        font-size: 14px;
        color: rgba(0,0,0,0.4);
      }
      .search_input:-ms-input-placeholder {
        font-size: 14px;
        color: rgba(0,0,0,0.4);
      }
      .search_input::input-placeholder {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.4);
      }
    }

    .navbar-nav {
      .nav-item {
        min-width: 35px;
        text-align: center;
        &:not(:first-child) {
          border-left: 1px solid $gray-200;
          border-right: 1px solid transparent;
        }
        &:last-child {
          .nav-link {
            padding-right: 0px;
          }
        }
      }
    }
  }
</style>

<div class="header-level--2">
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent pl-0 pr-0">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Logo -->
      <a class="navbar-brand" href="/">{brand.name}</a>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <div class="d-flex w-100 justify-content-between">
          <form class="d-flex flex-row my-2 my-lg-0 w-100 pl-2 pr-2">
            <div class="flex-column flex-shrink-0 relative">
              <select
                class="form-control form-control-sm form-control-rounded search_input mr-2" style="width:{selectWidth};"
                bind:value={selectedCampaign}
                on:change={selected}
              >
                <option value="">All</option>
                {#each primary_navigation_campaigns as c, i (c.colllection_uuid)}
                  <option value="{c.collection_handle || c.handle}">{ c.title }</option>
                {/each}
              </select>
              <i class="suffix fa fa-chevron-down" />
            </div>
            <div class="flex-column flex-fill relative">
              <input
                class="form-control form-control-sm form-control-rounded search_input mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                bind:value="{term}"
                on:input="{e=> debouncedSearch(term)}"
              >
              <i class="suffix fa fa-search" />
            </div>
          </form>
          <ul class="navbar-nav mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/wishlist">
                <Wishlist wishlist={wishlist} />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/cart">
                <Cart cart={cart} />
              </a>
            </li>
            {#if isLoggedIn }
              <li class="nav-item">
                <a class="nav-link" href="/account">
                  <i class="fa fa-user" />
                </a>
              </li>
            {:else}
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">
                  Register
                </a>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
