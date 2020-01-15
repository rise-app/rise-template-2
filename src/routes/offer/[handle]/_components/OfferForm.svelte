<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'
  import { ListErrors } from '../../../_components/ListErrors'

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

  function wishlist() {
    dispatch('addItemWishlist', value)
  }

  function share() {
    dispatch('shareItem', value)
  }

</script>

<style type="text/scss">
  @import "../../../../theme/variables";
</style>


<form on:submit|preventDefault={submit}>
  <ListErrors {errors} />
  <fieldset class="form-group">
    <div class="input-group">
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
        class="form-control quantity"
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
    <div class="progress mt-3 mb-3">
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

  <div class="d-flex flex-row mb-3">
    <div class="text-center flex-column flex-fill mr-1">
      <button
        class="btn btn-primary btn-block"
        type="submit"
        disabled={disableBtn}
      >
        Add to Cart
      </button>
    </div>
    <div class="text-center flex-column flex-shrink-0 mr-1">
      <button
        class="btn btn-secondary"
        on:click={wishlist}
        disabled={disableBtn}
      >
        <i class="fa fa-heart"></i>
      </button>
    </div>
    <div class="text-center flex-column flex-shrink-0 mr-1" >
      <button
        class="btn btn-secondary text-center flex-column flex-shrink-0"
        on:click={share}
        disabled={disableBtn}
      >
        <i class="fa fa-share"></i>
      </button>
    </div>
  </div>
</form>
