<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
  </div>
</template>

<script>
  import {fetch} from 'api/fetch.js'
  import header from 'components/header/header.vue'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      fetch('/seller').then((response) => {
        if (response.errno === ERR_OK) {
          this.seller = response.data
          console.log(this.seller)
        }
      })
    },
    components: {
      "v-header": header
    }
  }
</script>

<style lang="stylus">
    @import 'common/stylus/seller/sellerTitle.styl'
</style>
