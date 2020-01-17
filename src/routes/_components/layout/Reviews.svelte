<style type="text/scss">
  @import "../../../theme/variables";
  /*********************************
  13. Latest Reviews
  *********************************/

  .reviews
  {
    padding-top: 96px;
    padding-bottom: 125px;
  }
  .reviews_title_container
  {
    border-bottom: solid 1px #dadada;
  }
  .reviews_title
  {
    font-weight: 500;
    margin-bottom: 14px;
  }
  .reviews_all
  {
    position: absolute;
    right: 0;
    bottom: 14px;
  }
  .reviews_all a
  {
    font-size: 10px;
    color: #0e8ce4;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .reviews_all a:hover
  {
    opacity: 0.8;
  }
  .reviews_slider_container
  {
    padding-top: 37px;
  }
  .review
  {
    width: 100%;
  }
  .review_image
  {
    width: 115px;
    height: 115px;
  }
  .review_image img
  {
    max-width: 100%;
  }
  .review_content
  {
    padding-left: 30px;
    margin-top: -4px;
  }
  .review_name
  {
    font-size: 16px;
    font-weight: 500;
  }
  .review_rating_container
  {
    margin-top: 1px;
  }
  .review_rating
  {
    display: inline-block;
  }
  .review_rating i::before
  {
    font-size: 13px;
    margin-right: 8px;
  }
  .review_time
  {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .review_text
  {
    margin-top: 12px;
  }
  .review_text p:last-child
  {
    margin-bottom: 0px;
  }
  .reviews_dots
  {
    position: absolute;
    bottom: -69px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 10;
  }
  .reviews_dots .owl-dot
  {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #e8e8e8;
    border-radius: 50%;
    margin-right: 16px;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  .reviews_dots .owl-dot:last-child
  {
    margin-right: 0px;
  }
  .reviews_dots .owl-dot.active
  {
    background: #0e8ce4;
    box-shadow: none;
  }

</style>
<!-- Reviews -->

<div class="reviews">
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="reviews_title_container">
          <h3 class="reviews_title">Latest Reviews</h3>
          <div class="reviews_all ml-auto">
            <a href="/reviews">view all <span>reviews</span></a>
          </div>
        </div>

        <div class="reviews_slider_container">

          <!-- Reviews Slider -->
          <div class="owl-carousel owl-theme reviews_slider">

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_1.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Roberto Sanchez</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_2.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Brandon Flowers</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_3.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Emilia Clarke</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_1.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Roberto Sanchez</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_2.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Brandon Flowers</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

            <!-- Reviews Slider Item -->
            <div class="owl-item">
              <div class="review d-flex flex-row align-items-start justify-content-start">
                <div><div class="review_image"><img src="images/review_3.jpg" alt=""></div></div>
                <div class="review_content">
                  <div class="review_name">Emilia Clarke</div>
                  <div class="review_rating_container">
                    <div class="rating_r rating_r_4 review_rating"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="review_time">2 day ago</div>
                  </div>
                  <div class="review_text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</p></div>
                </div>
              </div>
            </div>

          </div>
          <div class="reviews_dots"></div>
        </div>
      </div>
    </div>
  </div>
</div>
