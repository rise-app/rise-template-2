<script>
  export let style = 'nav-pills'
</script>
<style>
	/*.svelte-tabs__tab-list {*/
  /*  border-bottom: 1px solid #CCCCCC;*/
  /*  margin: 0;*/
  /*  padding: 0;*/
	/*}*/
</style>

<ul role="tablist" class="nav {style}">
  <slot></slot>
</ul>
