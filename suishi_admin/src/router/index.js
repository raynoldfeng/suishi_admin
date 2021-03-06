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
import teamList from '@/components/team/teamList'
import addTeam from '@/components/team/addTeam'
import teamAttribute from '@/components/team/teamAttribute'
import login from '@/components/login/login'
import home from '@/components/home/home'
import payMenu from '@/components/pay/payMenu'

import userJump from '@/components/team/userJump'
import link from '@/components/link/link'

import test from '@/components/curriculumSystem/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
      {
          path: '/home',
          name: 'home',
          component: home
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
          path: '/seeJurisdiction',
          name: 'seeJurisdiction',
          component: addJurisdiction
      },
      {
          path: '/editJurisdiction',
          name: 'editJurisdiction',
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
          path: '/seeCourseware',
          name: 'seeCourseware',
          component: addCourseware
      },
      {
          path: '/editCourseware',
          name: 'editCourseware',
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
          path: '/seeGame',
          name: 'seeGame',
          component: addGame
      },
      {
          path: '/editGame',
          name: 'editGame',
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
          path: '/seePost',
          name: 'seePost',
          component: addPost
      },
      {
          path: '/editPost',
          name: 'editPost',
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
      },
      {
          path: '/seeTest',
          name: 'seeTest',
          component: addTest
      }, {
          path: '/editTest',
          name: 'editTest',
          component: addTest
      },
      {
          path: '/teamList',
          name: 'teamList',
          component: teamList
      },
      {
          path: '/addTeam',
          name: 'addTeam',
          component: addTeam
      },
      {
          path: '/editTeam',
          name: 'editTeam',
          component: addTeam
      },
      {
          path: '/teamAttribute',
          name: 'teamAttribute',
          component: teamAttribute
      },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/test',
          name: 'test',
          component: test
      },
      {
          path: '/userJump',
          name: 'userJump',
          component:userJump
      },
      {
          path:'/payMenu',
          name:'payMenu',
          component:payMenu
      },
      {
          path:'/link',
          name:'link',
          component:link
      }
  ]
})
