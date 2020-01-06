<script>
  export let segment

</script>

<style type="text/scss">
  @import "../../theme/variables";

  .account_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }
</style>

<div class="account_section">
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
          <a
            href="/account/shipping"
            class="list-group-item list-group-item-action"
            class:active={segment === 'shipping'}
          >
            Shipping
          </a>
          <!-- <a
            href="#"
            class="list-group-item list-group-item-action"
            class:active={segment === 'shipping'}
          >
            Influencer Area
          </a> -->
        </div>
      </div>
      <div class="col-9">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
