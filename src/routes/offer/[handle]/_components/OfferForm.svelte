<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'
  import ListErrors from '../../../_components/ListErrors.svelte'

  // IMPORTS
  export let offer = {}, errors, value = {}, inProgress = false, preloading = false

  // LOGIC

  const offerForm = form(() => ({
      quantity: {
        value: value.quantity,
        validators: ['required']
      },
      variant_uuid: {
        value: value.variant_uuid,
        validators: ['required']
      }
    }),
    {
      stopAtFirstError: false,
      initCheck: true
    }
  )

  $: disableBtn = ($offerForm.dirty && !$offerForm.valid) || inProgress || !!preloading

  const dispatch = createEventDispatcher()

  /**
   * On Submit of the Form, Dispatch to Parent
   * @param event
   */
  function submit(event) {
    dispatch('addItem', value)
  }

  function increaseQty(qty) {
    value.quantity = qty + 1
  }

  function decreaseQty(qty) {
    value.quantity = qty - 1
  }

</script>

<style type="text/scss">
  @import "../../../../theme/variables";
</style>


<form on:submit|preventDefault={submit}>
  <ListErrors {errors} />
  <fieldset class="form-group form-label-group">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <a on:click={e => decreaseQty(value.quantity)} class="input-group-text">
          <i class="fa fa-minus" />
        </a>
      </div>
      <input
        type="number"
        placeholder="Quantity"
        value="1"
        step="1"
        class="form-control"
        aria-label="Quantity for { offer.title }"
        required
        autofocus
        bind:value={value.quantity}
        use:bindClass="{{ form: offerForm, name: 'quantity', invalid: 'is-invalid' }}"
      >
      <div class="input-group-append">
        <a on:click={e => increaseQty(value.quantity)} class="input-group-text">
          <i class="fa fa-plus" />
        </a>
      </div>
    </div>
    {#if $offerForm.quantity.errors.includes('required')}
    <div class="invalid-feedback">Quantity is required</div>
    {/if}
  </fieldset>

  {#if inProgress === true}
    <div class="progress mb-2">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 100%"
      />
    </div>
  {/if}

  <button
    class="btn btn-primary"
    type="submit"
    disabled={disableBtn}
  >
    Add to Cart
  </button>
</form>
