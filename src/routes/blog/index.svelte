<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts }
      })
  }
</script>

<script>
  export let posts
</script>

<style type="text/scss">
  /*********************************
  5. Blog
  *********************************/

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
</style>

<!-- Blog -->

<div class="blog">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="blog_posts d-flex flex-row align-items-start justify-content-between">

          {#each posts as post}
          <div class="blog_post">
          <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
            <div class="blog_image" style="background-image:url(images/blog_1.jpg)"></div>
            <div class="blog_text">{post.title}</div>
            <div class="blog_button"><a rel="prefetch" href="blog/{post.slug}">Continue Reading</a></div>
          </div>
          {/each}

<!--          &lt;!&ndash; Blog post &ndash;&gt;-->
<!--          <div class="blog_post">-->
<!--            <div class="blog_image" style="background-image:url(images/blog_9.jpg)"></div>-->
<!--            <div class="blog_text">4 Steps to Getting Anything You Want In Life</div>-->
<!--            <div class="blog_button"><a href="blog_single.html">Continue Reading</a></div>-->
<!--          </div>-->

        </div>
      </div>

    </div>
  </div>
</div>
