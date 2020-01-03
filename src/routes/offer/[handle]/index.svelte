<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {
    const { handle } = params

    // Fixes deep nested objects
    let variants_query = riseQuery(pluckQuery(query, 'vq'))

    const offerReq = async(_handle) => {
      if (_handle) {
        return rise.channelPublicOffer.getByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          }
        })
      }
      else {
        return Promise.resolve()
      }
    }

    const variantsReq = async(_handle) => {
      if (_handle) {
        return rise.channelPublicOfferVariant.listVariantsByHandle({}, {
          session: session_uuid,
          token: token,
          params: {
            handle: _handle
          },
          query: riseQuery(variants_query)
        })
      }
      else {
        Promise.resolve()
      }
    }


    return Promise.all([
      offerReq(handle),
      variantsReq(handle)
    ])
      .then(([
        offer = {},
        variants = {}
       ]) => {
        return {
          offer: offer.data,

          variants_query,
          variants: variants.data,
          variants_total: variants.total,
          variants_offset: variants.offset,
          variants_limit: variants.limit,
        }
      })
      .catch(err => {
        return this.error(err)
      })
  }

</script>

<script>

  // COMPONENTS
  import ImageLoader from '../../_components/ImageLoader.svelte'
  import Currency from '../../_components/Currency.svelte'

  // IMPORTS
  export let
    offer = {},
    variants_query = {},
    variants = [],
    variants_total = 0,
    variants_offset = 0,
    variants_limit = 10

  // LOGIC
  let image = offer && offer.image_primary ? offer.image_primary : {}
</script>

