<script context="module">
  export async function preload({params, query}) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const post = await res.json();

    const res2 = await this.fetch(`blog.json`)

    const posts = await res2.json();

    if (res.status === 200 && res2.status === 200) {
      return {
        posts: posts,
        post: post
      };
    } else {
      this.error(res.status, post.message);
    }
  }
</script>

<script>
  export let posts = [], post;
</script>

<style type="text/scss">
  @import "../../../theme/variables";

  .single_post
  {
    padding-top: 85px;
  }
  .single_post_title
  {
    font-size: 30px;
    font-weight: 500;
  }
  .single_post_text
  {
    margin-top: 33px;
  }
  .single_post_text p
  {
    font-size: 18px;
    font-weight: 300;
    color: rgba(0,0,0,0.7);
    line-height: 2;
  }
  .single_post_text p:not(:first-of-type)
  {
    margin-top: 42px;
  }
  .single_post_quote
  {
    margin-top: 43px;
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 35px;
    padding-bottom: 40px;
  }
  .quote_image
  {

  }
  .quote_text
  {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.7);
    margin-top: 28px;
    line-height: 1.875
  }
  .quote_name
  {
    font-size: 16px;
    font-weight: 500;
    margin-top: 23px;
  }
  .blog
  {
    padding-top: 80px;
    padding-bottom: 100px;
    background: #FFFFFF;
  }
  .blog_posts
  {
    width: 100%;
    flex-wrap: wrap;
  }
  .blog_post
  {
    width: calc((100% - 60px) / 3);
    height: 290px;
    margin-bottom: 30px;
    border-radius: 5px;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
    z-index: 0;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .blog_post:hover
  {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    z-index: 1;
  }
  .blog_image
  {
    width: 100%;
    height: 160px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .blog_text
  {
    padding-left: 31px;
    padding-right: 31px;
    padding-top: 21px;
    padding-bottom: 30px;
    font-size: 18px;
    font-weight: 500;
  }
  .blog_button
  {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 48px;
    background: #0e8ce4;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 200ms ease;
    -moz-transition: all 200ms ease;
    -ms-transition: all 200ms ease;
    -o-transition: all 200ms ease;
    transition: all 200ms ease;
  }
  .blog_button:hover
  {
    background: #0982d7;
  }
  .blog_post:hover .blog_button
  {
    visibility: visible;
    opacity: 1;
  }
  .blog_button a
  {
    display: block;
    color: #FFFFFF;
    line-height: 48px;
    font-size: 18px;
  }

  /************
1. 1600px
************/

  @media only screen and (max-width: 1600px)
  {

  }

  /************
  2. 1440px
  ************/

  @media only screen and (max-width: 1440px)
  {

  }

  /************
  3. 1380px
  ************/

  @media only screen and (max-width: 1380px)
  {

  }

  /************
  3. 1280px
  ************/

  @media only screen and (max-width: 1280px)
  {

  }

  /************
  4. 1199px
  ************/

  @media only screen and (max-width: 1199px)
  {
    .cat_menu_container
    {
      width: 211px;
      padding-left: 25px;
    }
    .main_nav_dropdown li
    {
      margin-right: 30px;
    }
    .main_nav_dropdown li a
    {
      font-size: 16px;
    }
    .char_item
    {
      padding-left: 25px;
    }
    .newsletter_form
    {
      width: 456px;
    }
  }

  /************
  4. 1100px
  ************/

  @media only screen and (max-width: 1100px)
  {

  }

  /************
  5. 1024px
  ************/

  @media only screen and (max-width: 1024px)
  {

  }

  /************
  6. 991px
  ************/

  @media only screen and (max-width: 991px)
  {
    .top_bar
    {
      /*display: none;*/
    }
    .header_search
    {
      height: 50px;
    }
    .custom_dropdown
    {
      text-align: left;
    }
    .main_nav
    {
      margin-top: 56px;
    }
    .main_nav_menu
    {
      display: none;
    }
    .logo_container,
    .wishlist_cart
    {
      height: 125px;
    }
    .main_nav_content
    {
      background: #0e8ce4;
    }
    .menu_trigger_container
    {
      display: block;
    }
    .top_bar
    {
      height: 40px;
    }
    .top_bar_contact_item
    {
      font-size: 12px;
      margin-right: 20px;
      line-height: 40px;
    }
    .top_bar_contact_item a
    {
      font-size: 12px;
      line-height: 40px;
    }
    .top_bar_icon
    {
      margin-right: 4px;
    }
    .top_bar_icon img
    {
      width: 70%;
    }
    .top_bar_menu
    {
      display: none;
    }
    .top_bar_user a
    {
      font-size: 12px;
      line-height: 40px;
    }
    .user_icon
    {
      -webkit-transform: translateY(-1px);
      -moz-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
      -o-transform: translateY(-1px);
      transform: translateY(-1px);
      width: 12px;
    }
    .cat_menu_container ul
    {
      visibility: hidden;
      opacity: 0;
    }
    .char_col:not(:last-child):not(:nth-child(3))
    {
      margin-bottom: 30px;
    }
    .char_item
    {
      padding-left: 36px;
    }
    .blog_post
    {
      width: calc((100% - 30px) / 2);
    }
    .newsletter_title_container
    {
      width: 100%;
    }
    .newsletter_content
    {
      width: 100%;
      margin-top: 30px;
    }
    .newsletter_form
    {
      width: calc(100% - 114px);
    }
    .footer_col:not(:last-child)
    {
      margin-bottom: 40px;
    }
  }

  /************
  7. 959px
  ************/

  @media only screen and (max-width: 959px)
  {

  }

  /************
  8. 880px
  ************/

  @media only screen and (max-width: 880px)
  {

  }

  /************
  9. 768px
  ************/

  @media only screen and (max-width: 768px)
  {

  }

  /************
  10. 767px
  ************/

  @media only screen and (max-width: 767px)
  {
    .header_search
    {
      display: none;
    }
    .page_menu_search
    {
      display: block;
    }
    .main_nav
    {
      margin-top: 0px;
    }
    .char_col:nth-child(3)
    {
      margin-bottom: 30px;
    }
    .char_item
    {
      padding-left: 36px;
    }
    .blog_post
    {
      width: 100%;
    }
  }

  /************
  11. 575px
  ************/

  @media only screen and (max-width: 575px)
  {
    h2{font-size: 24px;}
    p{font-size: 13px;}
    .top_bar
    {
      display: none;
    }
    .logo_container, .wishlist_cart
    {
      height: 72px;
    }
    .logo a
    {
      font-size: 24px;
    }
    .cat_menu_container
    {
      width: auto;
      padding-right: 15px;
    }
    .cat_menu_text
    {
      font-size: 13px;
      margin-left: 12px;
    }
    .cat_burger
    {
      width: 16px;
      height: 12px;
    }
    .cat_burger span:nth-child(2)
    {
      top: 5px;
    }
    .cat_burger span:nth-child(3)
    {
      top: 10px;
    }
    .menu_trigger_text
    {
      font-size: 13px;
      margin-right: 10px;
    }
    .wishlist
    {
      margin-right: 23px;
    }
    .wishlist_content
    {
      margin-left: 6px;
    }
    .wishlist_text
    {
      display: none;
    }
    .cart_text
    {
      display: none;
    }
    .wishlist_text a,
    .cart_text a
    {
      font-size: 14px;
    }
    .wishlist_count,
    .cart_price
    {
      font-size: 12px;
    }
    .wishlist_icon
    {
      width: 20px;
    }
    .cart_content
    {
      margin-left: 18px;
    }
    .cart_icon
    {
      width: 17px;
    }
    .cart_count
    {
      width: 21px;
      height: 21px;
    }
    .cart_count span
    {
      line-height: 21px;
    }
    .top_bar_user
    {
      margin-left: 0px;
    }
    .header_search
    {
      display: none;
    }
    .main_nav
    {
      width: calc(100% + 30px);
      margin-left: -15px;
      margin-right: -15px;
      margin-top: 0px;
    }
    .main_nav_content
    {
      height: 35px;
    }
    .cat_menu_container
    {
      padding-left: 15px;
    }
    .menu_trigger_container
    {
      padding-right: 15px;
    }
    .cat_menu li
    {
      height: 36px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .cat_menu li a
    {
      font-size: 13px;
      line-height: 36px;
    }
    .cat_menu li ul
    {
      left: 50%;
      z-index: 10;
    }
    .page_menu_item > a
    {
      font-size: 12px;
    }
    .page_menu_selection li a
    {
      font-size: 12px;
    }
    .banner_product_image
    {
      right: 15px;
    }
    .button
    {
      height: 32px;
    }
    .button a
    {
      font-size: 12px;
      line-height: 32px;
      padding-left: 25px;
      padding-right: 25px;
    }
    .rating_r i::before
    {
      font-size: 14px;
    }
    .blog_text
    {
      font-size: 16px;
    }
    .single_post_quote
    {
      padding-left: 40px;
      padding-right: 40px;
    }
    .newsletter_form
    {
      float: none;
      width: 100%;
    }
    .newsletter_title_container
    {
      padding-left: 0px;
      text-align: center;
    }
    .newsletter_unsubscribe_link
    {
      float: none;
      text-align: center;
      margin-top: 10px;
      height: auto;
    }
    .newsletter_unsubscribe_link a
    {
      line-height: 1;
    }
    .newsletter_title
    {
      font-size: 16px;
    }
    .newsletter_icon
    {
      position: relative;
      width: 40px;
      top: auto;
      -webkit-transform: translate(-50%, 0px);
      -moz-transform: translate(-50%, 0px);
      -ms-transform: translate(-50%, 0px);
      -o-transform: translate(-50%, 0px);
      transform: translate(-50%, 0px);
      left: 50%;
      margin-bottom: 20px;
    }
    .newsletter_button
    {
      position: relative;
      top: auto;
      right: auto;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 113px;
      height: 40px;
      background: #0e8ce4;
      color: #FFFFFF;
      line-height: 40px;
      font-size: 12px;
      border: none;
      outline: none;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
    }
    .newsletter_input
    {
      font-size: 13px;
      padding-left: 15px;
      height: 40px;
      line-height: 40px;
    }
    .newsletter_input::-webkit-input-placeholder
    {
      font-size: 13px;
    }
    .newsletter_input:-moz-placeholder
    {
      font-size: 13px;
    }
    .newsletter_input::-moz-placeholder
    {
      font-size: 13px;
    }
    .newsletter_input:-ms-input-placeholder
    {
      font-size: 13px;
    }
    .newsletter_input::input-placeholder
    {
      font-size: 13px;
    }
    .copyright_container
    {
      height: auto;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .logos
    {
      margin-top: 30px;
    }
  }

  /************
  11. 539px
  ************/

  @media only screen and (max-width: 539px)
  {

  }

  /************
  12. 480px
  ************/

  @media only screen and (max-width: 480px)
  {
    .single_post_title
    {
      font-size: 24px;
    }
    .single_post_text p
    {
      font-size: 14px;
    }
  }

  /************
  13. 479px
  ************/

  @media only screen and (max-width: 479px)
  {

  }

  /************
  14. 400px
  ************/

  @media only screen and (max-width: 400px)
  {

  }

</style>

<!-- Single Blog Post -->

<div class="single_post">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="single_post_title">
          {post.title}
        </div>
        <div class="single_post_text">
          {@html post.html}
<!--          <p>Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin. Praesent at tempus lectus, eleifend blandit felis. Fusce augue arcu, consequat a nisl aliquet, consectetur elementum turpis. Donec iaculis lobortis nisl, et viverra risus imperdiet eu. Etiam mollis posuere elit non sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu a magna sodales venenatis. Integer non diam sit amet magna luctus mollis ac eu nisi. In accumsan tellus ut dapibus blandit.</p>-->

<!--          <div class="single_post_quote text-center">-->
<!--            <div class="quote_image"><img src="images/quote.png" alt=""></div>-->
<!--            <div class="quote_text">Quisque sagittis non ex eget vestibulum. Sed nec ultrices dui. Cras et sagittis erat. Maecenas pulvinar, turpis in dictum tincidunt, dolor nibh lacinia lacus.</div>-->
<!--            <div class="quote_name">Liam Neeson</div>-->
<!--          </div>-->

<!--          <p>Praesent ac magna sed massa euismod congue vitae vitae risus. Nulla lorem augue, mollis non est et, eleifend elementum ante. Nunc id pharetra magna.  Praesent vel orci ornare, blandit mi sed, aliquet nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>-->
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Blog Posts -->

<div class="blog">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="blog_posts d-flex flex-row align-items-start justify-content-between">

          {#each posts as post}
            <div class="blog_post d-block position-relative">
              <!-- we're using the non-standard `rel=prefetch` attribute to
            tell Sapper to load the data for the page as soon as
            the user hovers over the link or taps it, instead of
            waiting for the 'click' event -->
              <div class="blog_image" style="background-image:url(images/blog_1.jpg)"></div>
              <div class="blog_text">{post.title}</div>
              <div class="blog_button"><a rel="prefetch" href="blog/{post.slug}">Continue Reading</a></div>
            </div>
          {:else}
            <!-- No related posts -->
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
