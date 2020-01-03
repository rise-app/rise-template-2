<script>
  // MODULES
  import { getContext } from 'svelte'
  import getId from './id'

  // COMPONENTS
  import { TABS } from './Tabs.svelte'

  // LOGIC
  const panel = {
    id: getId()
  }
  const { registerPanel, selectedPanel, labeledBy } = getContext(TABS)

  registerPanel(panel)
</script>

<style>
</style>

<div
  id={panel.id}
  aria-labelledby={$labeledBy[panel.id]}
  role="tabpanel">
  {#if $selectedPanel === panel}
    <slot></slot>
  {/if}
</div>
