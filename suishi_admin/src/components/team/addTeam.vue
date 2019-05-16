<template>
    <div id="addTeam" @click="displayChange(false)">
        <div class="top-main">
            <div class="fraction">
            得分：{{total_score}}
            </div>
            <p class="title_main">专业列表</p>
        </div>
        <div class="view_main">
            <span>队伍名称</span>
            <el-input v-model="teamName" class="input_type" readonly></el-input>
            <span>组队类型</span>
            <el-input readonly v-model="teamType"  class="input_type"></el-input>
            <span>是否禁用</span>
            <el-input readonly v-model="statusValue"  class="input_type"></el-input>
            <el-button type="primary" @click="LabelDialog(0,true)">编辑</el-button>
        </div>
        <div class="view_main view_main2">
         <!--   <span>队友名称</span>
            <el-input v-model="userName" class="input_type" readonly></el-input>
            <el-button @click="LabelDialog(2,true)">选择用户</el-button>-->
            <span>队友名称</span>
            <div class="select-main"  @click.stop>
                <el-input v-model="nickSelect" placeholder="选择用户" @focus="displayChange(true)" @blur="blurEvent"  @keyup.native="searchEvent" class="input_type" />
                <ul class="select-menu" v-show="mIsShow" >
                    <li v-for="item in userData" v-text="item.nick" @click="changeEvent(item.id,item.nick)"></li>
                </ul>
            </div>
            <span>角色</span>
            <el-select v-model="roleValue" placeholder="选择角色">
                <el-option
                v-for="item in roleMenu"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" @click="addAccount">新增成员</el-button>
        </div>
        <template>
            <el-table
            :data="accountData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="用户ID"
                >
                </el-table-column>
                <el-table-column
                prop="accountNick"
                label="昵称"
                >
                </el-table-column>

                <el-table-column
                prop="name"
                label="身份"
                >
                    <template slot-scope="scope">
                        <p v-if="scope.row.role == 1">队长</p>
                        <p v-else>成员</p>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="seeUserEvemt(scope.row.id,scope.row.accountNick)">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="view_main">
            任务
            <el-button type="primary" @click="LabelDialog(1,true)">添加任务</el-button>
        </div>
        <template>
            <el-table
            :data="taskData"
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
              <!--  <el-table-column
                prop="finish_date"
                label="发布日期"
                >
                </el-table-column>-->
                <el-table-column
                prop="finish_date"
                label="完成日期"
                >
                </el-table-column>
              <!--  <el-table-column
                prop="name"
                label="完成状态"
                >
                </el-table-column>-->
                <el-table-column
                prop="score"
                label="打分"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="seeTaskEvemt(scope.row.id)">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="编辑队伍" :visible.sync="editTeamVisible" width="30%">
            <div class="view_main">
                <span>队伍名称</span>
                <el-input v-model="editTeamName" class="input_type"></el-input>
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
            <el-button @click="editTeamEvent">修改</el-button>
        </el-dialog>
        <el-dialog title="新增任务" :visible.sync="editTaskVisible" width="30%">
            <div class="view_main">
                <span>任务名称</span>
                <el-input v-model="taskName" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>分数</span>
                <el-input  class="input_type" v-model="taskScore" />
            </div>
            <div class="view_main">
                <span>是否禁用</span>
                <el-select v-model="taskStatus" placeholder="是否禁用">
                    <el-option
                    v-for="item in isUseMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="addTask">添加</el-button>
        </el-dialog>
        <el-dialog title="选择成员" :visible.sync="editUserVisible" width="60%">
            <div class="view_main">
                    <el-button v-for="data in userData"  @click="slectEvent(data.nick,data.id)">{{data.nick}}</el-button>
            </div>
            <div class="view_main page_main">
                <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="nowPage"
                :total="1000">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="编辑任务" :visible.sync="editTeamInfoVisible" width="60%">
            <div class="view_main">
                <span>任务名称</span>
                <el-input v-model="taskDataSingle.taskName" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>分数</span>
                <el-input  class="input_type" v-model="taskDataSingle.taskScore" />
            </div>
            <div class="view_main">
                <span>是否禁用</span>
                <el-select v-model="taskDataSingle.taskStatus" placeholder="是否禁用">
                    <el-option
                    v-for="item in isUseMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="editTaskEvent">修改</el-button>
        </el-dialog>
        <el-dialog title="编辑队员" :visible.sync="editUserInfoVisible" width="60%">
            <div class="view_main">
                <span>队员名称</span>
                <el-input v-model="userDataSingle.userNick" class="input_type" readonly></el-input>
            </div>
            <div class="view_main">
                <span>角色</span>
                <el-select v-model="userDataSingle.role" placeholder="选择角色">
                    <el-option
                    v-for="item in roleMenu"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="editUserEvemt">修改</el-button>
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
                taskData: [],
                userinfo:"",
                teamTypeData:[],
                teamTypeValue:"",
                teamTypeObj:{},
                teamName:"",
                editTeamName:"",
                teamType:"",
                teamTypeId:"",
                status:"",
                statusValue:"",
                total_score:"",
                editTeamVisible:false,
                roleMenu:[{
                    id:"0",
                    name:"成员"
                },{
                    id:"1",
                    name:"队长"
                }],
                roleValue:"",
                taskScore:"",
                taskStatus:"0",
                taskName:"",
                editTaskVisible:false,
                editUserVisible:false,
                userLabel:"",
                userName:"",
                userId:"",
                nowPage:1,
                userData: [],
                accountData:[],
                editTeamInfoVisible:false,
                editUserInfoVisible:false,
                taskDataSingle:{
                    taskId:"",
                    taskName:"",
                    taskScore:"0",
                    taskStatus:"0",
                    team_id:""
                },
                userDataSingle:{
                    team_id:"",
                    role:"0",
                    account:"",
                    id:"",
                    userNick:""
                },
                nickSelect:"",
                saveNickSelect:"",
                mIsShow:false
            }
        },
        methods:{
            LabelDialog(type,boolean){
                if(type == 0){
                    this.editTeamVisible = boolean;
                }else if(type == 1){
                    this.editTaskVisible = boolean;
                }else if(type == 2){
                    this.nowPage = 1;
                    this.editUserVisible = boolean;
                }else if(type == 3){
                    this.editTeamInfoVisible = boolean
                }

            },
//            addTeams(){
//                var self = this;
//                this.common.postEventToken(this.api.host+this.api.addTeams,{},this.userinfo,function(data){
//                    console.log(data);
//                    self.postList = data;
//                })
//            },
            teamTypeList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.teamType,{},this.userinfo,function(data){
                    console.log(data);
                    self.teamTypeData = data.data;
                    for(var index in self.teamTypeData){
                        self.teamTypeObj[self.teamTypeData[index].id] = self.teamTypeData[index].name;
                    }
                })
            },
            getTeamList(){
                var self = this;
                if(this.isedits()){
                    this.common.getEventToken(this.api.host+this.api.addTeams+"/"+this.$route.query.id,{},this.userinfo,function(data){
                        console.log(data);
                        self.teamName = data.name;
                        self.editTeamName = data.name;
                        self.teamTypeId = data.team_type_id;
                        self.isStatus = data.status;
                        self.status = data.status;
                        self.total_score = data.total_score;
                        if(self.status == 1){
                            self.statusValue = "是"
                        }else{
                            self.statusValue = "否"
                        }
                    })
                }
            },
            //编辑队伍
            editTeamEvent(){
                var self = this;
                if(this.isedits()){
                    this.common.putEventToken(this.api.host+this.api.addTeams+"/"+this.$route.query.id,{"name":this.editTeamName, "team_type_id":this.teamTypeId, "status":parseInt(this.isStatus)},this.userinfo,function(data){
                        self.editTeamVisible = false;
                        self.getTeamList();
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
                        self.accountData = data.data;
                    })
                }
            },
            //任务列表
            taskList(){
                var self = this;
                if(this.isedits()){
                    this.common.getEventToken(this.api.host+this.api.taskList+this.$route.query.id,{},this.userinfo,function(data){
                        console.log(data);
                        self.taskData = data.data;
                    })
                }
            },
            addTask(){
                var self = this;
                if(this.taskName == ""){
                    alert("输入任务名称");
                    return;
                }else if(this.taskScore ==""){
                    alert("输入分数");
                    return
                }
                if(this.isedits()) {
                    this.common.postEventToken(this.api.host + this.api.addTask, {"team_id": this.$route.query.id, "name": this.taskName, "score": this.taskScore, "status": this.taskStatus}, this.userinfo, function (data) {
                        console.log(data);
                        self.editTaskVisible = false;
                        self.taskList();
                    })
                }
            },
            userList(name){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.user+"?nick="+name,{},this.userinfo,function(data){
                    self.userData = data.data;
                    console.log(data)
                });
            },
            slectEvent(nick,id){
                this.userName = nick;
                this.userId = id;
                this.editUserVisible = false;
            },
            addAccount(){
                var self = this;
                this.common.postEventToken(this.api.host+this.api.account,{"team_id":this.$route.query.id, "account":this.userId, "role":this.roleValue},this.userinfo,function(data){
                    console.log(data);
                    self.accountList();
                })
            },
            //查看任务
            seeTaskEvemt(id){
                var self = this;
                this.editTeamInfoVisible = true;
                this.common.getEventToken(this.api.host+this.api.addTask+"/"+id,{},this.userinfo,function(data){
                    console.log(data);
                    self.taskDataSingle.taskId = data.id;
                    self.taskDataSingle.taskName = data.name;
                    self.taskDataSingle.taskScore = data.score;
                    self.taskDataSingle.taskStatus = data.status;
                    self.taskDataSingle.team_id = data.team_id;
                })
            },
            editTaskEvent(){
                var self = this;
                this.editTeamInfoVisible = false;
                if(this.taskDataSingle.taskName == ""){
                    alert("输入任务名称");
                    return;
                }else if(this.taskDataSingle.taskScore == ""){
                    alert("输入分数");
                    return;
                }
                this.common.putEventToken(this.api.host+this.api.addTask+"/"+ self.taskDataSingle.taskId,{"team_id":this.taskDataSingle.team_id, "name":this.taskDataSingle.taskName, "score":this.taskDataSingle.taskScore,  "status":this.taskDataSingle.taskStatus},this.userinfo,function(data){
                    console.log(data);
                    self.taskList();
                })
            },
            seeUserEvemt(id,accountNick){
                var self = this;
                this.editUserInfoVisible = true;
                this.common.getEventToken(this.api.host+this.api.account+"/"+id,{},this.userinfo,function(data){
                    self.userDataSingle.team_id = data.team_id;
                    self.userDataSingle.role = data.role;
                    self.userDataSingle.account = data.account;
                    self.userDataSingle.id = data.id;
                    self.userDataSingle.userNick = accountNick
                })
            },
            editUserEvemt(){
                var self = this;
                this.common.putEventToken(this.api.host+this.api.account+"/"+this.userDataSingle.id,{"team_id":this.userDataSingle.team_id, "account":this.userDataSingle.account, "role":this.userDataSingle.role},this.userinfo,function(data){
                    console.log(data);
                    self.editUserInfoVisible = false;
                    self.accountList();
                })
            },
            changeEvent(id,name){
                this.userId = id;
                this.nickSelect = name;
                this.saveNickSelect = name;
                this.displayChange(false);
            },
            blurEvent(){
                this.nickSelect = this.saveNickSelect;
            },
            searchEvent(){
                this.userList(this.nickSelect);
            },
            displayChange(boolean){
                this.mIsShow = boolean;
            },
        },
        watch:{
            teamTypeId(){
                var self =this;

                if(this.teamTypeObj[this.teamTypeId] != undefined){
                    self.teamType = self.teamTypeObj[self.teamTypeId];
                    self.teamTypeValue = self.teamTypeId;
                }
            },
            nowPage(){

            }
        },
        mounted:function(){
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.userList("");
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
.page_main{
    text-align:center;
    }
</style>