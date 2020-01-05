<script>
  // COMPONENTS
  import ImageLoader from '../../_components/ImageLoader.svelte'
  import Currency from '../../_components/Currency.svelte'

  // IMPORTS
  export let
          offer = {}, index = 0

  // LOGIC
  let image = offer && offer.image_primary ? offer.image_primary : {}
</script>

<style type="text/scss">

  @import "../../../theme/variables";

  /*********************************
  5.1 Shop Offer
  *********************************/
  .offer_item {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #FFFFFF;
    cursor: pointer;
    padding-top: 40px;
    padding-bottom: 24px;
    text-align: center;
    max-width: 250px;
  }

  .offer_border {
    display: block;
    position: absolute;
    top: 52px;
    right: 1px;
    width: 1px;
    height: calc(100% - 71px);
    background: #e5e5e5;
  }

  .offer_image {
    width: 100%;
    height: 115px;
  }

  .offer_image img {
    display: block;
    position: relative;
    max-width: 100%;
  }

  .offer_content {
    width: 100%;
  }

  .offer_price {
    font-size: 16px;
    font-weight: 500;
    margin-top: 25px;
  }

  .offer_item.discount {
    color: #df3b3b;
  }

  .offer_price span {
    position: relative;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 10px;
  }

  .offer_price span::after {
    display: block;
    position: absolute;
    top: 6px;
    left: -2px;
    width: calc(100% + 4px);
    height: 1px;
    background: #8d8d8d;
    content: '';
  }

  .offer_name {
    margin-top: 4px;
    overflow: hidden;
  }

  .offer_name div {
    width: 100%;

  }

  .offer_name div a {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    white-space: nowrap;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .offer_name div a:hover {
    color: #0e8ce4;
  }

  .offer_fav {
    position: absolute;
    top: 33px;
    right: 12px;
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .offer_fav:hover {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  }

  .offer_fav i {
    display: block;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    color: #cccccc;
    line-height: 36px;
    pointer-events: none;
    z-index: 0;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .offer_fav.active i {
    color: red;
  }

  .offer_item:hover .offer_fav {
    visibility: visible;
    opacity: 1;
  }

  .offer_marks {
    display: block;
    position: absolute;
    top: 33px;
    left: 24px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  .offer_mark {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #FFFFFF;
    text-align: center;
    line-height: 36px;
    font-size: 12px;
  }

  .offer_new {
    display: none;
    background: #0e8ce4;
    visibility: hidden;
    opacity: 0;
  }

  .offer_discount {
    display: none;
    background: #df3b3b;
    visibility: hidden;
    opacity: 0;
  }

  .offer_item.is_new .offer_new,
  .offer_item.discount .offer_discount {
    display: inline-block;
    visibility: visible;
    opacity: 1;
  }
</style>

<!-- Offer Item -->
<div class="offer_item is_new">
  <div class="offer_image d-flex flex-column align-items-center justify-content-center">
    <a href="/offer/{ offer.offer_handle || offer.handle }">
      <ImageLoader src={image.src} alt={offer.title} width="100%" />
    </a>
  </div>
  <div class="offer_content">
    <div class="offer_price">
      <Currency price={ offer.price_channel } currency={ offer.currency } />
    </div>
    <div class="offer_name">
      <div>
        <a href="/offer/{ offer.offer_handle || offer.handle }" tabindex="{index}">{ offer.title }</a>
      </div>
    </div>
  </div>
  <div class="offer_fav"><i class="fas fa-heart"></i></div>
  <ul class="offer_marks">
    <li class="offer_mark offer_discount">-25%</li>
    <li class="offer_mark offer_new">new</li>
  </ul>
</div>


<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center">-->
<!--    <img src="images/new_5.jpg" alt="">-->
<!--  </div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Philips BT6900A</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item discount">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_1.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225<span>$300</span></div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Huawei MediaPad...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_2.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Apple iPod shuffle</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_3.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Sony MDRZX310W</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_4.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">LUNA Smartphone</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/shop_1.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Canon IXUS 175...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_5.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379<span>$300</span></div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Canon STM Kit...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_6.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225<span>$300</span></div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Samsung J330F</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_7.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Lenovo IdeaPad</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_8.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Digitus EDNET...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_1.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Astro M2 Black</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_2.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Transcend T.Sonic</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_3.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Xiaomi Band 2...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_4.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Rapoo T8 White</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item discount">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_1.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225<span>$300</span></div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Huawei MediaPad...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_6.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Nokia 3310 (2017)</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_7.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Rapoo 7100p Gray</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/new_8.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Canon EF</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/shop_2.jpg" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$225</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Gembird SPK-103</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->

<!--&lt;!&ndash; Offer Item &ndash;&gt;-->
<!--<div class="offer_item is_new">-->
<!--  <div class="offer_border"></div>-->
<!--  <div class="offer_image d-flex flex-column align-items-center justify-content-center"><img-->
<!--          src="images/featured_5.png" alt=""></div>-->
<!--  <div class="offer_content">-->
<!--    <div class="offer_price">$379</div>-->
<!--    <div class="offer_name">-->
<!--      <div><a href="#" tabindex="0">Canon STM Kit...</a></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="offer_fav"><i class="fas fa-heart"></i></div>-->
<!--  <ul class="offer_marks">-->
<!--    <li class="offer_mark offer_discount">-25%</li>-->
<!--    <li class="offer_mark offer_new">new</li>-->
<!--  </ul>-->
<!--</div>-->
