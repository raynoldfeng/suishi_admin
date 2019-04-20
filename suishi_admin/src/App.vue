<template>
  <div id="app">
      <el-container>
          <el-header class="blues">随拾运营管理后台</el-header>
          <el-container>
              <el-aside width="200px">
                  <el-menu  @open="handleOpen"
                  :default-active="$route.path"
                  :default-openeds="openeds"
                  @close="handleClose">
                      <el-submenu index="1">
                          <template slot="title">全局</template>
                              <el-menu-item index="/jurisdiction"  @click="jumpEvent('jurisdiction')">管理权限</el-menu-item>
                              <el-menu-item index="/labelAdmin" @click="jumpEvent('labelAdmin')">标签管理</el-menu-item>
                      </el-submenu>
                      <el-submenu index="2">
                          <template slot="title">题库</template>

                              <el-menu-item index="/majorList"  @click="jumpEvent('majorList')">专业列表</el-menu-item>
                              <el-menu-item index="/coursewareList" @click="jumpEvent('coursewareList')">课件列表</el-menu-item>
                              <el-menu-item index="/testList" @click="jumpEvent('testList')">测试列表</el-menu-item>

                      </el-submenu>
                      <el-submenu index="3">
                          <template slot="title">实战组队</template>
                          <el-menu-item-group>
                              <el-menu-item index="/teamList"  @click="jumpEvent('teamList')">队伍列表</el-menu-item>
                              <el-menu-item index="/teamAttribute" @click="jumpEvent('teamAttribute')">队伍属性</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="4">
                          <template slot="title">圈子</template>
                          <el-menu-item-group>
                              <el-menu-item index="/circleList" @click="jumpEvent('circleList')">圈子列表</el-menu-item>
                              <el-menu-item index="/circleType" @click="jumpEvent('circleType')">圈子类型管理</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="5">
                          <template slot="title">帖子</template>
                          <el-menu-item-group>
                              <el-menu-item index="/postList"  @click="jumpEvent('postList')">帖子列表</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="6">
                          <template slot="title">用户管理</template>
                          <el-menu-item-group>
                              <el-menu-item index="userAdministration" @click="jumpEvent('userAdministration')">用户管理</el-menu-item>
                              <el-menu-item index="/operateAdministration" @click="jumpEvent('operateAdministration')">运营账户管理</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                  </el-menu>
              </el-aside>
              <el-main>
                  <router-view/>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
    data(){
        return{
            openeds:[],
            menuList:[]
        }
    },
    methods:{
        jumpEvent(type){
            this.$router.push("/"+type)
        },
        handleOpen(key, keyPath){
            console.log(key, keyPath);
        },
        handleClose(key, keyPath){
            console.log(key, keyPath);
        },
        menusEvent(){
            //http://admin.suishi.com/admin/admin_user/menus
            this.menuList=[]
        }
    },
    mounted:function(){

    }
}
</script>

<style>
    body{
    margin:0;

    }
    ul li{
    list-style: none;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
    .blues{
        background:skyblue;
    }
</style>
