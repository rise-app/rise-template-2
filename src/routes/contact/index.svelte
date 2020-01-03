<script>
  import * as config from 'config'

  let brand = config.brand

</script>

<style type="text/scss">

/*********************************
4. Contact
*********************************/

  .contact_info
  {
    width: 100%;
    padding-top: 70px;
  }
  .contact_info_item
  {
    width: calc((100% - 60px) / 3);
    height: 100px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-left: 32px;
    padding-right: 15px;
  }
  .contact_info_image
  {
    width: 35px;
    height: 35px;
    text-align: center;
  }
  .contact_info_image img
  {
    max-width: 100%;
  }
  .contact_info_content
  {
    padding-left: 17px;
  }
  .contact_info_title
  {
    font-weight: 500;
  }
  .contact_info_text
  {
    font-size: 12px;
    color: rgba(0,0,0,0.5);
  }

  /*********************************
  4.1 Contact Form
  *********************************/

  .contact_form
  {
    padding-top: 85px;
  }
  .contact_form_container
  {

  }
  .contact_form_title
  {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 37px;
  }
  .contact_form_inputs
  {
    margin-bottom: 30px;
  }
  .input_field
  {
    width: calc((100% - 60px) / 3);
    height: 50px;
    padding-left: 25px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    outline: none;
    color: #0e8ce4;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .input_field:focus,
  .text_field:focus
  {
    border-color: #b2b2b2;
  }
  .input_field:hover,
  .text_field:hover
  {
    border-color: #b2b2b2;
  }
  .input_field::-webkit-input-placeholder,
  .text_field::-webkit-input-placeholder
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.3);
  }
  .input_field:-moz-placeholder,
  .text_field:-moz-placeholder
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.3);
  }
  .input_field::-moz-placeholder,
  .text_field::-moz-placeholder
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.3);
  }
  .input_field:-ms-input-placeholder,
  .text_field:-ms-input-placeholder
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.3);
  }
  .input_field::input-placeholder,
  .text_field::input-placeholder
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.3);
  }
  .text_field
  {
    width: 100%;
    height: 160px;
    padding-left: 25px;
    padding-top: 15px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    color: #0e8ce4;
    outline: none;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .contact_submit_button
  {
    padding-left: 35px;
    padding-right: 35px;
    color: #FFFFFF;
    font-size: 18px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 24px;
  }
  .panel
  {
    width: 100%;
    height: 50px;
    background: #fafafa;
    margin-top: 120px;
  }

  /*********************************
  4.2 Contact Map
  *********************************/

  .contact_map
  {
    width: 100%;
  }
  .google_map
  {
    width: 100%;
    height: 400px;
  }
  .map_container
  {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #map
  {
    width: 100%;
    height: calc(100% + 30px);
  }


</style>

<!-- Contact Info -->

<div class="contact_info">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">

          <!-- Contact Item -->
          <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
            <div class="contact_info_image"><img src="images/contact_1.png" alt=""></div>
            <div class="contact_info_content">
              <div class="contact_info_title">Phone</div>
              <div class="contact_info_text">{ brand.phone }</div>
            </div>
          </div>

          <!-- Contact Item -->
          <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
            <div class="contact_info_image"><img src="images/contact_2.png" alt=""></div>
            <div class="contact_info_content">
              <div class="contact_info_title">Email</div>
              <div class="contact_info_text">{ brand.email }</div>
            </div>
          </div>

          <!-- Contact Item -->
          <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
            <div class="contact_info_image"><img src="images/contact_3.png" alt=""></div>
            <div class="contact_info_content">
              <div class="contact_info_title">Address</div>
              <div class="contact_info_text">
                {brand.address.line_1} {brand.address.line_2} {brand.address.line_3} {brand.address.city} {brand.address.province_code} {brand.address.postal_code}, {brand.address.country_code }</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- Contact Form -->

<div class="contact_form">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="contact_form_container">
          <div class="contact_form_title">Get in Touch</div>

          <form action="#" id="contact_form">
            <div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
              <input type="text" id="contact_form_name" class="contact_form_name input_field" placeholder="Your name" required="required" data-error="Name is required.">
              <input type="text" id="contact_form_email" class="contact_form_email input_field" placeholder="Your email" required="required" data-error="Email is required.">
              <input type="text" id="contact_form_phone" class="contact_form_phone input_field" placeholder="Your phone number">
            </div>
            <div class="contact_form_text">
              <textarea id="contact_form_message" class="text_field contact_form_message" name="message" rows="4" placeholder="Message" required="required" data-error="Please, write us a message."></textarea>
            </div>
            <div class="contact_form_button">
              <button type="submit" class="button contact_submit_button">Send Message</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
  <div class="panel"></div>
</div>

<!-- Map -->

<div class="contact_map">
  <div id="google_map" class="google_map">
    <div class="map_container">
      <div id="map"></div>
    </div>
  </div>
</div>
