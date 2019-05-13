<template>
    <div id="teamAttribute">
        <p class="title_main">新增游戏</p>
        <div class="view_main">
            <el-input
            placeholder="输入名称"
                v-model="typeName"
            class="search_input"
            >
            </el-input>
            <el-button @click="teamTypeEvent">新增</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="teamTypeData"
                border
                style="width: 100%">
                    <el-table-column
                    prop="id"
                    label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="类型"
                    >
                    </el-table-column>

                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="editType(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </template>
        </div>
    <el-dialog title="编辑类型" :visible.sync="dialogTableVisible">
        <div class="dialog_menu">
           <el-input v-model="typeNames" />
        </div>
        <el-button @click="saveType">保存并关闭</el-button>
    </el-dialog>
    <div class="view_main page_main">
        <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="nowPage"
        :total="allPage">
        </el-pagination>
    </div>
    </div>
</template>
    <script>
        export default{
            data(){
                return{
                    userinfo:"",
                    typeName:"",
                    teamTypeData:[],
                    typeNames:"",
                    typeId:"",
                    dialogTableVisible:false,
                    nowPage:1,
                    allPage:0
                }
            },
            methods:{
                teamTypeEvent(){
                    var self = this;
                    if(this.typeName == ""){
                        alert("输入类型");
                        return
                    }
                    this.common.postEventToken(this.api.host+this.api.teamType,{"name":this.typeName},this.userinfo,function(data){
                        console.log(data);
                        self.teamTypeList();
                    })
                },
                teamTypeList(){
                    var self = this;
                    this.common.getEventToken(this.api.host+this.api.teamType+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
                        console.log(data);
                        self.teamTypeData = data.data;
                        self.allPage = data.last_page * 10;
                    })
                },
                saveType(){
                    this.dialogTableVisible = false;
                },
                editType(info){
                    this.dialogTableVisible = true;
                    this.typeId = info.id;
                    this.typeNames = info.name;
                }
            },
            watch:{
                nowPage(){
                    this.teamTypeList();
                }
            },
            mounted:function(){
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.teamTypeList();
            }
        }
    </script>
<style>
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
.view_main{
    margin-top:10px
    }
.search_input{
    width: 300px;
    }
</style>