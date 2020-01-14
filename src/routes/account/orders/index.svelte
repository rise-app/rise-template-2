<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery, pageQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    const { handle } = params

    // Fixes deep nested objects
    let orders_query = riseQuery(pluckQuery(query, 'orders'))


    /**
     * Query General Orders or Campaign Orders based on parameters
     * @param _handle
     * @return {Promise<import("../..").RiSEResponse>}
     */
    console.log('BRK orders query', orders_query)
    const ordersReq = async(_handle) => {
      return rise.channelAuth.sessionCustomerOrders({}, {
        session: session_uuid,
        token: token,
        params: {},
        query: riseQuery(orders_query)
      })
    }

    return Promise.all([
      ordersReq(handle)
    ])
      .then(([
         orders = {},
       ]) => {
        return {
          orders_query,
          orders: orders.data,
          orders_total: orders.total,
          orders_offset: orders.offset,
          orders_limit: orders.limit,
        }
      })
      .catch(err => {
        return this.error(err)
      })
  }

</script>

<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import Currency from '../../_components/Currency.svelte'
  import { titlecase } from 'pipes'

  // COMPONENTS

  // IMPORTS

  export let
    orders_query = {},
    orders = [],
    orders_total = 0,
    orders_offset = 0,
    orders_limit = 10

  // LOGIC
  const {preloading, session, page} = stores()

  // subscribed value to path
  $: path = $page.path
  // subscribed value to query
  $: query = $page.query

  /**
   * Go To An Individual Record
   * @param detail
   * @return {boolean}
   */
  function goTo({detail}) {
    const {order_uuid} = detail
    goto(`account/orders/${order_uuid}`)
    return false
  }

  // Table Click Events
  function goToSort({detail}) {
    const _query = sortQuery(orders_query, detail.query)
    goto(`${path}?${_query}`)
    return false
  }

  // Pagination Events
  function goToPage({detail}) {
    const {page} = detail
    const _query = pageQuery(orders_query, page, orders_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

  function nextPage({detail}) {
    const {page} = detail
    const _query = pageQuery(orders_query, page, orders_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

  function prevPage({detail}) {
    const {page} = detail
    const _query = pageQuery(orders_query, page, orders_limit, 'oq')
    goto(`${path}?${_query}`)
    return false
  }

</script>
<style type="text/scss">

  @import "../../../theme/variables";

  .status--open {
    background: $green;
  }
  .status--paid {
    background: $green;
  }
  .status--fulfilled {
    background: $green;
  }
  .status--closed {
    background: $red;
  }
  .status--pending {

  }

</style>

<svelte:head>
  <title>Orders - Account</title>
</svelte:head>

<!-- Shop Slot -->

<div class="list-group">
  {#each orders as order, i (order.order_uuid)}
    <a class="list-group-item list-group-item-action" href="/account/orders/{order.order_uuid}">
      <div class="order">
        <h5>#{order.name}</h5>
        <div class="order_body">
          <p class="">
            <Currency price={order.total_price} currency={order.currency} />
          </p>
        </div>
        <div class="order_status">
          <span class="badge badge-secondary status--{order.status}">
            <i class="fa fa-eye" ></i> { titlecase(order.status) }
          </span>
          <span class="badge badge-secondary status--{order.status_financial}">
            <i class="fa fa-dollar-sign" ></i> { titlecase(order.status_financial) }
          </span>
          <span class="badge badge-secondary status--{order.status_fulfillment}">
            <i class="fa fa-truck" ></i> { titlecase(order.status_fulfillment) }
          </span>
        </div>
      </div>
    </a>
  {:else}
    <div class="list-group-item text-muted text-center">
      <h2>No Orders yet</h2>
      <p class="">Looks like this list is empty...</p>
    </div>
  {/each}
</div>
