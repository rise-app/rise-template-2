
<script>
  // MODULES
  import { onMount, setContext, createEventDispatcher } from 'svelte'
  // import { currentStep } from './stepper'

  // IMPORTS
  export let steps = [], current = 0, lock = false, inProgress = false

  // The element with the steps inside
  let container


  // LOGIC
  const dispatch = createEventDispatcher()

  function canActivate(i) {
    // If this is the active step
    if (i === current) {
      return true
    }
    // If a previous step and not locked
    else if (i > current && !lock) {
      return true
    }
    // Otherwise, disable the step activator
    else {
      return false
    }
  }


  function goToStep(i) {
    current = i
  }

  // function setIds(_container) {
  //   _container.childNodes.forEach((e, i) => {
  //     e.id = `step-${i}`
  //   })
  // }

  $: col = Math.round(12 / steps.length)

  // $: if (container) {
  //   setIds(container)
  // }

  $: if (current) {
    // setContext(currentStep, {
    //   getCurrent: () => current
    // })
  }

  function complete() {
    dispatch('complete', {})
  }

</script>

<style type="text/scss">
  .stepper-step p {
    margin-top: 0px;
    color:#666;
  }
  /*.stepper-row {*/
  /*  display: table-row;*/
  /*}*/
  .stepper {
    display: table;
    width: 100%;
    position: relative;
  }
  .stepper-step button[disabled] {
    /*opacity: 1 !important;
    filter: alpha(opacity=100) !important;*/
  }
  .stepper .btn.disabled, .stepper .btn[disabled], .stepper fieldset[disabled] .btn {
    opacity:1 !important;
    color:#bbb;
  }

  .stepper-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content:" ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-index: 0;
  }

  .stepper-step {
    display: table-cell;
    text-align: center;
    position: relative;
  }

  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
  }
</style>


<div class="container">
  <div class="stepper">
    <div class="row stepper-row setup-panel">
      {#each steps as step, i }
      <div class="stepper-step col-{ col } mt-1">
        <button
          type="button"
          class="btn btn-circle {i === current ? 'btn-primary' : 'btn-secondary'}"
          disabled="{!canActivate(i)}"
          on:click="{e=> goToStep(i)}"
        >{ i + 1 }</button>
        <p class="">
          <small>
            { step.title || 'Error: set step.title'}
          </small>
        </p>
      </div>
      {/each}
    </div>
  </div>

  <div
    class="container"
    bind:this={container}
  >
    <slot></slot>
  </div>
  <slot name="buttons">
    <div class="buttons text-center">
      {#if current !== (steps.length - 1) }
      <button
        class="btn btn-primary nextBtn"
        on:click="{e=> goToStep(current + 1) }"
        disabled="{inProgress}"
      >Next</button>
      {:else}
      <button
        class="btn btn-primary nextBtn"
        on:click="{e=> complete() }"
        disabled="{inProgress}"
      >Finish</button>
      {/if}
    </div>
  </slot>
</div>
