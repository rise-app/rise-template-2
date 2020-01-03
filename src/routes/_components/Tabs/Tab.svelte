<script>
  import { getContext, onMount, tick } from 'svelte'

  import getId from './id'
  import { TABS } from './Tabs.svelte'

  let tabEl

  const tab = {
    id: getId()
  }
  const {registerTab, registerTabElement, selectTab, selectedTab, controls} = getContext(TABS)

  let isSelected
  $: isSelected = $selectedTab === tab

  registerTab(tab)

  onMount(async () => {
    await tick()
    registerTabElement(tabEl)
  })
</script>

<style>

</style>

<li
  bind:this={tabEl}
  role="tab"
  id={tab.id}
  aria-controls={$controls[tab.id]}
  aria-selected={isSelected}
  tabindex="{isSelected ? 0 : -1}"
  class="nav-item"
>
  <a
    class="nav-link"
    class:active={isSelected}
    on:click={() => selectTab(tab)}
  >
    <slot></slot>
  </a>
</li>
