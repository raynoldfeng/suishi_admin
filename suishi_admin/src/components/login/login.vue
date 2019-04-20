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
            <el-button>登录</el-button>
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
        }
        }
    </script>
<style>
.input_type{
    width:200px;
    }
</style>