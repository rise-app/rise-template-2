<script>
  // MODULES
  import { goto, stores } from '@sapper/app'
  import { get, put, post } from 'utils'

  // COMPONENTS
  import { StepList, StepPanel, Steps, Step } from '../../_components/Steps'

  // LOGIC
  let inProgress = false

  async function checkout() {
    inProgress = true
    inProgress = false
    return goto('/cart/checkout/confirmation')
  }

</script>
<style type="text/scss">
  @import "../../../theme/variables";

  .cart_section
  {
    width: 100%;
    padding-top: 93px;
    padding-bottom: 111px;
  }

</style>


<svelte:head>
  <title>Checkout</title>
</svelte:head>

<div class="cart_section">
  <div class="container">

    <Steps on:complete={checkout}>
      <StepList>
        <Step>Account Setup</Step>
        <Step>Billing Info</Step>
        <Step>Shipping Info</Step>
        <Step>Confirmation</Step>
      </StepList>

      <StepPanel>
        <div class="mt-2 mb-2">
          1
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          2
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="text-muted">
            3
          </div>
        </div>
      </StepPanel>
      <StepPanel>
        <div class="mt-2 mb-2">
          <div class="text-muted">
            4
          </div>
        </div>
      </StepPanel>
    </Steps>
  </div>
</div>
