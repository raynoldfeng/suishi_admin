<template>
    <div id="login">
        <div  class="view_main">
            <span>账户</span>
            <el-input v-model="username" placeholder="输入账户"  class="input_type"></el-input>
        </div>
        <div  class="view_main">
            <span>密码</span>
            <el-input type="password" v-model="password" placeholder="输入密码" class="input_type"></el-input>
          </div>
        <div  class="view_main">
            <el-button @click="loginEvent">登录</el-button>
        </div>
    </div>
</template>
    <script>
    export default {
        data() {
        return {
            username: '',
            password:""
        }
        },
    methods:{
        loginEvent(){
            var self = this;
           this.common.postEvent(this.api.host+this.api.login,{username:this.username,password:this.password},function(data){
               console.log(data);
               self.common.cookie.set("nickname",data.nickname);
               self.common.cookie.set("token",data.token);
               self.common.cookie.set("user_id",data.user_id);
               self.$router.push("/jurisdiction");
           });

        }
    }
        }
    </script>
<style>

</style>