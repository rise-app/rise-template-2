<script>
  export let text = ''
</script>

<style type="text/scss">
  @import "../../../theme/_variables";

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .separator::before, .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid $gray-500;
  }
  .separator::before {
    margin-right: .25em;
  }
  .separator::after {
    margin-left: .25em;
  }
</style>


<div class="separator">{text}</div>
