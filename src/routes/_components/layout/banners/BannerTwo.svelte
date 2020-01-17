<script></script>

<style type="text/scss">
  @import "../../../../theme/variables";
  /*********************************
  4. Banner
  *********************************/

  .banner_2
  {
    width: 100%;
  }
  .banner_2_background
  {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .banner_2_item
  {
    height: 580px;
  }
  .banner_2_content
  {
    padding-top: 145px;
  }
  .banner_2_image_container
  {
    width: 100%;
    height: 100%;
  }
  .banner_2_image
  {
    min-width: 100%;
    width: calc(44.8vw);
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
  }
  .banner_2_image img
  {
    width: 100%;
  }
  .banner_2_category
  {
    font-size: 12px;
    color: rgba(0,0,0,0.5);
  }
  .banner_2_title
  {
    font-size: 30px;
    font-weight: 500;
    color: #000000;
    margin-top: 11px;
  }
  .banner_2_text
  {
    font-size: 16px;
    font-weight: 300;
    color: #828282;
    line-height: 1.5;
    margin-top: 9px;
  }
  .banner_2_rating
  {
    margin-top: 18px;
  }
  .rating_r i::before
  {
    font-family: 'FontAwesome';
    content: "\f006";
    font-style: normal;
    font-size: 19px;
    margin-right: 4px;
    color: #f5e211;
  }
  .rating_r_1 i:first-child::before{content: "\f005";}
  .rating_r_2 i:first-child::before{content: "\f005";}
  .rating_r_2 i:nth-child(2)::before{content: "\f005";}
  .rating_r_3 i:first-child::before{content: "\f005";}
  .rating_r_3 i:nth-child(2)::before{content: "\f005";}
  .rating_r_3 i:nth-child(3)::before{content: "\f005";}
  .rating_r_4 i:first-child::before{content: "\f005";}
  .rating_r_4 i:nth-child(2)::before{content: "\f005";}
  .rating_r_4 i:nth-child(3)::before{content: "\f005";}
  .rating_r_4 i:nth-child(4)::before{content: "\f005";}
  .rating_r_5 i:first-child::before{content: "\f005";}
  .rating_r_5 i:nth-child(2)::before{content: "\f005";}
  .rating_r_5 i:nth-child(3)::before{content: "\f005";}
  .rating_r_5 i:nth-child(4)::before{content: "\f005";}
  .rating_r_5 i:nth-child(5)::before{content: "\f005";}
  .banner_2_button
  {
    margin-top: 43px;
  }
  .banner_2_dots
  {
    position: absolute;
    bottom: 40px;
    left: calc((100% - 1170px) / 2 + 15px);
    z-index: 1000000;
  }
  .banner_2_dots .owl-dot
  {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #FFFFFF;
    border-radius: 50%;
    margin-right: 16px;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  .banner_2_dots .owl-dot:last-child
  {
    margin-right: 0px;
  }
  .banner_2_dots .owl-dot.active
  {
    background: #0e8ce4;
    box-shadow: none;
  }
</style>



<!-- Banner 2 -->
<div class="banner_2">
  <div class="banner_2_background" style="background-image:url(images/banner_2_background.jpg)"></div>
  <div class="banner_2_container">
    <div class="banner_2_dots"></div>
    <!-- Banner 2 Slider -->

    <div class="owl-carousel owl-theme banner_2_slider">

      <!-- Banner 2 Slider Item -->
      <div class="owl-item">
        <div class="banner_2_item">
          <div class="container fill_height">
            <div class="row fill_height">
              <div class="col-lg-4 col-md-6 fill_height">
                <div class="banner_2_content">
                  <div class="banner_2_category">Laptops</div>
                  <div class="banner_2_title">MacBook Air 13</div>
                  <div class="banner_2_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</div>
                  <div class="rating_r rating_r_4 banner_2_rating"><i></i><i></i><i></i><i></i><i></i></div>
                  <div class="button banner_2_button"><a href="#">Explore</a></div>
                </div>

              </div>
              <div class="col-lg-8 col-md-6 fill_height">
                <div class="banner_2_image_container">
                  <div class="banner_2_image"><img src="images/banner_2_product.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner 2 Slider Item -->
      <div class="owl-item">
        <div class="banner_2_item">
          <div class="container fill_height">
            <div class="row fill_height">
              <div class="col-lg-4 col-md-6 fill_height">
                <div class="banner_2_content">
                  <div class="banner_2_category">Laptops</div>
                  <div class="banner_2_title">MacBook Air 13</div>
                  <div class="banner_2_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</div>
                  <div class="rating_r rating_r_4 banner_2_rating"><i></i><i></i><i></i><i></i><i></i></div>
                  <div class="button banner_2_button"><a href="#">Explore</a></div>
                </div>

              </div>
              <div class="col-lg-8 col-md-6 fill_height">
                <div class="banner_2_image_container">
                  <div class="banner_2_image"><img src="images/banner_2_product.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner 2 Slider Item -->
      <div class="owl-item">
        <div class="banner_2_item">
          <div class="container fill_height">
            <div class="row fill_height">
              <div class="col-lg-4 col-md-6 fill_height">
                <div class="banner_2_content">
                  <div class="banner_2_category">Laptops</div>
                  <div class="banner_2_title">MacBook Air 13</div>
                  <div class="banner_2_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</div>
                  <div class="rating_r rating_r_4 banner_2_rating"><i></i><i></i><i></i><i></i><i></i></div>
                  <div class="button banner_2_button"><a href="#">Explore</a></div>
                </div>

              </div>
              <div class="col-lg-8 col-md-6 fill_height">
                <div class="banner_2_image_container">
                  <div class="banner_2_image"><img src="images/banner_2_product.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
