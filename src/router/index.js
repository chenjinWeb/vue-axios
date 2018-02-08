import Vue from 'vue'
import Router from 'vue-router'
import login from "../pages/login/login.vue"
import index from "../pages/index/index.vue"
import point from "../pages/point/point.vue"
import product from "../pages/product/product.vue"
import device from "../pages/device/device.vue"
import replen from "../pages/replen/replen.vue"
import footer from "../components/footer.vue"

Vue.use(Router);

//初始页
let routes = [{
  path: '*',
  component: login
}];

let tabs =[
  {
    name: 'index',
    path: '/index',
    components: {
      node: index,
      footer: footer
    }
  },
  {
    name: 'point',
    path: '/point',
    components: {
      node: point,
      footer: footer
    }
  },
  {
    name: 'product',
    path: '/product',
    components: {
      node: product,
      footer: footer
    }
  },
  {
    name: 'device',
    path: '/device',
    components: {
      node: device,
      footer: footer
    }
  },
  {
    name: 'replen',
    path: '/replen',
    components: {
      node: replen,
      footer: footer
    }
  }
]

let array = [
  ...tabs,
];

routes.unshift(...array);

export default new Router({
  routes: routes,
  mode: 'hash',
})
