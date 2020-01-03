<script context="module">
  export async function preload({ params, query }) {
    let { token } = query
    return { token }
  }
</script>

<script>
  import { put } from 'api.js'
  import { goto } from '@sapper/app'
  import ListErrors from '../../../_components/ListErrors.svelte'

  export let token

  let password
  let confirmPassword
  let inProgress = false
  let errors

  async function submit(event) {
    inProgress = true

    const response = await put(`auth/reset`, { password, token })

    inProgress = false

    console.log(response)

    if (response.errors || response.error) {
      errors = response.errors ? response.errors : [response.error]
    } else {
      if (response.data) {
        console.log(response.data)
      }
      goto('/login')
    }
  }
</script>

<svelte:head>
  <title>Password recovery • rise</title>
</svelte:head>

<div class="auth-page">
  <div class="container page">
    <div class="row justify-content-center">
      <div class="col-md-6 offset-md-3 col-xs-12 mb-5 mt-5">
        <h1 class="text-xs-center">Change Password</h1>

        <ListErrors {errors} />

        <form on:submit|preventDefault={submit}>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="hidden" placeholder="Password" bind:value={token} />
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" bind:value={password} />
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Confirm Password" bind:value={confirmPassword} />
          </fieldset>

          {#if inProgress === true}
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 100%" />
            </div>
          {/if}

          <button
            class="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={!password || !confirmPassword || password !== confirmPassword}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
