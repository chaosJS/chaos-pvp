import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/admin/categories/create',
        name: 'new-cat',
        component: () => import('../views/cat/NewCat.vue')
      },
      // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
      {
        path: '/admin/categories/edit/:id',
        name: 'edit-cat',
        component: () => import('../views/cat/NewCat.vue'),
        props: true
      },
      {
        path: '/admin/categories/list',
        name: 'cat-list',
        component: () => import('../views/cat/CatList.vue')
      },

      // 物品路由
      {
        path: '/admin/items/create',
        name: 'new-items',
        component: () => import('../views/items/NewItems.vue')
      },

      {
        path: '/admin/items/edit/:id',
        name: 'edit-items',
        component: () => import('../views/items/NewItems.vue'),
        props: true
      },
      {
        path: '/admin/items/list',
        name: 'items-list',
        component: () => import('../views/items/ItemsList.vue')
      },

      // 英雄路由
      {
        path: '/admin/hero/create',
        name: 'new-hero',
        component: () => import('../views/heros/NewHeros.vue')
      },

      {
        path: '/admin/hero/edit/:id',
        name: 'edit-hero',
        component: () => import('../views/heros/NewHeros.vue'),
        props: true
      },
      {
        path: '/admin/hero/list',
        name: 'heros-list',
        component: () => import('../views/heros/HeroList.vue')
      },

      // 文章路由
      {
        path: '/admin/articles/create',
        name: 'new-articles',
        component: () => import('../views/articles/NewArticles.vue')
      },
      {
        path: '/admin/articles/edit/:id',
        name: 'edit-articles',
        component: () => import('../views/articles/NewArticles.vue'),
        props: true
      },
      {
        path: '/admin/articles/list',
        name: 'articles-list',
        component: () => import('../views/articles/ArticleList.vue')
      },
      // 广告位
      {
        path: '/admin/ads/create',
        name: 'new-ads',
        component: () => import('../views/ads/NewAds.vue')
      },
      {
        path: '/admin/ads/edit/:id',
        name: 'edit-ads',
        component: () => import('../views/ads/NewAds.vue'),
        props: true
      },
      {
        path: '/admin/ads/list',
        name: 'ads-list',
        component: () => import('../views/ads/AdsList.vue')
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
