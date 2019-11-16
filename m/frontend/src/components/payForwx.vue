<template>
  <div id="pay">
    <div> 

    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const div = document.createElement('div');
    div.innerHTML = this.$route.query.htmls;
    document.body.appendChild(div);
    document.forms[0].submit()
  },
  methods: {

  },
}
</script>
<style lang="scss" scope>
  
</style>