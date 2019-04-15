import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Jurisdiction from '@/components/jurisdiction/jurisdiction'
import addJurisdiction from '@/components/jurisdiction/addJurisdiction'
import labelAdmin from '@/components/jurisdiction/labelAdmin'
import coursewareList from '@/components/subject/coursewareList'
import addCourseware from '@/components/subject/addCourseware'
import addTest from '@/components/subject/addTest'
import testList from '@/components/subject/testList'
import circleList from '@/components/circle/circleList'
import addGame from '@/components/circle/addGame'
import majorList from '@/components/subject/majorList'
import addMajor from '@/components/subject/addMajor'
import circleType from '@/components/circle/circleType'
import postList from '@/components/post/postList'
import addPost from '@/components/post/addPost'
import operateAdministration from '@/components/administration/operateAdministration'
import userAdministration from '@/components/administration/userAdministration'
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
      },
      {
          path: '/editMajor',
          name: 'editMajor',
          component: addMajor
      },
      {
          path: '/seeMajor',
          name: 'seeMajor',
          component: addMajor
      },
      {
          path: '/circleType',
          name: 'circleType',
          component: circleType
      },
      {
          path: '/postList',
          name: 'postList',
          component: postList
      },
      {
          path: '/addPost',
          name: 'addPost',
          component: addPost
      },
      {
          path: '/operateAdministration',
          name: 'operateAdministration',
          component: operateAdministration
      },
      {
          path: '/userAdministration',
          name: 'userAdministration',
          component: userAdministration
      },
      {
          path: '/addTest',
          name: 'addTest',
          component: addTest
      }
  ]
})
