<script>
  export let hot_best_sellers_query = {},
    hot_best_sellers_offers = [],
    hot_best_sellers_offers_total = 0,
    hot_best_sellers_offers_offset = 0,
    hot_best_sellers_offers_limit = 10,

    hot_best_sellers_featured_query = {},
    hot_best_sellers_featured_offers = [],
    hot_best_sellers_featured_offers_total = 0,
    hot_best_sellers_featured_offers_offset = 0,
    hot_best_sellers_featured_offers_limit = 10


</script>
<style type="text/scss">
@import "../../theme/variables";

/*********************************
10. Hot Best Sellers
*********************************/

  .best_sellers
  {
    padding-top: 56px;
    background: #eff6fa;
    padding-bottom: 50px;
    margin-top: -77px;
  }
  .bestsellers_panel
  {
    display: none;
    width: 100%;
    padding-top: 50px;
  }
  .bestsellers_panel.active
  {
    display: block;
    padding-top: 50px;
  }
  .bestsellers_slider
  {
    width: calc(100% + 30px);
    left: -15px;
    padding-bottom: 67px;
  }
  .bestsellers_item
  {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 25px;
  }
  .bestsellers_slider .slick-slide > div:first-child
  {
    margin-bottom: 30px;
  }
  .bestsellers_slider .slick-slide
  {
    outline: none;
  }
  .bestsellers_slider .slick-slide
  {
    margin: 0 15px;
  }
  .bestsellers_image
  {
    width: 115px;
    height: 115px;
  }
  .bestsellers_image img
  {
    max-width: 100%;
    max-height: 100%;
  }
  .bestsellers_content
  {
    padding-left: 25px;
  }
  .bestsellers_category a
  {
    font-size: 12px;
    color: rgba(0,0,0,0.5);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .bestsellers_category a:hover
  {
    color: #0e8ce4;
  }
  .bestsellers_name
  {
    margin-top: 2px;
  }
  .bestsellers_name a
  {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .bestsellers_name a:hover
  {
    color: #0e8ce4;
  }
  .bestsellers_rating
  {
    margin-top: 9px;
  }
  .bestsellers_rating i::before
  {
    font-size: 13px;
    margin-right: 8px;
  }
  .bestsellers_price
  {
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
  }
  .bestsellers_item.discount .bestsellers_price
  {
    color: #df3b3b;
  }
  .bestsellers_price span
  {
    position: relative;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
    margin-left: 9px;
  }
  .bestsellers_price span::after
  {
    display: block;
    position: absolute;
    left: -2px;
    top: 6px;
    width: calc(100% + 4px);
    height: 1px;
    background: #8d8d8d;
    z-index: 1;
    content: '';
  }
  .bestsellers_fav
  {
    display: none;
    position: absolute;
    top: 30px;
    right: 29px;
  }
  .bestsellers_fav.active
  {
    display: block;
  }
  .bestsellers_fav i
  {
    font-size: 13px;
    color: #df3b3b;
  }
  .bestsellers_marks
  {
    position: absolute;
    left: 18px;
    top: 18px;
  }
  .bestsellers_mark
  {
    display: none;
    width: 36px;
    height: 36px;
    font-size: 10px;
    font-weight: 500;
    color: #FFFFFF;
    border-radius: 50%;
    line-height: 36px;
    text-align: center;
  }
  .bestsellers_discount
  {
    background: #df3b3b;
  }
  .bestsellers_item.discount .bestsellers_discount,
  .bestsellers_item.is_new .bestsellers_new
  {
    display: block;
  }
  .bestsellers_new
  {
    background: #0e8ce4;
  }
  .bestsellers_slider .slick-dots
  {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: -5px;
  }
  .bestsellers_slider .slick-dots li
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
  .bestsellers_slider .slick-dots li:hover
  {
    background: #0e8ce4;
  }
  .bestsellers_slider .slick-dots li.slick-active
  {
    background: #0e8ce4;
  }
  .bestsellers_slider .slick-dots li:last-child
  {
    margin-right: 0px;
  }
  .bestsellers_slider .slick-dots li button
  {
    display: none;
  }

</style>
<!-- Best Sellers -->

<div class="best_sellers">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="tabbed_container">
          <div class="tabs clearfix tabs-right">
            <div class="new_arrivals_title">Hot Best Sellers</div>
            <ul class="clearfix">
              <li class="active">Top 20</li>
              <li>Audio & Video</li>
              <li>Laptops & Computers</li>
            </ul>
            <div class="tabs_line"><span></span></div>
          </div>

          <div class="bestsellers_panel panel active">

            <!-- Best Sellers Slider -->

            <div class="bestsellers_slider slider">

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Samsung J730F...</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Nomi Black White</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Samsung Charm Gold</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Beoplay H7</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Huawei MediaPad T3</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="bestsellers_panel panel">

            <!-- Best Sellers Slider -->

            <div class="bestsellers_slider slider">

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="bestsellers_panel panel">

            <!-- Best Sellers Slider -->

            <div class="bestsellers_slider slider">

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_1.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_2.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_3.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_4.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item discount">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_5.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

              <!-- Best Sellers Item -->
              <div class="bestsellers_item">
                <div class="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                  <div class="bestsellers_image"><img src="images/best_6.png" alt=""></div>
                  <div class="bestsellers_content">
                    <div class="bestsellers_category"><a href="#">Headphones</a></div>
                    <div class="bestsellers_name"><a href="product.html">Xiaomi Redmi Note 4</a></div>
                    <div class="rating_r rating_r_4 bestsellers_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="bestsellers_price discount">$225<span>$300</span></div>
                  </div>
                </div>
                <div class="bestsellers_fav active"><i class="fas fa-heart"></i></div>
                <ul class="bestsellers_marks">
                  <li class="bestsellers_mark bestsellers_discount">-25%</li>
                  <li class="bestsellers_mark bestsellers_new">new</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
