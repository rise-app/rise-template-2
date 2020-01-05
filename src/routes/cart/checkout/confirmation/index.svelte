<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    const order_uuid = query.order_uuid

    // Fixes deep nested objects
    let items_query = riseQuery(pluckQuery(query, 'vq'))

    const orderReq = async (_order_uuid) => {
      if (_order_uuid) {
        return rise.channelAuth.getSessionCustomerOrder({}, {
          session: session_uuid,
          token: token,
          params: {
            order_uuid: _order_uuid
          }
        })
      } else {
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
          query: riseQuery(items_query)
        })
      } else {
        Promise.resolve()
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
        return this.error(err)
      })
  }

</script>

<script>
  // MODULES
  import { onMount } from 'svelte'
  import Currency from '../../../_components/Currency.svelte'

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
  .order_items
  {
    margin-top: 67px;
  }
  .order_list
  {
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
  }
  .order_item
  {
    width: 100%;
    padding: 15px;
    padding-right: 46px;
  }
  .order_item_image
  {
    width: 133px;
    height: 133px;
    float: left;
  }
  .order_item_image img
  {
    max-width: 100%;
  }
  .order_item_info
  {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px;
  }
  .order_item_name
  {
    margin-left: 7.53%;
  }
  .order_item_title
  {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .order_item_text
  {
    font-size: 18px;
    margin-top: 35px;
  }
  .order_item_text span
  {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 11px;
    -webkit-transform: translateY(4px);
    -moz-transform: translateY(4px);
    -ms-transform: translateY(4px);
    -o-transform: translateY(4px);
    transform: translateY(4px);
  }
  .order_item_price
  {
    text-align: right;
  }
  .order_item_total
  {
    text-align: right;
  }
  .order_total
  {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-right: 46px;
    padding-left: 15px;
  }
  .order_total_title
  {
    display: inline-block;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
    line-height: 60px;
  }
  .order_total_amount
  {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    margin-left: 26px;
    line-height: 60px;
  }
  .order_buttons
  {
    margin-top: 60px;
    text-align: right;
  }
  .order_button_clear
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: rgba(0,0,0,0.5);
    background: #FFFFFF;
    border: solid 1px #b2b2b2;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    margin-right: 26px;
  }
  .order_button_clear:hover
  {
    border-color: #0e8ce4;
    color: #0e8ce4;
  }
  .order_button_checkout
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: #FFFFFF;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    vertical-align: top;
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
          <div class="order_items">
            <div class="list-group order_list">
<!--              {#each items as item, i (item.item_uuid)}-->
<!--                <OrderItem {item} />-->
<!--              {:else}-->
<!--                <div class="list-group-item">-->
<!--                  <div class="text-center mt-5">-->
<!--                    <h2>Order Empty</h2>-->
<!--                    <p>It looks like this list is empty...</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              {/each}-->
            </div>
          </div>

          <!-- Order Total -->
          <div class="order_total">
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Order Total:</div>
              <div class="order_total_amount">
                <Currency
                  price={order.total_due}
                  currency={order.currency}
                />
              </div>
            </div>
          </div>

          <div class="order_buttons">

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
