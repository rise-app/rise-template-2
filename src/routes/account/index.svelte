<script context="module">
  import { rise } from 'sdk'
  import { riseQuery, pluckQuery } from 'query'
  import { rise as riseConfig } from 'config'

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload({path, params, query}, {token, session_uuid, channel}) {

    if (!token) {
      return this.redirect(302, '/login')
    }

    const userReq = async () => {
      return rise.channelAuth.sessionUser({}, {
        session: session_uuid,
        token: token
      })
    }
    const customerReq = async () => {
      return rise.channelAuth.sessionCustomer({}, {
        session: session_uuid,
        token: token
      })
    }

    return Promise.all([
      userReq(),
      customerReq()
    ])
    .then(([
       user = {},
       customer = {}
     ]) => {
        return {
          user: user.data,
          customer: customer.data
        }
      })
      .catch(err => {
        return this.error(err)
      })
  }

</script>

<script>

  // MODULES
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get, put, post } from 'utils'
  import AccountForm from '../_components/forms/AccountForm.svelte'
  import { ListErrors } from '../_components/ListErrors'
  import CustomerForm from '../_components/forms/CustomerForm.svelte'

  // COMPONENTS
  import Dialog, { Title, Content, Actions } from '@smui/dialog'
  import PasswordForm from '../_components/forms/PasswordForm.svelte'

  // IMPORTS
  export let
    user = {},
    customer = {}

  // LOGIC
  const {preloading, session, page} = stores()

  let inProgress = false, errors


  /************************
   * DIALOGS
   ************************/
  let dialogPassword

  /*******************************
   * DIALOG HANDLERS
   *******************************/
  function closeHandler(event) {
    console.log('closed', event)
  }


  /************************
   * REQUESTS
   ************************/
  async function updateUser(user) {
    // Disable buttons
    inProgress = true
    // Make update user request to backend
    return put(`auth/session/user`, user, {}, $session.token, $session.session_uuid)
      .then(response => {

        // Update the session store
        const sessionValues = {
          ...$session
        }
        if (response.session) {
          sessionValues.session_uuid = response.session
        }
        if (response.token) {
          sessionValues.token = response.token
        }
        if (response.data) {
          sessionValues.user = response.data
        }
        // Update the session store
        session.set(sessionValues)

        // Re-enable buttons
        inProgress = false
        console.log('brk response!', response)
      })
      .catch(err => {
        // Re-enable buttons
        inProgress = false
        errors = err
      })
  }

  async function updateCustomer(user) {
    // Disable buttons
    inProgress = true
    // Make update customer request to backend
    return put(`auth/session/customer`, user, {}, $session.token, $session.session_uuid)
      .then(response => {
        // Update the session store
        const sessionValues = {
          ...$session
        }
        if (response.session) {
          sessionValues.session_uuid = response.session
        }
        if (response.token) {
          sessionValues.token = response.token
        }
        if (response.data) {
          sessionValues.customer = response.data
        }
        // Update the session store
        session.set(sessionValues)

        // Re-enable buttons
        inProgress = false
      })
      .catch(err => {
        // Re-enable buttons
        inProgress = false
        errors = err
      })
  }

  async function logout() {
    // Disable buttons
    inProgress = true
    // Make logout request to backend
    return post(`auth/logout`, null, {}, $session.token, $session.session_uuid)
      .then(() => {

        // Clear the session values to only keep the session_uuid
        const sessionValues = {
          session_uuid: $session.session_uuid
        }
        // Update the session store
        session.set(sessionValues)

        // Re-enable buttons
        inProgress = false

        // Redirect to login page
        return goto('/login')
      })
      .catch(err => {
        // Re-enable buttons
        inProgress = false
        errors = err
      })
  }

</script>

<style type="text/scss">
  @import "../../theme/variables";

  .user_section
  {
    width: 100%;
  }
  .user_title
  {
    font-size: 30px;
    font-weight: 500;
  }
</style>

<svelte:head>
  <title>My Account - Account</title>
</svelte:head>

<div class="user_section">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="user_title mb-3">
          My Account
        </div>
        <ListErrors {errors} />

        <div class="list-group">
          <div class="list-group-item pt-2 pb-2">
            <h5 class="text-muted">Login Information</h5>
            <AccountForm
              value="{user}"
              {inProgress}
              preloading="{$preloading}"
              on:save={e=> updateUser(e.detail)}
              on:password={e=> dialogPassword.open()}
            />
          </div>

          <div class="list-group-item pt-2 pb-2">
            <h5 class="text-muted">Customer Information</h5>
            <CustomerForm
              value="{customer}"
              {inProgress}
              preloading="{$preloading}"
              on:save={e=> updateUser(e.detail)}
            />
          </div>
          <div class="list-group-item pt-2 pb-2">
            <button
              class="btn btn-outline-primary"
              on:click={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Dialog
  bind:this={dialogPassword}
  aria-labelledby="dialog-contact-title"
  aria-describedby="dialog-contact-content"
  on:MDCDialog:closed={closeHandler}
>
  <Title id="dialog-contact-title">
    Edit Password
  </Title>
  <Content id="dialog-contact-content">
    <PasswordForm
      value={{}}
      {inProgress}
      preloading={$preloading}
      on:password={e=> console.log(e.detail)}
    />
  </Content>
</Dialog>
