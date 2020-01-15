<script>
  // MODULES
  import { _ } from 'svelte-i18n'

  // COMPONENTS
  import Error from './Error.svelte'

  // IMPORTS
  export let errors

  // LOGIC
</script>

{#if errors}
  <ul class="error-messages">
    {#each Object.keys(errors) as key}
      <li class="text-danger">
        <Error error="{errors[key]}" />
      </li>
    {/each}
  </ul>
{/if}
