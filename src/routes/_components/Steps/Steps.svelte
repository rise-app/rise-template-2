<script context="module">
  export const STEPS = {}
</script>

<script>
  // MODULES
  import { afterUpdate, setContext, onDestroy, onMount, tick,  createEventDispatcher } from 'svelte'
  import { writable } from 'svelte/store'

  // COMPONENTS

  // IMPORTS
  export let initialSelectedIndex = 0, inOrder = true, inProgress = false

  // LOGIC


  const dispatch = createEventDispatcher()

  const stepElements = [];
  const steps = [];
  const panels = [];

  const controls = writable({})
  const labeledBy = writable({})
  const locks = writable({})

  const selectedIndex = writable(0)
  const selectedStep = writable(null)
  const selectedPanel = writable(null)

  function removeAndUpdateSelected(arr, item, selectedStore) {
    const index = arr.indexOf(item)
    arr.splice(index, 1)
    selectedStore.update(selected => selected === item ? (arr[index] || arr[arr.length - 1]) : selected);
  }

  function registerItem(arr, item, selectedStore) {
    arr.push(item)
    selectedStore.update(selected => selected || item)
    onDestroy(() => removeAndUpdateSelected(arr, item, selectedStore))
  }

  function setLocks() {
    steps.forEach((step, i) => {
      locks.update(locksData => ({...locksData, [step.id]: (inOrder && i <= $selectedIndex) }))
    })
  }

  function selectStep(step) {
    const index = steps.indexOf(step)
    selectedStep.set(step)
    selectedPanel.set(panels[index])
    selectedIndex.set(index)
    setLocks()

    dispatch('step', step)
  }

  function columns () {
    return Math.round(12 / steps.length)
  }

  function complete() {
    dispatch('complete', {})
  }

  function nextStep() {
    const currentIndex = steps.indexOf($selectedStep)
    const nextIndex = currentIndex + 1
    const step = steps[nextIndex]

    if (step) {
      selectStep(step)
    }
    else {
      complete()
    }
  }


  setContext(STEPS, {
    registerStep(step) {
      registerItem(steps, step, selectedStep)
    },

    registerStepElement(stepElement) {
      stepElements.push(stepElement)
    },

    registerPanel(panel) {
      registerItem(panels, panel, selectedPanel)
    },

    selectStep,

    selectedStep,
    selectedPanel,

    controls,
    labeledBy,
    locks,

    columns
  });

  onMount(() => {
    selectStep(steps[initialSelectedIndex]);
  });

  afterUpdate(() => {
    const currentIndex = steps.indexOf($selectedStep)

    for (let i = 0; i < steps.length; i++) {
      controls.update(controlsData => ({...controlsData, [steps[i].id]: panels[i].id}))
      labeledBy.update(labeledByData => ({...labeledByData, [panels[i].id]: steps[i].id}))
    }
  })

  async function handleKeyDown(event) {
    if (event.target.classList.contains('svelte-steps__step')) {
      let selectedIndex = steps.indexOf($selectedStep);

      switch (event.key) {
        case 'ArrowRight':
          selectedIndex += 1;
          if (selectedIndex > steps.length - 1) {
            selectedIndex = 0;
          }
          selectStep(steps[selectedIndex]);
          stepElements[selectedIndex].focus();
          break;

        case 'ArrowLeft':
          selectedIndex -= 1;
          if (selectedIndex < 0) {
            selectedIndex = steps.length - 1;
          }
          selectStep(steps[selectedIndex]);
          stepElements[selectedIndex].focus();
      }
    }
  }
</script>

<style type="text/scss">
  .svelte-steps {
    display: table;
    width: 100%;
    position: relative;
  }
</style>

<div class="svelte-steps" on:keydown={handleKeyDown}>
  <slot></slot>

  <slot name="buttons">
    <div class="buttons text-center">
      {#if $selectedIndex !== (steps.length - 1) }
        <button
          class="btn btn-primary nextBtn"
          on:click="{e=> nextStep() }"
          disabled="{inProgress}"
        >Next</button>
      {:else}
        <button
          class="btn btn-primary nextBtn"
          on:click="{e=> nextStep() }"
          disabled="{inProgress}"
        >Finish</button>
      {/if}
    </div>
  </slot>
</div>
