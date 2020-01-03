<script>
  export let index = 0, current = 0

  let visible = false
  $: if (index == current) {
    visible = true
  }
  else {
    visible = false
  }

</script>

<style type="text/scss">
  .setup-content {
    display: none;

    &.visible {
      display: block;
    }
  }
</style>

<div
   id="step-{index}"
   class="panel panel-primary setup-content"
   class:visible="{visible}"
   data-attribute="step"
>
    <slot></slot>
</div>
