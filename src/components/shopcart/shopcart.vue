<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="contentleft">
          <div class="logoWrapper">
            <div class="logo" :class="{'highlight': totalCount> 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥20元</div>
        </div>
        <div class="contentright" @click="showDetail">
          <div class="pay">
            ￥20元起送
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="detailShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}}</span>
                <span class="price">￥{{food.price*food.count}}</span>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="detailShow"></div>
    </transition>
  </div>
</template>

<script>
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  
  export default {
    props: {
      selectFoods: {
        type: Array
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count * food.price
        })
        return total
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/shopcart/shopcart.styl"
</style>