<script>
  // MODULES
  import { getContext } from 'svelte'
  import { getId, getNumber } from './id'

  // COMPONENTS
  import { STEPS } from './Steps.svelte'

  // LOGIC
  // export let
  let dirty = false, valid = true

  const panel = {
    number: getNumber(),
    id: getId(),
    dirty: dirty,
    valid: valid
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
