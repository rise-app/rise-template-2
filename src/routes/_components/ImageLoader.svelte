<script>

  // MODULES
  import { onMount, onDestroy, getContext, setContext, beforeUpdate, afterUpdate } from 'svelte'

  const Status = {
    PENDING: 'pending',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed',
    ABORTED: 'aborted'
  }

  export let src, alt, placeholder= 'https://via.placeholder.com/100x100.png', classes, width

  let status = Status.LOADING

  $: if (!src) {
    src = placeholder
  }

  $: finalSrc = src

  function found(event) {
    // console.log('brk found', event)
    status = Status.LOADED
  }
  function error(event) {
    // console.log('brk error', event)
    status = Status.FAILED

    src = placeholder
  }

  function abort(event) {
    // console.log('brk abort', event)
    status = Status.ABORTED
  }

</script>

<img
  on:load="{found}"
  on:error="{error}"
  on:abort="{abort}"
  class="{classes}"
  src="{finalSrc}"
  alt="{alt}"
  {width}
/>
