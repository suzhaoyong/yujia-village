<template>
  <div id="pay">

  </div>
</template>
<script>
export default {
  created () {
      const div = document.createElement('div');
      div.innerHTML = this.$route.query.htmls;
      document.body.appendChild(div);
      
  },
  mounted () {
    console.log(document.querySelectorAll('script')[6].innerHTML)
    var wxhref = document.querySelectorAll('script')[6].innerHTML
    setTimeout(() => {
      eval(wxhref)
      // document.querySelectorAll('script')[6].innerHTML
    }, 2000)
    // window.location.href='https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx1816305960843663b034ca061492986600&package=3310346382'
  },
}
</script>
<style lang="scss" scope>
  
</style>