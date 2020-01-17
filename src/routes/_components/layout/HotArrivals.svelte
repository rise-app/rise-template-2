<script>
  export let hot_new_arrivals_query = {},
    hot_new_arrivals_offers = [],
    hot_new_arrivals_offers_total = 0,
    hot_new_arrivals_offers_offset = 0,
    hot_new_arrivals_offers_limit = 10,

    hot_new_arrivals_featured_query = {},
    hot_new_arrivals_featured_offers = [],
    hot_new_arrivals_featured_offers_total = 0,
    hot_new_arrivals_featured_offers_offset = 0,
    hot_new_arrivals_featured_offers_limit = 10

</script>
<style type="text/scss">

  .new_arrivals
  {
    width: 100%;
    padding-top: 96px;
    padding-bottom: 96px;
  }
  .new_arrivals_title
  {
    position: absolute;
    left: 0;
    top: -7px;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: -29px;
  }
  .arrivals_slider
  {
    width: 100%;
  }
  .arrivals_slider .slick-list
  {
    padding-left: 20px;
    padding-right: 20px;
  }
  .arrivals_slider .slick-track
  {
    padding-bottom: 80px;
  }
  .arrivals_slider_item
  {
    visibility: hidden;
    height: 263px;
    width: 25%;
  }
  .arrivals_slider .slick-active .arrivals_slider_item
  {
    visibility: visible;
  }
  .border_active.active
  {
    display: block;
  }
  .border_active
  {
    display: none;
    position: absolute;
    top: 40px;
    right: 0;
    width: 1px;
    height: 183px;
    background: #e5e5e5;
    content: '';
    z-index: 1;
  }
  .arrivals_slider .slick-dots
  {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 50px;
  }
  .arrivals_slider .slick-slide
  {
    outline: none;
  }
  .arrivals_slider .slick-dots li
  {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: none;
    outline: none;
    padding: 0px;
    margin: 0px;
    border-radius: 50%;
    content: '';
    background: #e8e8e8;
    margin-right: 20px;
    cursor: pointer;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .arrivals_slider .slick-dots li:hover
  {
    background: #0e8ce4;
  }
  .arrivals_slider .slick-dots li.slick-active
  {
    background: #0e8ce4;
  }
  .arrivals_slider .slick-dots li:last-child
  {
    margin-right: 0px;
  }
  .arrivals_slider .slick-dots li button
  {
    display: none;
  }
  .arrivals_slider_dots_cover
  {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 100px;
    width: 100px;
    height: 30px;
    background: #FFFFFF;
    z-index: 1;
    display: none;
  }
  .arrivals_single
  {
    width: 100%;
    padding-top: 73px;
  }
  .arrivals_single > div
  {
    width: 212px;
    float: right;
  }
  .arrivals_single_image
  {
    width: 100%;
  }
  .arrivals_single_image img
  {
    max-width: 100%;
  }
  .arrivals_single_content
  {
    width: 100%;
  }
  .arrivals_single_button
  {
    position: relative;
    left: 0px;
    width: 100%;
    height: 48px;
    background: #0e8ce4;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
    margin-top: 19px;
    border-radius: 5px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .arrivals_single_button:hover
  {
    background: rgba(14, 140, 228, 0.8);
  }
  .arrivals_single_category
  {
    margin-top: 27px;
  }
  .arrivals_single_category a
  {
    font-size: 12px;
    color: rgba(0,0,0,0.5);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .arrivals_single_category a:hover
  {
    color: #0e8ce4;
  }
  .arrivals_single_name_container
  {
    width: 100%;
  }
  .arrivals_single_name
  {
    margin-top: 2px;
    float: left;
  }
  .arrivals_single_name a
  {
    font-size: 16px;
    color: #000000;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .arrivals_single_name a:hover
  {
    color: #0e8ce4;
  }
  .arrivals_single_price
  {
    font-size: 16px;
    font-weight: 500;
    float: right;
  }
  .arrivals_single_rating
  {
    margin-top: 9px;
  }
  .arrivals_single_marks
  {
    display: block;
    position: absolute;
    top: -15px;
    left: 0px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .arrivals_single_marks .product_mark
  {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #FFFFFF;
    text-align: center;
    line-height: 36px;
    font-size: 12px;
  }
  .arrivals_single_marks .product_new
  {
    display: block;
    background: #0e8ce4;
    visibility: visible;
    opacity: 1;
  }
  .arrivals_single_marks .product_discount
  {
    display: block;
    background: #df3b3b;
    visibility: visible;
    opacity: 1;
  }
  .arrivals_single .product_fav
  {
    position: absolute;
    top: -15px;
    right: 0px;
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    border-radius: 50%;
    visibility: visible;
    opacity: 1;
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
  .product_fav.active i
  {
    color: red;
  }
</style>

<!-- Hot New Arrivals -->

<div class="new_arrivals">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="tabbed_container">
          <div class="tabs clearfix tabs-right">
            <div class="new_arrivals_title">Hot New Arrivals</div>
            <ul class="clearfix">
              <li class="active">Featured</li>
              <li>Audio & Video</li>
              <li>Laptops & Computers</li>
            </ul>
            <div class="tabs_line"><span></span></div>
          </div>
          <div class="row">
            <div class="col-lg-9" style="z-index:1;">

              <!-- Product Panel -->
              <div class="product_panel panel active">
                <div class="arrivals_slider slider">

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center">
                        <img src="images/new_1.jpg" alt="">
                      </div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div>
                          <a href="/offer/123">Astro M2 Black</a>
                        </div>
                        </div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Transcend T.Sonic</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button active">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div>
                          <a href="product.html">Xiaomi Band 2...</a>
                        </div>
                        </div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Rapoo T8 White</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Philips BT6900A</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Nokia 3310(2017)...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Rapoo 7100p Gray</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Canon EF</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_1.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Gembird SPK-103</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Canon IXUS 175...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="arrivals_slider_dots_cover"></div>
              </div>

              <!-- Product Panel -->
              <div class="product_panel panel">
                <div class="arrivals_slider slider">

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_1.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button active">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_1.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="arrivals_slider_dots_cover"></div>
              </div>

              <!-- Product Panel -->
              <div class="product_panel panel">
                <div class="arrivals_slider slider">

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_1.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button active">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount">-25%</li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_1.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_2.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_3.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_4.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_5.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_6.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_7.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$379</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Slider Item -->
                  <div class="arrivals_slider_item">
                    <div class="border_active"></div>
                    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                      <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="images/new_8.jpg" alt=""></div>
                      <div class="product_content">
                        <div class="product_price">$225</div>
                        <div class="product_name"><div><a href="product.html">Huawei MediaPad...</a></div></div>
                        <div class="product_extras">
                          <div class="product_color">
                            <input type="radio" checked name="product_color" style="background:#b19c83">
                            <input type="radio" name="product_color" style="background:#000000">
                            <input type="radio" name="product_color" style="background:#999999">
                          </div>
                          <button class="product_cart_button">Add to Cart</button>
                        </div>
                      </div>
                      <div class="product_fav"><i class="fas fa-heart"></i></div>
                      <ul class="product_marks">
                        <li class="product_mark product_discount"></li>
                        <li class="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="arrivals_slider_dots_cover"></div>
              </div>

            </div>

            <div class="col-lg-3">
              <div class="arrivals_single clearfix">
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div class="arrivals_single_image"><img src="images/new_single.png" alt=""></div>
                  <div class="arrivals_single_content">
                    <div class="arrivals_single_category"><a href="#">Smartphones</a></div>
                    <div class="arrivals_single_name_container clearfix">
                      <div class="arrivals_single_name"><a href="#">LUNA Smartphone</a></div>
                      <div class="arrivals_single_price text-right">$379</div>
                    </div>
                    <div class="rating_r rating_r_4 arrivals_single_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <form action="#"><button class="arrivals_single_button">Add to Cart</button></form>
                  </div>
                  <div class="arrivals_single_fav product_fav active"><i class="fas fa-heart"></i></div>
                  <ul class="arrivals_single_marks product_marks">
                    <li class="arrivals_single_mark product_mark product_new">new</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</div>
