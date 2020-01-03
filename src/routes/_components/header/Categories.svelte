<script>
  // MODULES
  import { rise as riseConfig } from 'config'

  // IMPORTS
  export let primary_navigation_campaigns = []

  // LOGIC


  console.log('BRK NAV DESC', primary_navigation_campaigns)

</script>

<style type="text/scss">

  @import "../../../theme/variables";

  .cat_menu_container ul
  {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    visibility: hidden;
    opacity: 0;
    min-width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 10px 25px rgba(0,0,0,0.1);
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: all 0.3s ease;
  }
  .cat_menu_container > ul
  {
    padding-top: 13px;
  }
  .cat_menu_container:hover .cat_menu
  {
    visibility: visible;
    opacity: 1;
  }
  .cat_menu li
  {
    display: block;
    position: relative;
    width: auto;
    height: 48px;
    /*border-bottom: solid 1px #f2f2f2;*/
    /*padding-left: 35px;*/
    /*padding-right: 30px;*/
    white-space: nowrap;
  }
  .cat_menu li.hassubs > a i
  {
    display: block;
  }

  .cat_menu li a
  {
    color: lighten($navbar-dark-color, 95);
    display: block;
    position: relative;
    font-size: 13px;
    font-weight: 400;
    line-height: 46px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      // color: $dropdown-link-hover-color;
      color: $navbar-dark-hover-color;
      background: theme-color('primary');
    }

    i {
      display: none;
      position: absolute;
      top: 50%;
      margin-top: 1px;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: $dropdown-padding-y;
      font-size: 12px;
    }
  }

  .cat_menu li {
    ul {
      min-width: 260px;
      display: block;
      position: absolute;
      top: 100%;
      /*left: 100%;*/
      visibility: hidden;
      opacity: 0;
      width: 100%;
      background: $light;
      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 0px;

      li {
        text-align: left;

        a {
          color: $navbar-light-color;
          padding: $dropdown-item-padding-y $dropdown-item-padding-x;
        }
      }
    }
  }

  .cat_menu li:hover > ul
  {
    /*top: 0;*/
    visibility: visible;
    opacity: 1;
  }
</style>
<!-- Categories Menu -->


  <ul class="cat_menu nav nav-fill">
    {#each primary_navigation_campaigns as c0, i (c0.collection_uuid)}
    <li class="nav-item" class:hassubs={ c0.children && c0.children.length > 0 }>
      <a href="/shop/{c0.collection_handle || c0.handle}">
        {c0.title} <i class="fas fa-chevron-down ml-auto"></i>
      </a>
      {#if c0.children && c0.children.length > 0 }
      <ul>
        {#each c0.children as c1, i (c1.collection_uuid)}
        <li class:hassubs={ c1.children && c1.children.length > 0 }>
          <a href="/shop/{c1.collection_handle || c1.handle}">{c1.title}<i class="fas fa-chevron-right"></i></a>
          {#if c1.children && c1.children.length > 0 }
          <ul>
            {#each c1.children as c2, i (c2.collection_uuid)}
            <li>
              <a href="/shop/{c2.collection_handle || c2.handle}">{c2.title}<i class="fas fa-chevron-right"></i></a>
            </li>
            {/each}
          </ul>
          {/if}
        </li>
        {/each}
      </ul>
      {/if}
    </li>
    {:else}
    <li>
      <span>
        Add campaigns to { riseConfig.primary_navigation_handle}
      </span>
    </li>
    {/each}
  </ul>
