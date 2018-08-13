import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'

Vue.use(Router)

// 是routes不是routers
const routes = [
  { path: '/seller', component: seller },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings }
]

const router = new Router({
  routes
})

export default router
