<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menus">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex == index}" @click="_selectMenu(index,$event)">
            <span class="text">
              <span class="icon" v-if="item.type !== -1" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li class="food-list" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="(food, index) in item.foods" :key="index" @click="_selectFood(food, $event)">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @addCart="add" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food :food= "selectFood" @add="addFirst" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {fetch} from '../../api/fetch.js'
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import shopcart from 'components/shopcart/shopcart'
  import food from 'components/food/food'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i=0; this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          // !height2是为了判断最后一个菜单,注意要大于等于要不然每次都取到9
          if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      fetch('/api/goods').then((response) => {
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      _selectMenu(index, event) {
        /* eslint-disable*/
//         better-scroll会将点击事件去掉，如果滚动部分需要有点击事件，需要在参数里加上click：true。同时，在PC上或某些手机端，由于未成功将touchend事件move掉，点击事件会执行两次
// 　　    better-scroll派发的event事件和原生js的event有属性上的区别，其中有一个属性为event._constructed。better-scroll派发的事件中event._constructed为true，原生点击事件中没有这个属性。
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foods.getElementsByClassName('food-list')
        let currentFood = foodList[index]
        this.foodScroll.scrollToElement(currentFood, 300);
      },
      _selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectFood = food
        this.$refs.food.show()
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menus, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foods, {
          click: true,
          // 会在滚动过程中实时派发scroll事件，这个不能少
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foods.getElementsByClassName('food-list')
        let height = 0;
        this.listHeight.push(height)
        for (let i=0; i< foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      },
      addFirst(target) {
        this.add(target)
      },
      add(target) {
        this._drop(target)
      },
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus">
  @import '../../common/stylus/goods/goods.styl'
</style>