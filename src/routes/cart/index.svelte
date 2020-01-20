<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig, brand } from 'config'
  import { get, put, post, del } from 'utils'

  const cartReq = async (session_uuid, token) => {
    return get(`auth/session/cart`, {}, token, session_uuid)
  }

  const itemsReq = async (session_uuid, token) => {
    return get(`auth/session/cart/items`, {}, token, session_uuid)
  }

  const addItemReq = async (session_uuid, token, body) => {
    return put(`auth/session/cart/items`, body, {}, token, session_uuid)
  }

  const updateItemReq = async (session_uuid, token, item_uuid, body) => {
    return put(`auth/session/cart/items/${item_uuid}`, body, {}, token, session_uuid)
  }

  const removeItemReq = async (session_uuid, token, item_uuid) => {
    return del(`auth/session/cart/items/${item_uuid}`, {}, {}, token, session_uuid)
  }

  const upSellsReq = async (session_uuid, token, offer_uuid, up_sells_query) => {
    if (offer_uuid) {
      return rise.channelPublicOffer.listUpSells({}, {
        session: session_uuid,
        token: token,
        params: {
          offer_uuid: offer_uuid
        },
        query: riseQuery(up_sells_query)
      })
    }
    else {
      return Promise.resolve({})
    }
  }

  const downSellsReq = async (session_uuid, token, offer_uuid, down_sells_query) => {
    if (offer_uuid) {
      return rise.channelPublicOffer.listDownSells({}, {
        session: session_uuid,
        token: token,
        params: {
          offer_uuid: offer_uuid
        },
        query: riseQuery(down_sells_query)
      })
    }
    else {
      return Promise.resolve({})
    }
  }

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    console.log('brk session', session_uuid)
    // Query for Cart Items
    let items_query = riseQuery(pluckQuery(query, 'vq'))

    const {offer_uuid} = query


    return Promise.all([
      Promise.resolve(), // cartReq(session_uuid, token),
      itemsReq(session_uuid, token)
    ])
      .then(([
         cart = {},
         items = {}
       ]) => {
        return {

          session_uuid: items.session || session_uuid,

          cart: items.cart,
          items_query,
          // items: cart.data.items
          items: items.data,
          items_total: items.total,
          items_offset: items.offset,
          items_limit: items.limit,

          offer_uuid
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
  import { onMount } from 'svelte'

  // COMPONENTS
  import Currency from '../_components/Currency'
  import CartItem from './_components/CartItem.svelte'
  import Dialog, { Title, Content, Actions } from '@smui/dialog'
  import OfferItem from '../_components/OfferItem/OfferItem.svelte'


  // IMPORTS
  export let
    session_uuid,
    cart = {},
    cart_loading = false,
    cart_errors = null,

    items = [],
    items_query = {},
    items_loading = false,
    items_errors = null,
    items_total = 0,
    items_offset = 0,
    items_limit = 10,
    items_sort = [['created_at', 'DESC']],

    up_sells_query = {},
    up_sells_loading = false,
    up_sells = [],
    up_sells_errors = null,
    up_sells_total = 0,
    up_sells_offset = 0,
    up_sells_limit = 10,
    up_sells_sort = [['position', 'ASC']],

    down_sells_query = {},
    down_sells_loading = false,
    down_sells = [],
    down_sells_errors = null,
    down_sells_total = 0,
    down_sells_offset = 0,
    down_sells_limit = 10,
    down_sells_sort = [['position', 'ASC']],

    offer_uuid

  console.log('brk ', cart, items)

  // INCLUDES
  const {preloading, page, session} = stores()

  // LOGIC

  /************************
   * DIALOGS
   ************************/
  let dialogUpSell, dialogDownSell

  /*******************************
   * DIALOG HANDLERS
   *******************************/
  function closeHandler(event) {
    console.log('closed', event)
  }

  /*******************************
   * REQUESTS
   *******************************/
  async function getCart() {
    cart_loading = true
    return cartReq($session.token, $session.session_uuid)
      .then(response => {
        const sessionValues = {
          ...$session
        }
        if (response.data) {
          sessionValues.cart = response.data
        }

        session.set(sessionValues)

        cart = response.data
        cart_loading = false

        return response
      })
    .catch(err => {
      cart_loading = false
      cart_errors = err
      return
    })
  }

  async function listItems() {
    cart_loading = true
    items_loading = true

    return itemsReq($session.token, $session.session_uuid)
      .then(response => {

        console.log('brk response 2!', response)

        const sessionValues = {
          ...$session
        }
        if (response.cart) {
          sessionValues.cart = response.cart
        }

        if (response.data) {
          sessionValues.cart.items = response.data
        }

        session.set(sessionValues)

        items = response.data
        cart_loading = false
        items_loading = false

        return response
      })
      .catch(err => {
        cart_loading = false
        items_loading = false
        items_errors = err
        return
      })
  }

  async function removeItem(item_uuid) {
    cart_loading = true
    items_loading = true

    return removeItemReq($session.session_uuid, $session.token, item_uuid)
      .then(response => {

        console.log('REMOVE', response)

        const sessionValues = {
          ...$session
        }
        if (response.cart) {
          sessionValues.cart = response.cart
        }

        // if (response.data) {
        //   sessionValues.cart.items = response.data
        // }

        session.set(sessionValues)

        return checkDownSells(response.data.offer_uuid)
          .then(() => {
            // items = response.data
            cart_loading = false
            items_loading = false

            return response
          })
      })
      .catch(err => {
        cart_loading = false
        items_loading = false
        items_errors = err
        return
      })
  }

  async function listUpSells(_offer_uuid) {
    up_sells_loading = true
    return upSellsReq(
      $session.session_uuid,
      $session.token,
      _offer_uuid,
      up_sells_query
    )
    .then(res => {
      up_sells_loading = false
      up_sells = res.data
      up_sells_limit = res.limit
      up_sells_offset = res.offset
      up_sells_total = res.total
      up_sells_sort = res.sort

      return res
    })
    .catch(err => {
      up_sells_loading = false
      up_sells_errors = err

      return
    })
  }

  async function listDownSells(_offer_uuid) {
    down_sells_loading = true
    return downSellsReq(
      $session.session_uuid,
      $session.token,
      _offer_uuid,
      down_sells_query
    )
      .then(res => {
        down_sells_loading = false
        down_sells = res.data
        down_sells_limit = res.limit
        down_sells_offset = res.offset
        down_sells_total = res.total
        down_sells_sort = res.sort

        return res
      })
      .catch(err => {
        down_sells_loading = false
        down_sells_errors = err

        return
      })
  }

  async function checkUpSells() {
    if (offer_uuid) {
      return listUpSells(offer_uuid)
        .then(res => {
          console.log('BRK up sell', res)
          if (res && res.data && res.data.length > 0) {
            dialogUpSell.open()
          }
          return res
        })
    }
    else {
      return Promise.resolve()
    }
  }

  async function checkDownSells(_offer_uuid) {
    if (_offer_uuid) {
      return listDownSells(_offer_uuid)
        .then(res => {
          console.log('BRK down sell', res)
          if (res && res.data && res.data.length > 0) {
            dialogDownSell.open()
          }
          return res
        })
    } else {
      return Promise.resolve()
    }
  }

  /*******************************
   * STORE HANDLERS
   *******************************/
  function updateStore() {
    console.log('BRK updating store', cart, items)

    const sessionValues = {
      ...$session
    }
    if (session_uuid) {
      sessionValues.session_uuid = session_uuid
    }

    if (cart) {
      sessionValues.cart = cart
    }

    if (items) {
      sessionValues.cart.items = items
    }

    session.set(sessionValues)
  }

  $: updateStore()

  let total_items, btnsDisabled
  $: total_items = cart ? cart.total_items : 0
  $: btnsDisabled = !total_items || cart_loading || items_loading


  onMount((async => {
    return Promise.all([
      checkUpSells()
    ])
  }))

</script>
<style type="text/scss">
  @import "../../theme/variables";

  /*********************************
  4. Cart
  *********************************/

  .cart_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }
  .cart_title
  {
    font-size: 30px;
    font-weight: 500;
  }
  .cart_items
  {
    margin-top: 67px;
  }
  .cart_list
  {
    border: solid 1px $gray-100;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
  }
  .cart_item
  {
    width: 100%;
    padding: 15px;
    padding-right: 46px;
  }
  .cart_item_image
  {
    width: 133px;
    height: 133px;
    float: left;
  }
  .cart_item_image img
  {
    max-width: 100%;
  }
  .cart_item_info
  {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px;
  }
  .cart_item_name
  {
    margin-left: 7.53%;
  }
  .cart_item_title
  {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .cart_item_text
  {
    font-size: 18px;
    margin-top: 35px;
  }
  .cart_item_text span
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
  .cart_item_price
  {
    text-align: right;
  }
  .cart_item_total
  {
    text-align: right;
  }
  .order_total
  {
    width: 100%;
    /*height: 60px;*/
    margin-top: 30px;
    border: solid 1px $gray-100;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-right: $card-columns-gap * 2;
    padding-left: $card-columns-gap;
  }
  .order_total_title
  {
    display: inline-block;
    font-size: 1rem;
    color: rgba(0,0,0,0.5);
    line-height: 60px;
  }
  .order_total_amount
  {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    margin-left: $card-columns-gap * 2;
    line-height: 60px;
  }
  .cart_buttons
  {
    margin-top: 60px;
    text-align: right;
  }
  .cart_button_clear
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: rgba(0,0,0,0.5);
    background: $white;
    border: solid 1px $gray-300;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    margin-left: $card-columns-gap * 2;
  }
  .cart_button_clear:hover
  {
    border-color: theme-color('primary');
    color: theme-color('primary');
  }
  .cart_button_checkout
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: $white;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    vertical-align: top;
  }
  .x-sells {
    min-width: 350px;
  }
</style>

<svelte:head>
  <title>Cart • { brand.name }</title>
</svelte:head>

<!-- Cart -->

<div class="cart_section">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="cart_container">
          <div class="cart_title">Shopping Cart</div>
          <div class="cart_items">
            <div class="list-group cart_list">
              {#each items as item, i (item.item_uuid)}
                <CartItem
                  {item}
                  {btnsDisabled}
                  on:remove={e=> removeItem(item.item_uuid)}
                />
              {:else}
                <div class="list-group-item">
                  <div class="text-center mt-5">
                    <h2>Cart Empty</h2>
                    <p>It looks like this list is empty...</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Order Total -->
          <div class="order_total">
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Subtotal:</div>
              <div class="order_total_amount">
                <Currency
                  price={cart.total_subtotal}
                  currency={cart.currency}
                />
              </div>
            </div>
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Tax Total:</div>
              <div class="order_total_amount">
                <Currency
                  price={cart.total_taxes}
                  currency={cart.currency}
                />
              </div>
            </div>
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Shipping Total:</div>
              <div class="order_total_amount">
                <Currency
                  price={cart.total_shipping}
                  currency={cart.currency}
                />
              </div>
            </div>
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Cart Total:</div>
              <div class="order_total_amount">
                <Currency
                  price={cart.total_due}
                  currency={cart.currency}
                />
              </div>
            </div>
          </div>

          <div class="cart_buttons">
<!--            <button-->
<!--              type="button"-->
<!--              class="button cart_button_clear"-->
<!--            >Make Wishlist</button>-->
            <a
              href="/cart/checkout"
              class="btn btn-primary cart_button_checkout"
              class:disabled={btnsDisabled}
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<Dialog
  bind:this={dialogUpSell}
  aria-labelledby="dialog-up-sell-title"
  aria-describedby="dialog-up-sell-content"
  on:MDCDialog:closed={closeHandler}
>
  <Title id="dialog-up-sell-title">
    You might also be interested in...
  </Title>
  <Content id="dialog-up-sell-content">
    <div class="x-sells d-flex">
      {#each up_sells as offer, i (offer.offer_uuid)}
        <div class="flex-column">
          <OfferItem {offer} />
        </div>
      {/each}
    </div>
  </Content>
</Dialog>

<Dialog
  bind:this={dialogDownSell}
  aria-labelledby="dialog-down-sell-title"
  aria-describedby="dialog-down-sell-content"
  on:MDCDialog:closed={closeHandler}
>
  <Title id="dialog-down-sell-title">
    You might like this instead...
  </Title>
  <Content id="dialog-down-sell-content">
    <div class="x-sells d-flex">
      {#each down_sells as offer, i (offer.offer_uuid)}
        <div class="flex-column">
          <OfferItem {offer} />
        </div>
      {/each}
    </div>
  </Content>
</Dialog>
