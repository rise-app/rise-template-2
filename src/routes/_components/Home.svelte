<script>
  export let title = 'Untitled', image = {}

  let background = image && image.src ? image.src : 'images/shop_background.jpg'

</script>

<style type="text/scss">
  @import "../../theme/variables";
/*********************************
4. Home
*********************************/

  .home
  {
    width: 100%;
    height: 260px;
    background: transparent;
  }
  .home_background
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
  .home_overlay
  {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #cde4f1;
    background: linear-gradient(#FFFFFF, #cde4f1);
    opacity: 0.9;
  }
  .home_content
  {
    width: 100%;
    height: 100%;
  }

</style>

<!-- Home -->
<div class="home">
  <div
    class="home_background"
  ></div>
  <div class="home_overlay"></div>
  <div class="home_content d-flex flex-column align-items-center justify-content-center">
    <h2 class="home_title">{ title }</h2>
  </div>
</div>
