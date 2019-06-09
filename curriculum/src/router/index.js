import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import judge from '@/components/judge'
import select from '@/components/select'
import audio from '@/components/audio'
import imageText from '@/components/imageText'
import imageChange from '@/components/imageChange'
import titlePage from '@/components/titlePage'
import selectmore from '@/components/selectmore'
import lastPage from '@/components/lastPage'

import book from '@/components/book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'book',
      component: book
    },
      {
          path: '/judge',
          name: 'judge',
          component: judge
      },
      {
          path:'/select',
          name:select,
          component:select
      },
      {
          path:'/audio',
          name:audio,
          component:audio
      },
      {
          path:'/book',
          name:book,
          component:book
      },
      {
          path:'/imageText',
          name:imageText,
          component:imageText
      },
      {
          path:'/imageChange',
          name:imageChange,
          component:imageChange
      },
      {
          path:'/titlePage',
          name:titlePage,
          component:titlePage
      },
      {
          path:'/selectmore',
          name:selectmore,
          component:selectmore
      },
      {
          path:'/lastPage',
          name:lastPage,
          component:lastPage
      }
  ]
})
