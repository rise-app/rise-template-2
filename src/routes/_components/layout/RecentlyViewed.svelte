<script>
  export let offers = []

</script>
<style type="text/scss">
  @import "../../../theme/variables";

  .viewed
  {
    padding-top: 51px;
    padding-bottom: 60px;
    background: #eff6fa;
  }
  .viewed_title_container
  {
    border-bottom: solid 1px #dadada;
  }
  .viewed_title
  {
    margin-bottom: 14px;
  }
  .viewed_nav_container
  {
    position: absolute;
    right: -5px;
    bottom: 14px;
  }
  .viewed_nav
  {
    display: inline-block;
    cursor: pointer;
  }
  .viewed_nav i
  {
    color: #dadada;
    font-size: 18px;
    padding: 5px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .viewed_nav:hover i
  {
    color: #606264;
  }
  .viewed_prev
  {
    margin-right: 15px;
  }
  .viewed_slider_container
  {
    padding-top: 50px;
  }
  .viewed_item
  {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .viewed_image
  {
    width: 115px;
    height: 115px;
  }
  .viewed_image img
  {
    display: block;
    max-width: 100%;
  }
  .viewed_content
  {
    width: 100%;
    margin-top: 25px;
  }
  .viewed_price
  {
    font-size: 16px;
    color: #000000;
    font-weight: 500;
  }
  .viewed_item.discount .viewed_price
  {
    color: #df3b3b;
  }
  .viewed_price span
  {
    position: relative;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
    margin-left: 8px;
  }
  .viewed_price span::after
  {
    display: block;
    position: absolute;
    top: 6px;
    left: -2px;
    width: calc(100% + 4px);
    height: 1px;
    background: #8d8d8d;
    content: '';
  }
  .viewed_name
  {
    margin-top: 3px;
  }
  .viewed_name a
  {
    font-size: 14px;
    color: #000000;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .viewed_name a:hover
  {
    color: #0e8ce4;
  }
  .item_marks
  {
    position: absolute;
    top: 18px;
    left: 18px;
  }
  .item_mark
  {
    display: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 500;
    line-height: 36px;
    text-align: center;
  }
  .item_discount
  {
    background: #df3b3b;
    margin-right: 5px;
  }
  .item_new
  {
    background: #0e8ce4;
  }
  .viewed_item.discount .item_discount
  {
    display: inline-block;
  }
  .viewed_item.is_new .item_new
  {
    display: inline-block;
  }

</style>

<!-- Recently Viewed -->

<div class="viewed">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="viewed_title_container">
          <h3 class="viewed_title">Recently Viewed</h3>
          <div class="viewed_nav_container">
            <div class="viewed_nav viewed_prev"><i class="fas fa-chevron-left"></i></div>
            <div class="viewed_nav viewed_next"><i class="fas fa-chevron-right"></i></div>
          </div>
        </div>

        <div class="viewed_slider_container">

          <!-- Recently Viewed Slider -->

          <div class="owl-carousel owl-theme viewed_slider">

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_1.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$225<span>$300</span></div>
                  <div class="viewed_name"><a href="#">Beoplay H7</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_2.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$379</div>
                  <div class="viewed_name"><a href="#">LUNA Smartphone</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_3.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$225</div>
                  <div class="viewed_name"><a href="#">Samsung J730F...</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_4.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$379</div>
                  <div class="viewed_name"><a href="#">Huawei MediaPad...</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_5.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$225<span>$300</span></div>
                  <div class="viewed_name"><a href="#">Sony PS4 Slim</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>

            <!-- Recently Viewed Item -->
            <div class="owl-item">
              <div class="viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                <div class="viewed_image"><img src="images/view_6.jpg" alt=""></div>
                <div class="viewed_content text-center">
                  <div class="viewed_price">$375</div>
                  <div class="viewed_name"><a href="#">Speedlink...</a></div>
                </div>
                <ul class="item_marks">
                  <li class="item_mark item_discount">-25%</li>
                  <li class="item_mark item_new">new</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
