<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'

  // IMPORTS
  export let value, inProgress = false, preloading = false

  // LOGIC

  // The account form
  const accountForm = form(() => ({
      name_prefix: {
        value: value.name_prefix,
        validators: []
      },
      name_first: {
        value: value.name_first,
        validators: ['required']
      },
      name_last: {
        value: value.name_last,
        validators: ['required']
      },
      name_suffix: {
        value: value.name_suffix,
        validators: []
      },
      email: {
        value: value.email,
        validators: ['required', 'email']
      },
      company: {
        value: value.company,
        validators: []
      },
      phone: {
        value: value.phone,
        validators: []
      },
      phone_sms: {
        value: value.phone_sms,
        validators: []
      },
      // password: {
      //   value: value.password,
      //   validators: ['required', 'min:8']
      // },
      // password_confirm: {
      //   value: value.password_confirm,
      //   validators: ['required', 'min:8']
      // },
      accepts_marketing: {
        value: value.accepts_marketing,
        validators: []
      },
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
    dispatch('save', value)
  }
  function password(event) {
    dispatch('password', true)
  }

</script>

<form on:submit|preventDefault={submit}>
<!--  <div class="form-row">-->
<!--    <fieldset class="col form-group form-label-group">-->
<!--      <input-->
<!--        id="inputName_first"-->
<!--        class="form-control form-control-lg"-->
<!--        type="text"-->
<!--        placeholder="First Name"-->
<!--        required-->
<!--        autofocus-->
<!--        bind:value={value.name_first}-->
<!--        use:bindClass="{{ form: accountForm, name: 'name_first', invalid: 'is-invalid' }}"-->
<!--      />-->
<!--      <label for="inputName_first">First Name</label>-->

<!--      {#if $accountForm.name_first.errors.includes('required')}-->
<!--        <div class="invalid-feedback">First Name is required</div>-->
<!--      {/if}-->
<!--    </fieldset>-->

<!--    <fieldset class="col form-group form-label-group">-->
<!--      <input-->
<!--      id="inputName_last"-->
<!--      class="form-control form-control-lg"-->
<!--      type="text"-->
<!--      placeholder="Last Name"-->
<!--      required-->
<!--      autofocus-->
<!--      bind:value={value.name_last}-->
<!--      use:bindClass="{{ form: accountForm, name: 'name_last', invalid: 'is-invalid' }}"-->
<!--      />-->
<!--      <label for="inputName_last">Last Name</label>-->

<!--      {#if $accountForm.name_last.errors.includes('required')}-->
<!--        <div class="invalid-feedback">Last Name is required</div>-->
<!--      {/if}-->
<!--    </fieldset>-->
<!--  </div>-->

  <fieldset class="form-group form-label-group">
    <input
      id="inputEmail"
      class="form-control form-control-lg"
      type="text"
      placeholder="Email"
      required
      autofocus
      bind:value={value.email}
      use:bindClass="{{ form: accountForm, name: 'email', invalid: 'is-invalid' }}"
    />
    <label for="inputEmail">Email</label>

    {#if $accountForm.email.errors.includes('required')}
      <div class="invalid-feedback">Email is required</div>
    {/if}
  </fieldset>

  <div>
    <a
      class="btn"
      on:click={password}
    >
      Change Password
    </a>
  </div>

<!--  <fieldset class="form-group form-label-group">-->
<!--    <input-->
<!--      id="inputPhone"-->
<!--      class="form-control form-control-lg"-->
<!--      type="text"-->
<!--      placeholder="Phone"-->
<!--      required-->
<!--      autofocus-->
<!--      bind:value={value.phone}-->
<!--      use:bindClass="{{ form: accountForm, name: 'phone', invalid: 'is-invalid' }}"-->
<!--    />-->
<!--    <label for="inputPhone">Phone</label>-->

<!--    {#if $accountForm.phone.errors.includes('required')}-->
<!--      <div class="invalid-feedback">Phone is required</div>-->
<!--    {/if}-->
<!--  </fieldset>-->

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
     class="btn btn-primary pull-xs-right"
     type="submit"
     disabled={!$accountForm.dirty || ($accountForm.dirty && !$accountForm.valid) || inProgress || !!preloading}
  >
    Save
  </button>
</form>
