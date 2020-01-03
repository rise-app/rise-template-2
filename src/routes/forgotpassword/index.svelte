<script>
  import { post, get, put } from 'api.js'
  import ListErrors from '../_components/ListErrors.svelte'

  let email
  let inProgress = false
  let errors

  async function submit(event) {
    inProgress = true

    const response = await put(`auth/recover`, { email })

    inProgress = false

    console.log(response)

    if (response.errors || response.error) {
      errors = response.errors ? response.errors : [response.error]
    }

    if (response.data) {
      console.log(response.data)
    }
  }
</script>

<svelte:head>
  <title>Forgot password • rise</title>
</svelte:head>

<div class="auth-page">
  <div class="container page">
    <div class="row justify-content-center">
      <div class="col-md-6 offset-md-3 col-xs-12 mb-5 mt-5">
        <h1 class="text-xs-center">Reset Password</h1>
        <p class="lead">Enter your Email to Receive Reset Instructions</p>

        <ListErrors {errors} />

        <form on:submit|preventDefault={submit}>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email" bind:value={email} />
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

          <button class="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={!email}>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
