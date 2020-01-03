<style type="text/scss">
  /*********************************
4. Wishlist
*********************************/

  .wishlist_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }
  .wishlist_title
  {
    font-size: 30px;
    font-weight: 500;
  }
  .wishlist_items
  {
    margin-top: 67px;
  }
  .wishlist_list
  {
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
  }
  .wishlist_item
  {
    width: 100%;
    padding: 15px;
    padding-right: 46px;
  }
  .wishlist_item_image
  {
    width: 133px;
    height: 133px;
    float: left;
  }
  .wishlist_item_image img
  {
    max-width: 100%;
  }
  .wishlist_item_info
  {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px;
  }
  .wishlist_item_name
  {
    margin-left: 7.53%;
  }
  .wishlist_item_title
  {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
  }
  .wishlist_item_text
  {
    font-size: 18px;
    margin-top: 35px;
  }
  .wishlist_item_text span
  {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 11px;
    -webkit-transform: translateY(4px);
    -moz-transform: translateY(4px);
    -ms-transform: translateY(4px);
    -o-transform: translateY(4px);
    transform: translateY(4px);
  }
  .wishlist_item_price
  {
    text-align: right;
  }
  .wishlist_item_total
  {
    text-align: right;
  }
  .order_total
  {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-right: 46px;
    padding-left: 15px;
  }
  .order_total_title
  {
    display: inline-block;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
    line-height: 60px;
  }
  .order_total_amount
  {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    margin-left: 26px;
    line-height: 60px;
  }
  .wishlist_buttons
  {
    margin-top: 60px;
    text-align: right;
  }
  .wishlist_button_clear
  {
    display: inline-block;
    border: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    color: rgba(0,0,0,0.5);
    background: #FFFFFF;
    border: solid 1px #b2b2b2;
    padding-left: 35px;
    padding-right: 35px;
    outline: none;
    cursor: pointer;
    margin-right: 26px;
  }
  .wishlist_button_clear:hover
  {
    border-color: #0e8ce4;
    color: #0e8ce4;
  }
  .wishlist_button_checkout
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
    vertical-align: top;
  }
</style>

<!-- Wishlist -->

<div class="wishlist_section">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="wishlist_container">
          <div class="wishlist_title">Shopping Wishlist</div>
          <div class="wishlist_items">
            <ul class="wishlist_list">
              <li class="wishlist_item clearfix">
                <div class="wishlist_item_image"><img src="images/shopping_wishlist.jpg" alt=""></div>
                <div class="wishlist_item_info d-flex flex-md-row flex-column justify-content-between">
                  <div class="wishlist_item_name wishlist_info_col">
                    <div class="wishlist_item_title">Name</div>
                    <div class="wishlist_item_text">MacBook Air 13</div>
                  </div>
                  <div class="wishlist_item_color wishlist_info_col">
                    <div class="wishlist_item_title">Color</div>
                    <div class="wishlist_item_text"><span style="background-color:#999999;"></span>Silver</div>
                  </div>
                  <div class="wishlist_item_quantity wishlist_info_col">
                    <div class="wishlist_item_title">Quantity</div>
                    <div class="wishlist_item_text">1</div>
                  </div>
                  <div class="wishlist_item_price wishlist_info_col">
                    <div class="wishlist_item_title">Price</div>
                    <div class="wishlist_item_text">$2000</div>
                  </div>
                  <div class="wishlist_item_total wishlist_info_col">
                    <div class="wishlist_item_title">Total</div>
                    <div class="wishlist_item_text">$2000</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Order Total -->
          <div class="order_total">
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Order Total:</div>
              <div class="order_total_amount">$2000</div>
            </div>
          </div>

          <div class="wishlist_buttons">
            <button type="button" class="button wishlist_button_clear">Add to Wishlist</button>
            <button type="button" class="button wishlist_button_checkout">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
