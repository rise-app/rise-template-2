<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'

  // IMPORTS
  export let value, inProgress = false, preloading = false

  // LOGIC

  // Make's sure the the password and password confirm fields match
  const matchPassword = value => ({ valid: value === value.password, name: 'matchPassword' })

  // The register form
  const registerForm = form(() => ({
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
      password: {
        value: value.password,
        validators: ['required', 'min:8']
      },
      password_confirm: {
        value: value.password_confirm,
        validators: ['required', 'min:8']
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
    dispatch('register', value)
  }

</script>

<form on:submit|preventDefault={submit}>
  <fieldset class="form-group form-label-group">
    <input
      id="inputEmail"
      class="form-control form-control-lg"
      type="text"
      placeholder="Email"
      required
      autofocus
      bind:value={value.email}
      use:bindClass="{{ form: registerForm, name: 'email', invalid: 'is-invalid' }}"
    />
    <label for="inputEmail">Email</label>

    {#if $registerForm.email.errors.includes('required')}
      <div class="invalid-feedback">Email is required</div>
    {/if}
  </fieldset>

  <fieldset class="form-group form-label-group">
    <input
      id="inputPassword"
      class="form-control form-control-lg"
      type="password"
      placeholder="Password"
      bind:value={value.password}
      use:bindClass="{{ form: registerForm, name: 'password', invalid: 'is-invalid' }}"
    />
    <label for="inputPassword">Password</label>
    {#if $registerForm.password.errors.includes('required')}
      <div class="invalid-feedback">Password is required</div>
    {:else if $registerForm.password.errors.includes('min') }
      <div class="invalid-feedback">Password must be at least 8 characters</div>
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
     disabled={!$registerForm.dirty || ($registerForm.dirty && !$registerForm.valid) || inProgress || !!preloading}
  >
    Sign In
  </button>
</form>
