<script>
  // MODULES
  import { getContext } from 'svelte'
  import { getId, getNumber } from './id'

  // COMPONENTS
  import { STEPS } from './Steps.svelte'

  // LOGIC
  const panel = {
    number: getNumber(),
    id: getId()
  }
  const { registerPanel, selectedPanel, labeledBy } = getContext(STEPS)

  registerPanel(panel)
</script>

<style>
</style>

<div
  id={panel.id}
  aria-labelledby={$labeledBy[panel.id]}
  role="steppanel">
  {#if $selectedPanel === panel}
    <slot></slot>
  {/if}
</div>
