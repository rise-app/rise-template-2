<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'
  import strength from 'zxcvbn'

  // IMPORTS
  export let value = {}, inProgress = false, preloading = false

  // LOGIC

  // Make's sure the the password and password confirm fields match
  const matchPassword = (value) => ({ valid: value && value.password_confirm === value.password, name: 'matchPassword' })

  // The password form
  const passwordForm = form(() => ({
      password: {
        value: value.password,
        // validators: ['required', 'min:8']
      },
      password_confirm: {
        value: value.password_confirm,
        validators: [matchPassword]
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
    dispatch('password', value)
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
  <fieldset class="form-group form-label-group">
    <input
      id="inputPassword"
      class="form-control form-control-lg"
      type="password"
      placeholder="Password"
      bind:value={value.password}
      use:bindClass="{{ form: passwordForm, name: 'password', invalid: 'is-invalid' }}"
    />
    <label for="inputPassword">Password</label>
    {#if $passwordForm.password.errors.includes('required')}
      <div class="invalid-feedback">Password is required</div>
    {:else if $passwordForm.password.errors.includes('min') }
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
      use:bindClass="{{ form: passwordForm, name: 'password_confirm', invalid: 'is-invalid' }}"
    />
    <label for="inputPassword_confirm">Confirm Password</label>
    {#if $passwordForm.password_confirm.errors.includes('required')}
      <div class="invalid-feedback">Confirm Password is required</div>
    {:else if $passwordForm.password_confirm.errors.includes('min') }
      <div class="invalid-feedback">Confirm Password must be at least 8 characters</div>
    {:else if $passwordForm.password_confirm.errors.includes('matchPassword') }
      <div class="invalid-feedback">Passwords do not match</div>
    {/if}
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
      disabled={!$passwordForm.dirty || ($passwordForm.dirty && !$passwordForm.valid) || inProgress || !!preloading}
    >
      Change Password
    </button>
  </div>
</form>
