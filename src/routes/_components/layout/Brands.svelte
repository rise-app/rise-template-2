<script>
  export let brands_query = {},
    brands_campaigns = [],
    brands_campaigns_total = 0,
    brands_campaigns_offset = 0,
    brands_campaigns_limit = 10

</script>
<style type="text/scss">
@import "../../../theme/variables";

/*********************************
15. Brands
*********************************/

  .brands
  {
    width: 100%;
    padding-top: 90px;
    padding-bottom: 90px;
  }
  .brands_slider_container
  {
    height: 130px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-left: 97px;
    padding-right: 97px;
  }
  .brands_slider
  {
    height: 100%;
  }
  .brands_item
  {
    height: 100%;
  }
  .brands_item img
  {
    max-width: 100%;
  }
  .brands_nav
  {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 5px;
    cursor: pointer;
  }
  .brands_nav i
  {
    color: #e5e5e5;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .brands_nav:hover i
  {
    color: #676767;
  }
  .brands_prev
  {
    left: 40px;
  }
  .brands_next
  {
    right: 40px;
  }
</style>
<!-- Brands -->

<div class="brands">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="brands_slider_container">

          <!-- Brands Slider -->

          <div class="owl-carousel owl-theme brands_slider">

            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_1.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_2.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_3.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_4.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_5.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_6.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_7.jpg" alt=""></div></div>
            <div class="owl-item"><div class="brands_item d-flex flex-column justify-content-center"><img src="images/brands_8.jpg" alt=""></div></div>

          </div>

          <!-- Brands Slider Navigation -->
          <div class="brands_nav brands_prev"><i class="fas fa-chevron-left"></i></div>
          <div class="brands_nav brands_next"><i class="fas fa-chevron-right"></i></div>

        </div>
      </div>
    </div>
  </div>
</div>
