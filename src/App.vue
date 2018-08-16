<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
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
      fetch('/api/seller').then((response) => {
        if (response.errno === ERR_OK) {
          this.seller = response.data
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