<style type="text/scss">
  /*********************************
  5. Single Product
  *********************************/

  .single_product
  {
    padding-top: 110px;
    padding-bottom: 140px;
  }
  .image_list li
  {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 165px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    margin-bottom: 15px;
    cursor: pointer;
    padding: 15px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
    overflow: hidden;
  }
  .image_list li:last-child
  {
    margin-bottom: 0;
  }
  .image_list li:hover
  {
    box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
  }
  .image_list li img
  {
    max-width: 100%;
  }
  .image_selected
  {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100% + 15px);
    height: 525px;
    -webkit-transform: translateX(-15px);
    -moz-transform: translateX(-15px);
    -ms-transform: translateX(-15px);
    -o-transform: translateX(-15px);
    transform: translateX(-15px);
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    overflow: hidden;
    padding: 15px;
  }
  .image_selected img
  {
    max-width: 100%;
  }
  .product_description
  {
    padding-left: 50px;
  }
  .product_category
  {
    font-size: 12px;
    color: rgba(0,0,0,0.5);
  }
  .product_name
  {
    font-size: 30px;
    font-weight: 500;
    margin-top: 11px;
  }
  .product_rating
  {
    margin-top: 7px;
  }
  .product_rating i
  {
    margin-right: 4px;
  }
  .product_rating i::before
  {
    font-size: 13px;
  }
  .product_text
  {
    margin-top: 27px;
  }
  .product_text p:last-child
  {
    margin-bottom: 0px;
  }
  .order_info
  {
    margin-top: 53px;
  }
  .product_quantity
  {
    width: 182px;
    height: 50px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    overflow: hidden;
    padding-left: 25px;
    float: left;
    margin-right: 30px;
  }
  .product_quantity span
  {
    display: block;
    height: 50px;
    font-size: 16px;
    font-weight: 300;
    color: rgba(0,0,0,0.5);
    line-height: 50px;
    float: left;
  }
  .product_quantity input
  {
    display: block;
    width: 30px;
    height: 50px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 300;
    color: rgba(0,0,0,0.5);
    text-align: left;
    padding-left: 9px;
    line-height: 50px;
    float: left;
  }
  .quantity_buttons
  {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 29px;
    border-left: solid 1px #e5e5e5;
  }
  .quantity_inc,
  .quantity_dec
  {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;
    cursor: pointer;
  }
  .quantity_control i
  {
    font-size: 11px;
    color: rgba(0,0,0,0.3);
    pointer-events: none;
  }
  .quantity_control:active
  {
    border: solid 1px rgba(14, 140, 228, 0.2);
  }
  .quantity_inc
  {
    padding-bottom: 2px;
    justify-content: flex-end;
    border-top-right-radius: 5px;
  }
  .quantity_dec
  {
    padding-top: 2px;
    justify-content: flex-start;
    border-bottom-right-radius: 5px;
  }
  .product_color
  {
    width: 182px;
    height: 50px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    float: left;
    cursor: pointer;
  }
  .product_color span
  {
    display: block;
    height: 50px;
    font-size: 16px;
    font-weight: 300;
    color: rgba(0,0,0,0.5);
    line-height: 50px;
    float: left;
  }
  .color_dropdown_button
  {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
  }
  .color_dropdown_button i
  {
    font-size: 11px;
    color: rgba(0,0,0,0.3);
    pointer-events: none;
  }
  .color_mark_container
  {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 48px;
    float: right;
  }
  .color_mark
  {
    width: 20px;
    height: 20px;
    background: #999999;
    border-radius: 50%;
  }
  .product_color > li
  {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 25px;
    padding-right: 49px;
  }
  .product_color li ul
  {
    position: absolute;
    top: calc(100% + 15px);
    right: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    width: auto;
    visibility: hidden;
    opacity: 0;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
    background: #FFFFFF;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .product_color > li:hover ul
  {
    top: 100%;
    visibility: visible;
    opacity: 1;
  }
  .product_color li ul li
  {
    padding-right: 49px;
    padding-left: 49px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .product_color li ul li div
  {
    margin-left: auto;
  }
  .product_price
  {
    display: inline-block;
    font-size: 24px;
    font-weight: 500;
    margin-top: 75px;
    clear: left;

    :global(span) {
      font-size: 24px !important;
      font-weight: 500 !important;
    }
  }
  .button_container
  {
    margin-top: 43px;
  }
  .cart_button
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
  }
  .cart_button:focus
  {
    outline: none;
  }
  .product_fav
  {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    margin-left: 36px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .product_fav:hover
  {
    box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
  }
  .product_fav i
  {
    line-height: 36px;
    color: #cccccc;
  }
  .product_fav.active i
  {
    color: #df3b3b;
  }

</style>

<svelte:head>
  <title>{ offer.title }</title>
</svelte:head>


<!-- Single Product -->

<div class="single_product">
  <div class="container">
    <div class="row">

      <!-- Images -->
      <div class="col-lg-2 order-lg-1 order-2">
        <ul class="image_list">
          <li data-image="images/single_4.jpg"><img src="images/single_4.jpg" alt=""></li>
          <li data-image="images/single_2.jpg"><img src="images/single_2.jpg" alt=""></li>
          <li data-image="images/single_3.jpg"><img src="images/single_3.jpg" alt=""></li>
        </ul>
      </div>

      <!-- Selected Image -->
      <div class="col-lg-5 order-lg-2 order-1">
        <div class="image_selected">
          <ImageLoader src={image.src} alt={offer.title} width="100%" />
        </div>
      </div>

      <!-- Description -->
      <div class="col-lg-5 order-3">
        <div class="product_description">
          <div class="product_category">{ offer.type || 'uncategorized' }</div>
          <div class="product_name">{ offer.title || 'Untitled' }</div>
          <div class="rating_r rating_r_4 product_rating">
            <i></i><i></i><i></i><i></i><i></i>
          </div>
          <div class="product_text">
            {@html offer.description || '' }
          </div>
          <div class="order_info d-flex flex-row">
            <form action="#">
              <div class="clearfix" style="z-index: 1000;">

                <!-- Product Quantity -->
                <div class="product_quantity clearfix">
                  <span>Quantity: </span>
                  <input id="quantity_input" type="text" pattern="[0-9]*" value="1">
                  <div class="quantity_buttons">
                    <div id="quantity_inc_button" class="quantity_inc quantity_control">
                      <i class="fas fa-chevron-up"></i>
                    </div>
                    <div id="quantity_dec_button" class="quantity_dec quantity_control">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <!-- Product Color -->
                <ul class="product_color">
                  <li>
                    <span>Color: </span>
                    <div class="color_mark_container"><div id="selected_color" class="color_mark"></div></div>
                    <div class="color_dropdown_button"><i class="fas fa-chevron-down"></i></div>

                    <ul class="color_list">
                      <li><div class="color_mark" style="background: #999999;"></div></li>
                      <li><div class="color_mark" style="background: #b19c83;"></div></li>
                      <li><div class="color_mark" style="background: #000000;"></div></li>
                    </ul>
                  </li>
                </ul>

              </div>
              <div class="product_price">
                <Currency price={ offer.price_channel } currency={ offer.currency } />
              </div>
              <div class="button_container">
                <button
                  type="button"
                  class="button cart_button"
                >
                  Add to Cart
                </button>
                <div class="product_fav"><i class="fas fa-heart"></i></div>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
