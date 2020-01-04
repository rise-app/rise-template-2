<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    // const {handle} = params
    //
    // // Fixes deep nested objects
    // let variants_query = riseQuery(pluckQuery(query, 'vq'))
    //
    // const offerReq = async (_handle) => {
    //   if (_handle) {
    //     return rise.channelPublicOffer.getByHandle({}, {
    //       session: session_uuid,
    //       token: token,
    //       params: {
    //         handle: _handle
    //       }
    //     })
    //   } else {
    //     return Promise.resolve()
    //   }
    // }
    //
    // const variantsReq = async (_handle) => {
    //   if (_handle) {
    //     return rise.channelPublicOfferVariant.listVariantsByHandle({}, {
    //       session: session_uuid,
    //       token: token,
    //       params: {
    //         handle: _handle
    //       },
    //       query: riseQuery(variants_query)
    //     })
    //   } else {
    //     Promise.resolve()
    //   }
    // }
    //
    //
    // return Promise.all([
    //   offerReq(handle),
    //   variantsReq(handle)
    // ])
    //         .then(([
    //                  offer = {},
    //                  variants = {}
    //                ]) => {
    //           return {
    //             offer: offer.data,
    //
    //             variants_query,
    //             variants: variants.data,
    //             variants_total: variants.total,
    //             variants_offset: variants.offset,
    //             variants_limit: variants.limit,
    //           }
    //         })
    //         .catch(err => {
    //           return this.error(err)
    //         })
  }

</script>

<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import { get, put, post } from 'utils'
  import { onMount } from 'svelte'

  // COMPONENTS
  import ImageLoader from '../_components/ImageLoader'
  import Currency from '../_components/Currency'
  import CartItem from './_components/CartItem.svelte'

  // INCLUDES
  const {preloading, page, session} = stores()

  // LOGIC

  $: cart = $session.cart || {}
  $: items = $session.cart && $session.cart.items ? $session.cart.items : []

  onMount(async () => {
    return get(`auth/session/cart`, {})
      .then(response => {
        console.log('brk response 1!', response)
        return get(`auth/session/cart/items`, {})
      })
      .then(response => {
        console.log('brk response 2!', response)
        $session.cart.items = response.data
      })
  })

</script>
<style type="text/scss">
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
    border: solid 1px #e8e8e8;
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
    background: #FFFFFF;
    border: solid 1px #b2b2b2;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    margin-right: 26px;
  }
  .cart_button_clear:hover
  {
    border-color: #0e8ce4;
    color: #0e8ce4;
  }
  .cart_button_checkout
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
  <title>Cart</title>
</svelte:head>

<!-- Cart -->

<div class="cart_section">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="cart_container">
          <div class="cart_title">Shopping Cart</div>
          <div class="cart_items">
            <ul class="cart_list">
              {#each items as item, i (item.item_uuid)}
              <CartItem {item} />
<!--                <li class="cart_item clearfix">-->
<!--                  <div class="cart_item_image">-->
<!--                    <ImageLoader-->
<!--                      src={item.primary_image.src}-->
<!--                      alt="{item.variant_sku}"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">-->
<!--                    <div class="cart_item_name cart_info_col">-->
<!--                      <div class="cart_item_title">Name</div>-->
<!--                      <div class="cart_item_text">-->
<!--                        { item.variant_title || item.offer_title }-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="cart_item_color cart_info_col">-->
<!--                      <div class="cart_item_title">Color</div>-->
<!--                      <div class="cart_item_text">-->
<!--                        <span style="background-color:#999999;"></span>Silver-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="cart_item_quantity cart_info_col">-->
<!--                      <div class="cart_item_title">Quantity</div>-->
<!--                      <div class="cart_item_text">-->
<!--                        { item.quantity || 0 }-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="cart_item_price cart_info_col">-->
<!--                      <div class="cart_item_title">Price</div>-->
<!--                      <div class="cart_item_text">-->
<!--                        <Currency-->
<!--                          price={item.price_per_unit}-->
<!--                          currency={item.currency}-->
<!--                        />-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="cart_item_total cart_info_col">-->
<!--                      <div class="cart_item_title">Total</div>-->
<!--                      <div class="cart_item_text">-->
<!--                        <Currency-->
<!--                          price={item.price_total}-->
<!--                          currency={item.currency}-->
<!--                        />-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->
              {:else}
                <li>
                  <div class="text-center mt-5">
                    <h2>Cart Empty</h2>
                    <p>It looks like this list is empty...</p>
                  </div>
                </li>
              {/each}
<!--              <li class="cart_item clearfix">-->
<!--                <div class="cart_item_image"><img src="images/shopping_cart.jpg" alt=""></div>-->
<!--                <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">-->
<!--                  <div class="cart_item_name cart_info_col">-->
<!--                    <div class="cart_item_title">Name</div>-->
<!--                    <div class="cart_item_text">MacBook Air 13</div>-->
<!--                  </div>-->
<!--                  <div class="cart_item_color cart_info_col">-->
<!--                    <div class="cart_item_title">Color</div>-->
<!--                    <div class="cart_item_text"><span style="background-color:#999999;"></span>Silver</div>-->
<!--                  </div>-->
<!--                  <div class="cart_item_quantity cart_info_col">-->
<!--                    <div class="cart_item_title">Quantity</div>-->
<!--                    <div class="cart_item_text">1</div>-->
<!--                  </div>-->
<!--                  <div class="cart_item_price cart_info_col">-->
<!--                    <div class="cart_item_title">Price</div>-->
<!--                    <div class="cart_item_text">$2000</div>-->
<!--                  </div>-->
<!--                  <div class="cart_item_total cart_info_col">-->
<!--                    <div class="cart_item_title">Total</div>-->
<!--                    <div class="cart_item_text">$2000</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </li>-->
            </ul>
          </div>

          <!-- Order Total -->
          <div class="order_total">
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Order Total:</div>
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
<!--            >Add to Cart</button>-->
            <a
                    href="/cart/checkout"
              type="button"
              class="button cart_button_checkout"
            >Checkout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
