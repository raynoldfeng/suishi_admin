import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import edit from '@/components/edit'
import upload from '@/components/upload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/edit',
          name: 'edit',
          component: edit
      },
      {
          path: '/upload',
          name: 'upload',
          component: upload
      }
  ]
})
