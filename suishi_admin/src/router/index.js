import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Jurisdiction from '@/components/jurisdiction'
import addJurisdiction from '@/components/addJurisdiction'
import coursewareList from '@/components/coursewareList'
import addCourseware from '@/components/addCourseware'
import testList from '@/components/testList'
import labelAdmin from '@/components/labelAdmin'
import circleList from '@/components/circleList'
import addGame from '@/components/addGame'
import majorList from '@/components/majorList'
import addMajor from '@/components/addMajor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
{
    path: '/jurisdiction',
        name: 'Jurisdiction',
    component: Jurisdiction
},
      {
          path: '/addJurisdiction',
          name: 'addJurisdiction',
          component: addJurisdiction
      },
      {
          path: '/coursewareList',
          name: 'coursewareList',
          component: coursewareList
      },
      {
          path: '/addCourseware',
          name: 'addCourseware',
          component: addCourseware
      },
      {
          path: '/testList',
          name: 'testList',
          component: testList
      },
      {
          path: '/labelAdmin',
          name: 'labelAdmin',
          component: labelAdmin
      },
      {
          path: '/circleList',
          name: 'circleList',
          component: circleList
      },
      {
          path: '/addGame',
          name: 'addGame',
          component: addGame
      },
      {
          path: '/majorList',
          name: 'majorList',
          component: majorList
      },
      {
          path: '/addMajor',
          name: 'addMajor',
          component: addMajor
      }
  ]
})
