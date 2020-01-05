<script>

</script>
<style type="text/scss">
	/*.svelte-steps__step-list {*/
  /*  border-bottom: 1px solid #CCCCCC;*/
  /*  margin: 0;*/
  /*  padding: 0;*/
	/*}*/

  .stepper-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content:" ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-index: 0;
  }
</style>

<div role="steplist" class="row stepper-row setup-panel svelte-steps__step-list">
  <slot></slot>
</div>
