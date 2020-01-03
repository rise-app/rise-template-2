<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'

  // IMPORTS
  export let value, inProgress = false, preloading = false

  // LOGIC

  const loginForm = form(() => ({
      email: {
        value: value.email,
        validators: ['required']
      },
      password: {
        value: value.password,
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
    dispatch('login', value)
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
      use:bindClass="{{ form: loginForm, name: 'email', invalid: 'is-invalid' }}"
    />
    <label for="inputEmail">Email</label>

    {#if $loginForm.email.errors.includes('required')}
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
      use:bindClass="{{ form: loginForm, name: 'password', invalid: 'is-invalid' }}"
    />
    <label for="inputPassword">Password</label>
    {#if $loginForm.password.errors.includes('required')}
      <div class="invalid-feedback">Password is required</div>
    {:else if $loginForm.password.errors.includes('min') }
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
     disabled={!$loginForm.dirty || ($loginForm.dirty && !$loginForm.valid) || inProgress || !!preloading}
  >
    Sign In
  </button>
</form>
