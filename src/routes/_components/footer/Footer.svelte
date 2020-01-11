<script>
  export let
    segment,
    brand = {},
    user,
    customer,
    cart,
    primary_navigation_campaigns = []


  // LOGIC
  let copyYear = new Date().getFullYear()

  let isLoggedIn = false
  $: isLoggedIn = !!(user && user.user_uuid)


</script>

<style type="text/scss">
/*********************************
6. Footer
*********************************/

  .footer
  {
    padding-top: 52px;
    padding-bottom: 40px;
  }

  .footer .logo_container
  {
    height: auto;
    margin-bottom: 18px;
    margin-top: -10px;
  }
  .footer .logo
  {
    top: auto;
    /*-webkit-transform: transform: none;*/
    /*-moz-transform: transform: none;*/
    /*-ms-transform: transform: none;*/
    /*-o-transform: transform: none;*/
    transform: none;
  }
  .footer .logo a
  {
    color: #000000;
  }
  .footer_title
  {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
  }
  .footer_phone
  {
    font-size: 18px;
    font-weight: 500;
    color: #0e8ce4;
    margin-top: 13px;
  }
  .footer_contact_text
  {
    margin-top: 10px;
  }
  .footer_contact_text p
  {
    margin-bottom: 0px;
  }
  .footer_social
  {
    margin-top: 27px;
    padding: 0px;
  }
  .footer_social ul li
  {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #fafafa;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    margin-right: 16px;
    margin-top: 5px;
    text-align: center;
  }
  .footer_social ul li i
  {
    color: #000000;
    line-height: 30px;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .footer_social ul li:hover i
  {
    color: #0e8ce4;
  }
  .footer_subtitle
  {
    font-size: 12px;
    color: #000000;
  }
  .footer_column ul:first-of-type
  {
    margin-top: 21px;
  }
  .footer_column ul
  {
    margin-top: 7px;
    padding: 0px;
  }
  .footer_list li
  {
    margin-bottom: 6px;
  }
  .footer_list li a
  {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0,0,0,0.4);
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .footer_list li a:hover
  {
    color: #0e8ce4;
  }
  .footer_list_2
  {
    margin-top: 42px !important;
  }

  .copyright
  {
    width: 100%;
    background: #fafafa;
  }
  .copyright_container
  {
    width: 100%;
    height: 56px;
  }
  .copyright_content
  {
    font-size: 12px;
    color: rgba(0,0,0,0.6);
  }
  .copyright_content span
  {
    font-weight: 500;
  }
  .logos
  {

  }
  .logos_list li
  {
    display: inline-block;
    margin-right: 16px;
  }
  .logos_list li:last-child
  {
    margin-right: 0px;
  }
  .disclaimer
  {
    width: 100%;
    background: #fafafa;
  }
  .disclaimer_container
  {
    width: 100%;
    // height: 56px;
    border:3px;
    border-color:#12b899;
    padding: 1em;
  }
  .disclaimer_content
  {
    font-size: 12px;
    color: rgba(0,0,0,0.6);
  }
  .disclaimer_content span
  {
    font-weight: 500;
  }
</style>

<!-- Footer -->

<footer class="footer">
  <div class="container">
    <div class="row">

      <div class="col-lg-3 footer_col">
        <div class="footer_column footer_contact">
          <div class="logo_container">
            <div class="logo">
              <a href="/">{ brand.name }</a>
            </div>
          </div>
          <div class="footer_title">Got Question? Call Us 24/7</div>
          <div class="footer_phone">{ brand.phone }</div>
          <div class="footer_contact_text">
            <p>{brand.address.line_1}</p>
            <p>{brand.address.city} {brand.address.province_code} {brand.address.postal_code}, {brand.address.country_code }</p>
          </div>
          <div class="footer_social">
            <ul>
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i class="fab fa-instagram"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-youtube"></i></a></li>
              <li><a href="#"><i class="fab fa-google"></i></a></li>
              <li><a href="#"><i class="fab fa-vimeo-v"></i></a></li>
              <li><a href="#"><i class="fab fa-github"></i></a></li>
              <li><a href="#"><i class="fab fa-snapchat"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-lg-2 offset-lg-2">
        <div class="footer_column">
          <div class="footer_title">Find it Fast</div>
          <ul class="footer_list">
            {#each primary_navigation_campaigns as campaign, i (campaign.collection_uuid)}
            <li>
              <a href="/shop/{campaign.collection_handle || campaign.handle }">
                { campaign.title }
              </a>
            </li>
            {/each}
<!--            <li><a href="#">Computers & Laptops</a></li>-->
<!--            <li><a href="#">Cameras & Photos</a></li>-->
<!--            <li><a href="#">Hardware</a></li>-->
<!--            <li><a href="#">Smartphones & Tablets</a></li>-->
<!--            <li><a href="#">TV & Audio</a></li>-->
          </ul>
<!--          <div class="footer_subtitle">Gadgets</div>-->
<!--          <ul class="footer_list">-->
<!--            <li><a href="#">Car Electronics</a></li>-->
<!--          </ul>-->
        </div>
      </div>

      <div class="col-lg-2">
        <div class="footer_column">
        <!-- <div class="footer_title">Quick Links</div> -->
          <ul class="footer_list footer_list_2">
           <!-- <li><a href="#">Influencer Area</a></li> -->
           <!-- <li><a href="#">My Account</a></li> -->
           <!-- <li><a href="/wishlist">Wish List</a></li> -->
<!--            <li><a href="#">Hardware</a></li>-->
<!--            <li><a href="#">Computers & Laptops</a></li> -->
          </ul>
        </div>
      </div>

      <div class="col-lg-2">
        <div class="footer_column">
          <div class="footer_title">Customer Care</div>
          <ul class="footer_list">
            {#if isLoggedIn }
            <li><a href="/account">My Account</a></li>
            {/if}
            {#if isLoggedIn }
            <li><a href="#">Influencer Area</a></li>
            {/if}
            {#if isLoggedIn }
            <li><a href="/account/orders">Order Tracking</a></li>
            {/if}
            <li><a href="/wishlist">Wish List</a></li>
            <li><a href="/help/service">Customer Services</a></li>
            <li><a href="/help/returns">Returns / Exchange</a></li>
            <li><a href="/help/faq">FAQs</a></li>
            <li><a href="/help/support">Product Support</a></li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</footer>

<!-- Disclaimer -->

<div class="disclaimer">
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="disclaimer_container d-flex flex-sm-row flex-column align-items-center justify-content-start">
          <div class="disclaimer_content">
          All products contain less than .3% THC.his product is not for use by or sale to persons under the age of 18 or the age of majority in your state or province of residence, whichever is older (e.g., 21 years of age). This product should be used only as directed on the label. It should not be used if you are pregnant or nursing. Consult with a physician before use if you have a serious medical condition or use prescription medications. A Doctor's advice should be sought before using this and any supplemental dietary product. All trademarks and copyrights are property of their respective owners. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure or prevent any disease. By using this site, you agree to follow the Privacy Policy and all Terms & Conditions printed on this site. Void Where Prohibited by Law.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Copyright -->

<div class="copyright">
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="copyright_container d-flex flex-sm-row flex-column align-items-center justify-content-start">
          <div class="copyright_content">
            Copyright &copy; { copyYear } All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://rise.store" target="_blank">RiSE</a>
          </div>
          <div class="logos ml-sm-auto">
            <ul class="logos_list">
              <li>
                <a href="#"><img src="images/logos_1.png" alt=""></a>
              </li>
              <li>
                <a href="#"><img src="images/logos_2.png" alt=""></a>
              </li>
              <li>
                <a href="#"><img src="images/logos_3.png" alt=""></a>
              </li>
              <li>
                <a href="#"><img src="images/logos_4.png" alt=""></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
