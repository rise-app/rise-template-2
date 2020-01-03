<script>
  // import {}

  export let segment

</script>
<div class="container">
  <div class="row">
    <div class="col-3">
      <div class="list-group">
        <a
          href="/account"
          class="list-group-item list-group-item-action"
          class:active={!segment || segment === ''}
        >
          My Account
        </a>
        <a
          href="/account/orders"
          class="list-group-item list-group-item-action"
          class:active={segment === 'orders'}
        >
          Order History
        </a>
        <a
          href="/account/billing"
          class="list-group-item list-group-item-action"
          class:active={segment === 'billing'}
        >
          Billing
        </a>
      </div>
    </div>
    <div class="col-9">
      <slot></slot>
    </div>
  </div>
</div>
