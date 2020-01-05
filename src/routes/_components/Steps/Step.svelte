<script>
  // MODULES
  import { getContext, onMount, tick } from 'svelte'

  // INCLUDES
  import { getId, getNumber } from './id'

  // COMPONENTS
  import { STEPS } from './Steps.svelte'


  // IMPORTS
  // export let dirty = false, valid = true

  // LOGIC
  let stepEl, dirty = false, valid = true

  const step = {
    number: getNumber(),
    id: getId(),
    dirty: dirty,
    valid: valid
  }
  const { registerStep, registerStepElement, selectStep, selectedStep, controls, locks, columns } = getContext(STEPS)

  let isSelected, isLocked
  $: isSelected = $selectedStep === step


  $: isLocked = !$locks[step.id]

  registerStep(step)

  onMount(async () => {
    await tick()
    registerStepElement(stepEl)
  })
</script>

<style type="text/scss">

  @import "../../../theme/variables";

  .stepper-step p {
    margin-top: 0px;
    color:#666;
  }
  /*.stepper-row {*/
  /*  display: table-row;*/
  /*}*/

  button[disabled] {
    /*opacity: 1 !important;
    filter: alpha(opacity=100) !important;*/
  }
  .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
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
    background-color: $nav-divider-color;
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

<div class="stepper-step col-{ columns() } mt-1"
  bind:this={stepEl}
  role="step"
  id={step.id}
  aria-controls={$controls[step.id]}
  aria-selected={isSelected}
  tabindex="{isSelected ? 0 : -1}"
>
  <button
    class="btn btn-circle {isSelected ? 'btn-primary' : 'btn-secondary'}"
    on:click={() => selectStep(step)}
    disabled="{isLocked}"
  > { step.number } </button>
    <p class="">
      <small>
        <slot></slot>
      </small>
    </p>
</div>
