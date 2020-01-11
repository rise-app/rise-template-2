<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    const { order_uuid } = query

    // Fixes deep nested objects
    let items_query = riseQuery(pluckQuery(query, 'iq'))

    const orderReq = async (_order_uuid) => {
      if (_order_uuid) {
        return rise.channelAuth.getSessionCustomerOrder({}, {
          session: session_uuid,
          token: token,
          params: {
            order_uuid: _order_uuid
          }
        })
      }
      else {
        return Promise.resolve()
      }
    }

    const itemsReq = async (_order_uuid) => {
      if (_order_uuid) {
        return rise.channelAuth.listSessionCustomerOrderItems({}, {
          session: session_uuid,
          token: token,
          params: {
            order_uuid: _order_uuid
          },
          query: items_query
        })
      }
      else {
        return Promise.resolve()
      }
    }


    return Promise.all([
      orderReq(order_uuid),
      itemsReq(order_uuid)
    ])
      .then(([
         order = {},
         items = {}
       ]) => {
        return {
          order: order.data,

          items_query,
          items: items.data,
          items_total: items.total,
          items_offset: items.offset,
          items_limit: items.limit,
        }
      })
      .catch(err => {
        return this.error(err.statusCode || 404, err)
      })
  }

</script>

<script>
  // MODULES
  import { onMount } from 'svelte'
  import Currency from '../../../_components/Currency.svelte'
  import { Order } from '../../../_components/Order'

  // COMPONENTS

  // IMPORTS
  export let order = {}, items = [], items_total = 0, items_offset = 0, items_limit = 10

  // LOGIC

  onMount(() => {
    var end = Date.now() + (3 * 1000);

    var interval = setInterval(function () {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      // window variable
      if (confetti) {
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          shapes: ['square'],
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });
      }
    }, 200);

  })
</script>
<style type="text/scss">
  @import "../../../../theme/variables";

  .order_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }
  .order_title
  {
    font-size: 30px;
    font-weight: 500;
  }
</style>

<svelte:head>
  <title>{ order.name } Confirmation</title>
</svelte:head>

<div class="order_section">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="order_container">
          <div class="order_title">#{order.name} Order Confirmation</div>
          <Order {order} {items} />
        </div>
      </div>
    </div>
  </div>
</div>
