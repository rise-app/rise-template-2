<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'

  // IMPORTS
  export let value = {}, loading = false, inProgress = false, preloading = false, countries = [], provinces = [], hidden = []

  // LOGIC

  const addressForm = form(() => ({
      name_prefix: {
        value: value.name_prefix,
        validators: []
      },
      name_first: {
        value: value.name_first,
        validators: []
      },
      name_last: {
        value: value.name_last,
        validators: []
      },
      name_suffix: {
        value: value.name_suffix,
        validators: []
      },
      email: {
        value: value.email,
        validators: []
      },
      company: {
        value: value.company,
        validators: []
      },
      phone: {
        value: value.phone,
        validators: []
      },
      address_1: {
        value: value.address_1,
        validators: ['required']
      },
      address_2: {
        value: value.address_2,
        validators: []
      },
      address_3: {
        value: value.address_3,
        validators: []
      },
      city: {
        value: value.city,
        validators: ['required']
      },
      postal_code: {
        value: value.postal_code,
        validators: ['required']
      },
      province_code: {
        value: value.province_code,
        validators: ['required']
      },
      country_code: {
        value: value.country_code,
        validators: ['required']
      }
    }),
    {
      stopAtFirstError: false,
      initCheck: true
    }
  )

  const dispatch = createEventDispatcher()

  /**
   * On Submit of the Form, Dispatch to Parent
   * @param event
   */
  function submit(event) {
    dispatch('address', value)
  }

  function countrySelected(event) {
    dispatch('countrySelected', value.country_code)
  }

</script>

<form on:submit|preventDefault={submit}>

  <div class="form-row">
    <div class="col">
      <fieldset class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="First Name"
          bind:value={value.name_first}
          use:bindClass="{{ form: addressForm, name: 'name_first', invalid: 'is-invalid' }}"
        />

        {#if $addressForm.name_first.errors.includes('required')}
          <div class="invalid-feedback">First Name is required</div>
        {/if}
      </fieldset>
    </div>
    <div class="col">
      <fieldset class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="Last Name"
          bind:value={value.name_last}
          use:bindClass="{{ form: addressForm, name: 'name_last', invalid: 'is-invalid' }}"
        />

        {#if $addressForm.name_last.errors.includes('required')}
          <div class="invalid-feedback">Last Name is required</div>
        {/if}
      </fieldset>
    </div>
  </div>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="Email"
      bind:value={value.email}
      use:bindClass="{{ form: addressForm, name: 'email', invalid: 'is-invalid' }}"
    />

    {#if $addressForm.email.errors.includes('required')}
      <div class="invalid-feedback">Email is required</div>
    {:else if $addressForm.address_2.errors.includes('email') }
      <div class="invalid-feedback">Email is not a valid email</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="Address Line 1"
      bind:value={value.address_1}
      use:bindClass="{{ form: addressForm, name: 'address_1', invalid: 'is-invalid' }}"
    />

    {#if $addressForm.address_1.errors.includes('required')}
      <div class="invalid-feedback">Address Line 1 is required</div>
    {:else if $addressForm.address_1.errors.includes('min') }
      <div class="invalid-feedback">Address Line 1 must be at least 8 characters</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="Address Line 2"
      bind:value={value.address_2}
      use:bindClass="{{ form: addressForm, name: 'address_2', invalid: 'is-invalid' }}"
    />
    {#if $addressForm.address_2.errors.includes('required')}
      <div class="invalid-feedback">Address Line 2 is required</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="Address Line 3"
      bind:value={value.address_3}
      use:bindClass="{{ form: addressForm, name: 'address_3', invalid: 'is-invalid' }}"
    />
    {#if $addressForm.address_3.errors.includes('required')}
      <div class="invalid-feedback">Address Line 3 is required</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="City"
      bind:value={value.city}
      use:bindClass="{{ form: addressForm, name: 'city', invalid: 'is-invalid' }}"
    />
    {#if $addressForm.city.errors.includes('required')}
      <div class="invalid-feedback">City is required</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <input
      class="form-control"
      type="text"
      placeholder="Postal Code"
      bind:value={value.postal_code}
      use:bindClass="{{ form: addressForm, name: 'postal_code', invalid: 'is-invalid' }}"
    />
    {#if $addressForm.postal_code.errors.includes('required')}
      <div class="invalid-feedback">Postal Code is required</div>
    {/if}
  </fieldset>


  <fieldset class="form-group">
    <select
      class="form-control {loading ? 'input-spinner' : ''}"
      placeholder="Country"
      bind:value={value.country_code}
      use:bindClass="{{ form: addressForm, name: 'country_code', invalid: 'is-invalid' }}"
      on:change="{e => countrySelected(value.country_code)}"
    >
      <option value="">Select Country</option>
      {#each countries as country, i (country.country_code)}
      <option
        value="{country.country_code}"
        selected="{value.country_code == country.country_code}"
      >{country.name}</option>
      {/each}
    </select>
    {#if $addressForm.country_code.errors.includes('required')}
      <div class="invalid-feedback">Country is Required</div>
    {/if}
  </fieldset>

  <fieldset class="form-group">
    <select
      class="form-control {loading ? 'input-spinner' : ''}"
      placeholder="Province"
      bind:value={value.province_code}
      use:bindClass="{{ form: addressForm, name: 'province_code', invalid: 'is-invalid' }}"
    >
      <option value="">Select Province</option>
      {#each provinces as province, i (province.province_code)}
        <option
          value="{province.province_code}"
          selected="{value.province_code == province.province_code}"
        >{province.name}</option>
      {/each}
    </select>
    {#if $addressForm.province_code.errors.includes('required')}
      <div class="invalid-feedback">Province is Required</div>
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
     class="btn btn-lg btn-primary pull-xs-right"
     type="submit"
     disabled={($addressForm.dirty && !$addressForm.valid) || inProgress || !!preloading}
  >
    Submit
  </button>
</form>
