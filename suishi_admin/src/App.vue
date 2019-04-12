<template>
  <div id="app">
      <el-container>
          <el-header class="blues">Header</el-header>
          <el-container>
              <el-aside width="200px">
                  <el-menu >
                      <el-submenu index="1">
                          <template slot="title">全局</template>
                              <el-menu-item index="1-1" @click="jumpEvent('jurisdiction')">管理权限</el-menu-item>
                              <el-menu-item index="1-2" @click="jumpEvent('labelAdmin')">标签管理</el-menu-item>
                      </el-submenu>
                      <el-submenu index="2">
                          <template slot="title">题库</template>

                              <el-menu-item index="2-1"  @click="jumpEvent('majorList')">专业列表</el-menu-item>
                              <el-menu-item index="2-2" @click="jumpEvent('coursewareList')">课件列表</el-menu-item>
                              <el-menu-item index="2-3" @click="jumpEvent('testList')">测试列表</el-menu-item>

                      </el-submenu>
                      <el-submenu index="3">
                          <template slot="title">实战组队</template>
                          <el-menu-item-group>
                              <el-menu-item index="3-1">队伍列表</el-menu-item>
                              <el-menu-item index="3-2">队伍属性</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="4">
                          <template slot="title">圈子</template>
                          <el-menu-item-group>
                              <el-menu-item index="4-1" @click="jumpEvent('circleList')">圈子列表</el-menu-item>
                              <el-menu-item index="4-2">圈子类型管理</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="5">
                          <template slot="title">帖子</template>
                          <el-menu-item-group>
                              <el-menu-item index="5-1">帖子列表</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="6">
                          <template slot="title">用户管理</template>
                          <el-menu-item-group>
                              <el-menu-item index="6-1">用户管理</el-menu-item>
                              <el-menu-item index="6-2">运营账户管理</el-menu-item>
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
        return{}
    },
    methods:{
        jumpEvent(type){
            this.$router.push("/"+type)
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
