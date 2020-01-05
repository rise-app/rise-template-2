<script>
  import { onMount } from 'svelte'

  onMount(() => {
    var end = Date.now() + (3 * 1000);

    var interval = setInterval(function() {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      // window variable
      if (confetti) {
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          shapes: ['square'],
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });
      }
    }, 200);

  })
</script>
<style type="text/scss">
  @import "../../../../theme/variables";

  .cart_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }
</style>

<svelte:head>
  <title>Confirmation</title>
</svelte:head>

<div class="cart_section">
  <div class="container">
    <h1>Order Confirmation</h1>
  </div>
</div>
