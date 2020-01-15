<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'
  import strength from 'zxcvbn'

  // IMPORTS
  export let value, inProgress = false, preloading = false

  // LOGIC

  // Make's sure the the password and password confirm fields match
  const matchPassword = value => ({ valid: value.password_confirm === value.password, name: 'matchPassword' })

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
      },
      accepts_policy: {
        value: true,
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
    dispatch('register', value)
  }

  /**
   * Password Strength
   */
  let passStrength = 0, passWidth = 0, passLabel = '', passColor = 'danger'
  $: if(value.password) {
    passStrength = strength(value.password).score

    passLabel = passStrength > 3 && value.password.length > 8
            ? 'Strong'
            : 'Weak'

    passColor = passStrength > 3
            ? 'success'
            : passStrength > 2
                    ? 'warning'
                    : 'danger'

    passWidth = (100 / 4) * passStrength
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-row">
    <fieldset class="col form-group form-label-group">
      <input
        id="inputName_first"
        class="form-control form-control-lg"
        type="text"
        placeholder="First Name"
        required
        autofocus
        bind:value={value.name_first}
        use:bindClass="{{ form: registerForm, name: 'name_first', invalid: 'is-invalid' }}"
      />
      <label for="inputName_first">First Name</label>

      {#if $registerForm.name_first.errors.includes('required')}
        <div class="invalid-feedback">First Name is required</div>
      {/if}
    </fieldset>

    <fieldset class="col form-group form-label-group">
      <input
        id="inputName_last"
        class="form-control form-control-lg"
        type="text"
        placeholder="Last Name"
        required
        autofocus
        bind:value={value.name_last}
        use:bindClass="{{ form: registerForm, name: 'name_last', invalid: 'is-invalid' }}"
      />
      <label for="inputName_last">Last Name</label>

      {#if $registerForm.name_last.errors.includes('required')}
        <div class="invalid-feedback">Last Name is required</div>
      {/if}
    </fieldset>
  </div>

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
      id="inputPhone"
      class="form-control form-control-lg"
      type="text"
      placeholder="Phone"
      required
      autofocus
      bind:value={value.phone}
      use:bindClass="{{ form: registerForm, name: 'phone', invalid: 'is-invalid' }}"
    />
    <label for="inputPhone">Phone</label>

    {#if $registerForm.phone.errors.includes('required')}
      <div class="invalid-feedback">Phone is required</div>
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

  <div class="progress mb-3">
    <div
      class="progress-bar bg-{passColor}"
      role="progressbar"
      style="width:{passWidth}%;"
      aria-valuenow="{passWidth}"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      { passLabel }
    </div>
  </div>

  <fieldset class="form-group form-label-group">
    <input
      id="inputPassword_confirm"
      class="form-control form-control-lg"
      type="password"
      placeholder="Confirm Password"
      bind:value={value.password_confirm}
      use:bindClass="{{ form: registerForm, name: 'password_confirm', invalid: 'is-invalid' }}"
    />
    <label for="inputPassword_confirm">Confirm Password</label>
    {#if $registerForm.password_confirm.errors.includes('required')}
      <div class="invalid-feedback">Confirm Password is required</div>
    {:else if $registerForm.password_confirm.errors.includes('min') }
      <div class="invalid-feedback">Confirm Password must be at least 8 characters</div>
    {/if}
  </fieldset>

  <fieldset class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      id="terms_and_conditions"
      bind:checked={value.accepts_policy}
      use:bindClass="{{ form: registerForm, name: 'accepts_policy', invalid: 'is-invalid' }}"
    >
    <label class="form-check-label" for="terms_and_conditions">
      I agree to the Cookie and Privacy Policy.
    </label>
  </fieldset>

  {#if inProgress === true}
    <div class="progress mt-2 mb-2">
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

  <div class="mt-4">
    <button
      class="btn btn-lg btn-primary w-100"
      type="submit"
      disabled={!$registerForm.dirty || ($registerForm.dirty && !$registerForm.valid) || inProgress || !!preloading}
    >
      Create Account
    </button>
  </div>
</form>
