<script>
  // MODULES
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { post } from 'utils.js'
  import * as feather from 'feather-icons'

  // COMPONENTS
  // import Icon from '../_components/Icon'
  // import { faUser, faList, faCog, faCreditCard } from '@fortawesome/free-solid-svg-icons'

  // IMPORTS
  export let segment

  // LOGIC
  let isOpen = false

  $: imageSrc =
    'https://api.adorable.io/avatars/32/' + $session.user.email + '.png'
  $: displayName = $session.user.name_display
  $: roleName = $session.user.roles[$session.user.roles.length - 1].public_name

  // let iconProfile = faUser
  // let iconHistory = faList
  // let iconAccount = faCog
  // let iconPurchase = faCreditCard

  function handleUpdate(event) {
    isOpen = event.detail.isOpen
  }

  const { preloading, page, session } = stores()

  onMount(() => {
    feather.replace()
  })

  async function logout() {
    await post(`auth/logout`)

    // AUTHENTICATION
    $session.token = null

    // UTILITY
    $session.channel = null
    $session.user = null
    $session.cart = null
    $session.customer = null

    goto('/login')
  }
</script>

<style type="text/scss">
  div {
    padding: 6px;
  }

  div.main-container {
  }

  h4,
  p {
    margin-bottom: 0;
  }
  h4 {
    font-size: 14px;
    font-family: 'Poppins';
    font-weight: 600;
  }
  p {
    font-size: 12px;
  }
  img {
    border-radius: 50%;
  }
</style>

<div class="main-container d-flex align-items-center">
  <div>
    <img src={imageSrc} alt="" height="32" width="32" />
  </div>
  <div>
    <h4>{displayName}</h4>
    <p>{roleName}</p>
  </div>
  <div>
    <i data-feather="chevron-down" />
  </div>
</div>
