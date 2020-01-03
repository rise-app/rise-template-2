<script>
  export let campaigns = [], term = null
</script>

<style type="text/scss">
  .header_search
  {
    height: 175px;
  }
  .header_search_content
  {
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .header_search_form_container
  {
    width: 100%;
    height: 50px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
  }
  .header_search_form
  {
    width: 100%;
    height: 100%;
  }
  .header_search_input
  {
    display: block;
    position: relative;
    width: calc((100% - 50px) * 0.601);
    height: 100%;
    line-height: 50px;
    border: none !important;
    outline: none !important;
    padding-left: 26px;
    color: #7f7f7f;
    float: left;
  }
  .header_search_input::-webkit-input-placeholder
  {
    font-size: 16px !important;
    font-weight: 300;
    line-height: 50px;
    color: #a3a3a3 !important;
  }
  .header_search_input:-moz-placeholder /* older Firefox*/
  {
    font-size: 16px !important;
    font-weight: 300;
    line-height: 50px;
    color: #a3a3a3 !important;
  }
  .header_search_input::-moz-placeholder /* Firefox 19+ */
  {
    font-size: 16px !important;
    font-weight: 300;
    line-height: 50px;
    color: #a3a3a3 !important;
  }
  .header_search_input:-ms-input-placeholder
  {
    font-size: 16px !important;
    font-weight: 300;
    line-height: 50px;
    color: #a3a3a3 !important;
  }
  .header_search_input::input-placeholder
  {
    font-size: 16px !important;
    font-weight: 300;
    line-height: 50px;
    color: #a3a3a3 !important;
  }
  .custom_dropdown
  {
    width: calc((100% - 50px) * 0.399);
    height: 50px;
    float: left;
    padding-left: 26px;
  }
  .custom_dropdown::before
  {
    display: block;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
    width: 1px;
    height: 28px;
    background: #e5e5e5;
    content: '';
  }
  .custom_dropdown_list i
  {
    display: inline-block;
    color: #a3a3a3;
    font-size: 10px;
    margin-left: 3px;
    -webkit-transform: translateY(-1px);
    -moz-transform: translateY(-1px);
    -ms-transform: translateY(-1px);
    -o-transform: translateY(-1px);
    transform: translateY(-1px);
  }
  .custom_dropdown_placeholder
  {
    display: inline-block;
    font-size: 16px;
    font-weight: 300;
    color: #a3a3a3;
    line-height: 48px;
    cursor: pointer;
  }
  .custom_dropdown_placeholder i
  {

  }
  .custom_list
  {
    text-align: left;
    position: absolute;
    padding: 0;
    top: 75px;
    left: -15px;
    visibility: hidden;
    opacity: 0;
    box-shadow: 0 0 25px rgba(63, 78, 100, 0.15);
    -webkit-transition: opacity 0.2s ease;
    -moz-transition: opacity 0.2s ease;
    -ms-transition: opacity 0.2s ease;
    -o-transition: opacity 0.2s ease;
    transition: all 0.2s ease;
  }
  .custom_list.active
  {
    visibility: visible;
    opacity: 1;
    top: 50px;
    box-shadow: 0 0 25px rgba(63, 78, 100, 0.15);
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: all 0.3s ease;
  }
  .custom_list li
  {
    height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    background: #FFFFFF;
  }
  .custom_list li a
  {
    display: block;
    color: #a3a3a3;
    line-height: 35px;
    border-bottom: solid 1px #ededed;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .custom_list li a:hover
  {
    color: #0e8ce4;
  }
  select
  {
    display: inline;
    border: 0;
    width: auto;
    margin-left: 10px;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-bottom: 2px solid #555;
    color: #7b00ff;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  select:hover
  {
    cursor: pointer;
  }
  select option
  {
    border: 0;
    border-bottom: 1px solid #555;
    padding: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .header_search_button
  {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    background: #0e8ce4;
    border: none;
    outline: none;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>

<div class="header_search">
  <div class="header_search_content">
    <div class="header_search_form_container">
      <form action="#" class="header_search_form clearfix">
        <input
          type="search"
          required="required"
          class="header_search_input"
          placeholder="Search for offers..."
        >
        <div class="custom_dropdown">
          <div class="custom_dropdown_list">
            <span class="custom_dropdown_placeholder clc">All Categories</span>
            <i class="fas fa-chevron-down"></i>
            <ul class="custom_list clc">
              <li>
                <a class="clc" href="#">
                  All Categories
                </a>
              </li>
              {#each campaigns as campaign, i (campaign.collection_uuid) }
              <li>
                <a class="clc" href="/shop/{campaign.collection_handle}">
                  { campaign.title }
                </a>
              </li>
              {/each}
            </ul>
          </div>
        </div>
        <button type="submit" class="header_search_button trans_300" value="Submit">
          <img src="images/search.png" alt="">
        </button>
      </form>
    </div>
  </div>
</div>
