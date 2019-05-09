<template>
    <div id="addTeam">
        <div class="top-main">
            <div class="fraction">
            得分：{{total_score}}
            </div>
            <p class="title_main">专业列表</p>
        </div>
        <div class="view_main">
            <span>队伍名称</span>
            <el-input readonly v-model="teamName" class="input_type"></el-input>
            <span>组队类型</span>
            <el-input readonly v-model="teamType"  class="input_type"></el-input>
            <span>是否禁用</span>
            <el-input readonly v-model="statusValue"  class="input_type"></el-input>
            <el-button type="primary" @click="LabelDialog(0,true)">编辑</el-button>
        </div>
        <div class="view_main">
            <span>队友名称</span>
            <el-input class="input_type"></el-input>
            <span>角色</span>
            <el-select v-model="roleValue" placeholder="选择角色">
                <el-option
                v-for="item in roleMenu"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary">新增成员</el-button>
        </div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="用户ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="昵称"
                >
                </el-table-column>

                <el-table-column
                prop="name"
                label="身份"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="view_main">
            任务
            <el-button type="primary">添加任务</el-button>
        </div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="任务ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="任务名称"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="发布日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="最迟完成日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="完成状态"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="打分"
                >
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="新增队伍" :visible.sync="editTeamVisible" width="30%">
            <div class="view_main">
                <span>队伍名称</span>
                <el-input v-model="teamName" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>队伍类型</span>
                <el-select v-model="teamTypeValue" placeholder="队伍类型">
                    <el-option
                    v-for="item in teamTypeData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="view_main">
                <span>是否禁用</span>
                <el-select v-model="isStatus" placeholder="是否禁用">
                    <el-option
                    v-for="item in isUseMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="">添加</el-button>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                isUseMenu: [
                    {value: "1",
                        label: "是"},
                    {value: "0",
                        label: "否"}
                ],
                isUse: "0",
                isStatus:"0",
                tableData: [{
                    id: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                userinfo:"",
                teamTypeData:[],
                teamTypeValue:"",
                teamTypeObj:{},
                teamName:"",
                teamType:"",
                teamTypeId:"",
                status:"",
                statusValue:"",
                total_score:"",
                editTeamVisible:false,
                roleMenu:[{
                    id:0,
                    name:"成员"
                },{
                    id:1,
                    name:"队长"
                }],
                roleValue:""
            }
        },
        methods:{
            LabelDialog(type,boolean){
                this.editTeamVisible = boolean;
            },
            addTeams(){
                var self = this;
                this.common.postEventToken(this.api.host+this.api.addTeams,{},this.userinfo,function(data){
                    console.log(data);
                    self.postList = data;
                })
            },
            teamTypeList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.teamType,{},this.userinfo,function(data){
                    console.log(data);
                    self.teamTypeData = data;
                    for(var index in data){
                        self.teamTypeObj[data[index].id] = data[index].name;
                    }
                })
            },
            getTeamList(){
                var self = this;
                if(this.isedits()){
                    this.common.getEventToken(this.api.host+this.api.addTeams+"/"+this.$route.query.id,{},this.userinfo,function(data){
                        console.log(data);
                        self.teamName = data.name;
                        self.teamTypeId = data.team_type_id;
                        self.isStatus = data.status;
                        self.status = data.status;
                        self.total_score = data.total_score;
                        if(self.status){
                            self.statusValue = "是"
                        }else{
                            self.statusValue = "否"
                        }
                    })
                }

            },
            isedits(){
                if(this.$route.name == "editTeam"){
                    return true;
                }else{
                    return false;
                }
            },
            //成员列表
            accountList(){
                var self = this;
                if(this.isedits()){
                    this.common.getEventToken(this.api.host+this.api.account+"?team_id="+this.$route.query.id,{},this.userinfo,function(data){
                        console.log(data);

                    })
                }
            },
            taskList(){
                var self = this;
                if(this.isedits()){
                    this.common.getEventToken(this.api.host+this.api.taskList+this.$route.query.id,{},this.userinfo,function(data){
                        console.log(data);

                    })
                }
            }
        },
        watch:{
            teamTypeId(){
                var self =this;
                if(this.teamTypeObj[this.teamTypeId] != undefined){
                    self.teamType = self.teamTypeObj[self.teamTypeId];
                    self.teamTypeValue = self.teamTypeId;
                }
            }
        },
        mounted:function(){
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.teamTypeList();
            this.getTeamList();
            this.accountList();
            this.taskList();
        }
    }
</script>
<style>
    .top-main{
         position:relative;
    }
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
    .fraction{
        width:30%;
   float:right;
    padding:20px 0;
    }
.view_main{
    margin-top:10px
    }
.input_type{
    width: 200px;
    }
</style>