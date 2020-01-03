<script>
  export let price = 0, currency = 'USD'

  function toDecimal(val) {
    return (val / 100).toFixed(2)
  }

  let currencySymbol = '$', displayPrice = price

  const CURRENCY = {
    'USD': '$'
  }

  $: if (currency) {
    currencySymbol = CURRENCY[currency] || CURRENCY['USD']
  }

  $: if (typeof price !== 'undefined') {
    displayPrice = toDecimal(price)
  }

</script>

<span>{currencySymbol}{displayPrice}</span>
