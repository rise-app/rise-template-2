<script>
  // MODULES
  import { createEventDispatcher } from 'svelte'
  import { form, bindClass } from 'svelte-forms'

  // IMPORTS
  export let
    value = {},
    inProgress = false,
    preloading = false,
    isSubscribed = false

  // LOGIC

  const newsletterForm = form(() => ({
      email: {
        value: value.email,
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
    dispatch('newsletter', value)
  }

</script>
<style type="text/scss">
  @import "../../../theme/variables";
/*********************************
5. Newsletter
*********************************/

  .newsletter
  {
    width: 100%;
    background: $gray-100;
    padding-top: 60px;
    padding-bottom: 60px;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
  }
  .newsletter_container
  {
    width: 100%;
  }
  .newsletter_title_container
  {
    width: 40%;
    padding-left: 95px;
  }
  .newsletter_icon
  {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
  }
  .newsletter_title
  {
    font-size: 18px;
    color: $black;
  }
  .newsletter_text p:last-child
  {
    margin-bottom: 0;
  }
  .newsletter_icon img
  {
    max-width: 100%;
  }
  .newsletter_content
  {
    width: 60%;
  }
  .newsletter_form
  {
    position: relative;
    width: 569px;
    float: left;
  }
  .newsletter_input
  {
    width: 100%;
    height: 50px;
    background: $white;
    border: solid 1px $gray-100;
    border-radius: 5px;
    padding-left: 25px;
    font-size: 16px;
    outline: none;
    color: theme-color('primary');
  }
  .newsletter_input:focus
  {
    border: solid 1px rgba(14, 140, 228, 0.3);
    box-shadow: 0px 1px 5px rgba(14, 140, 228, 0.3);
  }
  .newsletter_input::-webkit-input-placeholder
  {
    font-size: 16px;
    color: rgba(0,0,0,0.3);
  }
  .newsletter_input:-moz-placeholder
  {
    font-size: 16px;
    color: rgba(0,0,0,0.3);
  }
  .newsletter_input::-moz-placeholder
  {
    font-size: 16px;
    color: rgba(0,0,0,0.3);
  }
  .newsletter_input:-ms-input-placeholder
  {
    font-size: 16px;
    color: rgba(0,0,0,0.3);
  }
  .newsletter_input::input-placeholder
  {
    font-size: 16px;
    color: rgba(0,0,0,0.3);
  }
  .newsletter_button
  {
    position: absolute;
    top: 0;
    right: 0;
    width: 153px;
    height: 50px;
    background: theme-color('primary');
    color: $white;
    line-height: 50px;
    font-size: 18px;
    border: none;
    outline: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
  }
  .newsletter_button:hover
  {
    opacity: 0.8;
  }
  .newsletter_unsubscribe_link
  {
    float: right;
    text-align: right;
    height: 50px;
  }
  .newsletter_unsubscribe_link a
  {
    font-size: 10px;
    color: theme-color('primary');
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 50px;
  }
  .newsletter_unsubscribe_link a:hover
  {
    color: darken(theme-color('primary'), 20);
  }
</style>

<!-- Newsletter -->

<div class="newsletter">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="newsletter_container d-flex flex-lg-row flex-column align-items-lg-center align-items-center justify-content-lg-start justify-content-center">
          <div class="newsletter_title_container">
            <div class="newsletter_icon">
              <img src="images/send.png" alt="mail icon">
            </div>
            <div class="newsletter_title">Sign up for Newsletter</div>
            <div class="newsletter_text"><p>...and receive exclusive offers.</p></div>
          </div>
          <div class="newsletter_content clearfix">
            <form
              action="#"
              class="newsletter_form"
              on:submit|preventDefault={submit}
            >
              <fieldset class="form-group">
                <input
                  type="email"
                  class="newsletter_input"
                  required="required"
                  placeholder="Enter your email address"
                  bind:value={value.email}
                  use:bindClass="{{ form: newsletterForm, name: 'email', invalid: 'is-invalid' }}"
                >
                {#if $newsletterForm.email.errors.includes('required')}
                  <div class="invalid-feedback">Email is required</div>
                {/if}
              </fieldset>
              <button class="newsletter_button">Subscribe</button>
            </form>
            <div class="newsletter_unsubscribe_link">
              <a href="#">unsubscribe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
