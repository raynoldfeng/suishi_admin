<template>
    <div id="userAdministration">
        <div class="view_main">
            <el-input
            placeholder="请输入内容"
            class="search_input"
            v-model="searchText">
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="userData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="用户ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="nick"
                    label="昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status == 0" @click="statusChange(scope.$index,scope.row.id,scope.row.status)" type="text" size="small">封禁</el-button>
                            <el-button v-if="scope.row.status == 1" @click="statusChange(scope.$index,scope.row.id,scope.row.status)" type="text" size="small">解封</el-button>
                            <el-button @click="dialogVisibleEvent(true,scope.row.id)" type="text" size="small">注销</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="view_main page_main">
            <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="nowPage"
            :total="allPage">
            </el-pagination>
        </div>
<el-dialog
title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
<span>是否注销该账号</span>
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleEvent(false,'')">取 消</el-button>
<el-button type="primary" @click="logOutEvent">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                userData: [],
                searchText:"",
                userinfo:"",
                nowPage:1,
                allPage:0,
                dialogVisible:false,
                nowId:""
            }
        },
        methods:{
            userList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.user+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
                    self.userData = data.data;
                    self.allPage = data.last_page * 10;
                    console.log(data)
                });
            },
            statusChange(index,id,status){
                var self = this;
                var cStatus = status;
                if(status == 0){
                     cStatus = 1;
                }else{
                     cStatus = 0;
                }
                this.common.putEventToken(this.api.host+this.api.user+"/"+id,{status:cStatus},this.userinfo,function(data){
                    self.userData[index].status = data.status;
                });
            },
            dialogVisibleEvent(bool,id){
                this.dialogVisible = bool;
                this.nowId = id;
            },
            logOutEvent(){
                var self = this;
                if(this.nowId !=""){
                    this.common.deleteEventToken(this.api.host+this.api.user+"/"+this.nowId,{},this.userinfo,function(data){
                        alert("注销成功");
                        self.nowId = "";
                        self.dialogVisible = false;
                         self.userList();
                    })
                }

            }
        },
        watch:{
            nowPage(){
                this.userList();
            }
        },
        mounted:function(){
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.userList();
        }
    }
</script>
<style>
.search_input{
    width: 300px;
}
.view_main{
    overflow:hidden;
    margin-top:10px
}
.page_main{
    text-align:center;
    }
</style>