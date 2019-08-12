<template>
    <div id="userJump">
        <p class="title_main">报名用户管理</p>
        <div class="view_main">
            <span>是否禁用</span>
            <el-select v-model="isUse" placeholder="是否禁用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input
            placeholder="输入关键字"
            class="search_input"
            >
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="userJumpData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="team_id"
                    label="用户ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="real_name"
                    label="用户昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="course_name"
                    label="登录类型"
                    >
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <p v-if="scope.row.url" v-text="scope.row.url.length"></p>
                            <p v-else>0</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="联系方式"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="deleteEvent(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                isUseMenu: [
                    {value: "true",
                        label: "是"},
                    {value: "false",
                        label: "否"}
                ],
                isUse: "false",
                userJumpData:[],
                userinfo:""
            }
        },
        mounted:function(){
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.requestUserJump();
        },
        methods:{
            requestUserJump(){
                var self =this;
                this.common.getEventToken(this.api.host+this.api.request,{},this.userinfo,function(data){
                    console.log(3333)
                    console.log(data)
                    self.userinfo = data;
                })
            }
        }
    }
</script>
<style>

</style>