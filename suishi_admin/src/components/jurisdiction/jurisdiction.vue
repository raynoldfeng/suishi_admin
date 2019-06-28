<template>
    <div id="jurisdiction">
        <el-button @click="userDialog(true)">新建用户</el-button>
        <el-button @click="addEvent">职能权限</el-button>
        <template v-if="adminUserList.length>0">
            <el-table
            :data="adminUserList"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="姓名"
               >
                </el-table-column>
                <el-table-column
                prop="name"
                label="职能"
                >
                </el-table-column>
                <el-table-column
                label="操作"
              >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="新建" :visible.sync="dialogVisible">
            <div class="view_main">
                <span>账户</span>
                <el-input v-model="username" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>姓名</span>
                <el-input v-model="nickname" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>密码</span>
                <el-input v-model="password" class="input_type"></el-input>
            </div>
            <div class="view_main" if="rolesList.length > 0">
                <span>职位</span>
                <el-select  v-model="role_id" placeholder="职位">
                    <el-option
                    v-for="item in rolesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="addUser(false)">新建</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            adminUserList: [],
            rolesList: [],
            role_id: "",
            dialogVisible:false,
            username:"",
            password:"",
            nickname:"",
            userinfo:""
        }
    },
    methods:{
        handleClick(id) {
            console.log(row);
            this.$router.push("/editJurisdiction?id="+id)
        },
        addEvent(){
            this.$router.push("/addJurisdiction");
        },
        userEvent(){

        },
        userDialog(boolean){
            this.dialogVisible = boolean;
        },
        addUser(){
            var self = this;
            //http://admin.suishi.com/admin/admin_user
            if(this.username == ""){
                alert("输入帐号");
                return false;
            }else if(this.password == ""){
                alert("输入密码");
                return false;
            }else if(this.nickname == ""){
                alert("输入名称");
                return false;
            }else if(this.role_id == ""){
                alert("输入职能");
                return false;
            }
            var userinfo = {"username":this.username, "password":this.password, "nickname":this.nickname,"role_id":this.role_id};
            this.common.postEventToken(this.api.host+this.api.adminUser,userinfo,this.userinfo,function(data){
                console.log(data);
                self.dialogVisible = false;
                self.adminUserEvent();
                self.username = "";
                self.password = "";
                self.nickname = "";
                self.role_id = "";
            })


        },
        adminUserEvent(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.adminUser,{},this.userinfo,function(data){
                self.adminUserList = data;
            });
        },
        rolesListEvent(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.roles,{},this.userinfo,function(data){
                self.rolesList = data;
            });
        }


    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.adminUserEvent();
        this.rolesListEvent();

    }
}
</script>

<style>
    #jurisdiction{
        text-align:left;
    }
.view_main{

    margin-top:10px
    }
.input_type{
    width: 200px;
    }
</style>