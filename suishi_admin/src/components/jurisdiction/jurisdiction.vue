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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
            <div class="view_main">
                <span>职位</span>
                <el-select v-model="role_id" placeholder="职位">
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
        }
    },
    methods:{
        handleClick(row) {
            console.log(row);
            this.$router.push("/seeJurisdiction")
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
            //http://admin.suishi.com/admin/admin_user
            this.dialogVisible = false;

        },
        //http://admin.suishi.com/admin/admin_user
        adminUserEvent(){
            this.adminUserList=[
                {
                    "id": 2,
                    "username": "admin",
                    "name": "测试2",
                    "avatar": null,
                    "created_at": null,
                    "updated_at": "2019-04-17 21:06:32",
                    "role_id": "2"
                },
                {
                    "id": 3,
                    "username": "test2",
                    "name": "测试2",
                    "avatar": null,
                    "created_at": "2019-04-17 20:39:17",
                    "updated_at": "2019-04-17 20:39:17",
                    "role_id": "2"
                }
            ];
        },
        //http://admin.suishi.com/admin/admin_user/roles
        rolesListEvent(){
            this.rolesList =  [
                {
                    "id": 2,
                    "name": "管理员",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 3,
                    "name": "运营",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 4,
                    "name": "开发",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 5,
                    "name": "产品",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 6,
                    "name": "市场",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 7,
                    "name": "测试",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 8,
                    "name": "实习生",
                    "slug": " ",
                    "created_at": null,
                    "updated_at": null
                }
            ]
        }
    },
    mounted:function(){
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