<template>
    <div id="addTeam" @click="displayChange(false)">
        <div class="top-main">
            <div class="fraction">
            得分：{{total_score}}
            </div>
            <p class="title_main">编辑队伍</p>
        </div>
        <div class="view_main2">
            <span>队伍名称</span>
            <el-input v-model="teamName" class="input_type" readonly></el-input>
            <span>组队类型</span>
            <el-input readonly v-model="teamType"  class="input_type"></el-input>
            <span>是否禁用</span>
            <el-input readonly v-model="statusValue"  class="input_type"></el-input>
            <el-button type="primary" @click="LabelDialog(0,true)">编辑</el-button>
        </div>
        <div class=" view_main2">
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
                prop="account"
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
                        <el-button type="text" size="small" @click="seeUserEvemt(scope.row.account,scope.row.accountNick)">编辑</el-button>
                        <el-button @click="deleteUserEvent(scope.row.account)" type="text" size="small">删除</el-button>
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
                <el-table-column
                prop="desc"
                label="任务描述"
                >
                </el-table-column>
                <el-table-column
                        label="任务图片">
                    <template slot-scope="scope">
                        <img class="task_imgs" :src="scope.row.image" />
                    </template>
                </el-table-column>
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
                    prop="task_url"
                    label="任务地址"
                    >
            </el-table-column>
            <el-table-column
                    prop="assignment_url"
                    label="作业地址"
                    >
            </el-table-column>
            <el-table-column
                    label="任务状态"
                    >
                <template slot-scope="scope">
                    <p v-if="scope.row.status == 0">未开始</p>
                    <p v-if="scope.row.status == 1">进行中</p>
                    <p v-if="scope.row.status == 2">已提交</p>
                    <p v-if="scope.row.status == 3">已评分</p>

                </template>
            </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-if="scope.row.status == 0" @click="editTaskEvent(1,scope.row)">开始任务</el-button>
                        <el-button type="text" size="small" @click="seeTaskEvemt(scope.row.id)">编辑</el-button>
                        <el-button @click="deleteTaskEvemt(scope.row.id)" type="text" size="small">删除</el-button>
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
            <!--<div class="view_main">-->
                <!--<span>分数</span>-->
                <!--<el-input  class="input_type" v-model="taskScore" />-->
            <!--</div>-->
            <!--<div class="view_main">-->
                <!--<span>是否禁用</span>-->
                <!--<el-select v-model="taskStatus" placeholder="是否禁用">-->
                    <!--<el-option-->
                    <!--v-for="item in isUseMenu"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</div>-->
            <div class="view_main" style="overflow: hidden">
                <span class="type_title">任务封面</span>
                <input id="taskfile-selector"  type="file" >
                <div class="avatar-uploader" @click="uploadImg">
                <img v-if="taskcoverImg" :src="taskcoverImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </div>
            <div class="view_main" >
                <span>任务描述</span>
                <el-input  class="input_type" type="textarea" v-model="task_desc" />
            </div>
            <div class="view_main">
                <span>任务地址</span>
                <el-input  class="input_type" v-model="task_url" />
            </div>
            <div class="view_main">
                <span>作业地址</span>
                <el-input  class="input_type" v-model="assignment_url" />
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
            <div class="view_main" v-if="taskDataSingle.taskStatus == 2  || taskDataSingle.taskStatus == 3">
                <span>打分</span>
                <el-input  class="input_type" v-model="taskDataSingle.taskScore" />
            </div>
            <div class="view_main" >
                <span>任务描述</span>
                <el-input  class="input_type" v-model="taskDataSingle.desc" />
            </div>
            <div class="view_main" v-if="taskDataSingle.taskStatus == 2 || taskDataSingle.taskStatus == 3">
                <span>完成时间</span>
                <el-date-picker
                        v-model="taskDataSingle.finish_date"
                        type="datetime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="view_main" style="overflow: hidden">
                    <span class="type_title">任务封面</span>
                    <input id="editfile-selector"  type="file" >
                 <div class="avatar-uploader" @click="editUploadImg">
                    <img v-if="taskDataSingle.image" :src="taskDataSingle.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </div>
            <div class="view_main">
                <span>任务地址</span>
                <el-input  class="input_type" v-model="taskDataSingle.task_url" />
            </div>
            <div class="view_main">
                <span>作业地址</span>
                <el-input  class="input_type" v-model="taskDataSingle.assignment_url" />
            </div>
            <div class="view_main">
                <span>任务状态</span>
                <el-select v-model="taskDataSingle.taskStatus" placeholder="任务状态">
                    <el-option
                    v-for="item in taskMenu"
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
            <el-button @click="editUserEvent">修改</el-button>
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
                taskMenu:[
                    {value: "0",
                        label: "未开始"},
                    {value: "1",
                        label: "进行中"},
                    {value: "2",
                        label: "已提交"},
                    {value: "3",
                        label: "已评分"}
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
                taskScore:"0",
                assignment_url:"",
                task_url:"",
                taskStatus:"0",
                taskName:"",
                task_desc:"",
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
                    team_id:"",
                    assignment_url:"",
                    status:"",
                    finish_date:"",
                    desc:"",
                    task_url:"",
                    image:""
                },
                userDataSingle:{
                    team_id:"",
                    role:"0",
                    account:"",
                    id:"",
                    userNick:"",
                    status:""
                },
                nickSelect:"",
                saveNickSelect:"",
                mIsShow:false,
                taskcoverImg:"",
                istaskImgUploadInit:false,
                iseditImgUploadInit:false
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
            uploadImg(){
                document.getElementById('taskfile-selector').click();
                if(this.istaskImgUploadInit == false){
                    this.istaskImgUploadInit == true;
                    this.taskImgUploadInit();
                }
            },
            editUploadImg(){
                document.getElementById('editfile-selector').click();
                if(this.iseditImgUploadInit == false){
                    this.iseditImgUploadInit == true;
                    this.editImgUploadInit();
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
                        console.log(3)
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
                    this.common.postEventToken(this.api.host + this.api.addTask, {"team_id": this.$route.query.id, "name": this.taskName, "score": this.taskScore, "status": this.taskStatus,"assignment_url":this.assignment_url
                        ,"task_url":this.task_url,"desc":this.task_desc}, this.userinfo, function (data) {
                        console.log(data);
                        self.taskName = "";
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
            deleteTaskEvemt(id){
                var self = this;
                this.$confirm('确认删除任务？')
                        .then(_ => {
                    this.common.deleteEventToken(this.api.host+this.api.addTask+"/"+id,{},this.userinfo,function(data){
                            self.taskList();
                     })
            }).catch(_ => {});

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
                    self.taskDataSingle.assignment_url = data.assignment_url;
                    self.taskDataSingle.task_url = data.task_url;
                    self.taskDataSingle.desc = data.desc;
                    self.taskDataSingle.finish_date = data.finish_date;
                    self.taskDataSingle.image = data.image;
                })
            },
            editTaskEvent(type,data){
                var self = this;
            if(type == 1){
              console.log(data)
                var datas =  {"team_id":data.team_id,
                    "name":data.name,
                    "score":data.score,
                    "finish_date":data.finish_date,
                    "desc":data.desc,
                    "status":"1",
                    "image":data.image,
                    "assignment_url":data.assignment_url,
                    "task_url":data.task_url};
                var taskId = data.id;
            }else{
                this.editTeamInfoVisible = false;
                if(this.taskDataSingle.taskName == ""){
                    alert("输入任务名称");
                    return;
                }else if(this.taskDataSingle.taskScore == ""){
                    alert("输入分数");
                    return;
                }
                var datas =  {"team_id":this.taskDataSingle.team_id,
                    "name":this.taskDataSingle.taskName,
                    "score":this.taskDataSingle.taskScore,
                    "finish_date":this.taskDataSingle.finish_date,
                    "desc":this.taskDataSingle.desc,
                    "status":this.taskDataSingle.taskStatus,
                    "image":this.taskDataSingle.image,
                    "assignment_url":this.taskDataSingle.assignment_url,
                    "task_url":this.taskDataSingle.task_url}
                var taskId =  self.taskDataSingle.taskId
            }

                this.common.putEventToken(this.api.host+this.api.addTask+"/"+ taskId,datas
                       ,this.userinfo,function(data){
                    console.log(data);
                            self.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                    self.taskList();
                })
            },
            seeUserEvemt(account,accountNick){
                var self = this;
                this.editUserInfoVisible = true;
                this.common.getEventToken(this.api.host+this.api.account+"/"+account,{},this.userinfo,function(data){
                    self.userDataSingle.team_id = data.team_id;
                    self.userDataSingle.role = data.role;
                    self.userDataSingle.account = data.account;
                    self.userDataSingle.id = data.id;
                    self.userDataSingle.userNick = accountNick
                    self.userDataSingle.status = data.status;
                })
            },
            editUserEvent(){
                var self = this;
                this.common.putEventToken(this.api.host+this.api.account+"/"+this.userDataSingle.account,{"status":this.userDataSingle.status,"team_id":this.userDataSingle.team_id, "account":this.userDataSingle.account, "role":this.userDataSingle.role},this.userinfo,function(data){
                    console.log(data);
                    self.editUserInfoVisible = false;
                    self.accountList();
                    self.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
            },
            deleteUserEvent(account){
                var self = this;
                this.$confirm('确认删除队友？')
                        .then(_ => {
                    console.log(this.api.host+this.api.account+"/"+account)
                        this.common.deleteEventToken(this.api.host+this.api.account+"/"+account,{},this.userinfo,function(data){
                            self.accountList();
                        })
                }).catch(_ => {});
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
            taskImgUploadInit(){
                var self= this;
                document.getElementById('taskfile-selector').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
        //                console.log(file.name);
        //                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.taskcoverImg = img;
                            });
                        }
                    }

                };
            },
            editImgUploadInit(){
                var self= this;
                document.getElementById('editfile-selector').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    //                console.log(file.name);
                    //                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.taskDataSingle.image = img;
                            });
                        }
                    }

                };
            },
            getUpLoadKey(){
                var self =this;
                this.common.getEventToken(this.api.host+this.api.cosToken,{},this.userinfo,function(data){
                    console.log(data);
                    self.SecretId = data.credentials.tmpSecretId;
                    self.SecretKey = data.credentials.tmpSecretKey;
                    self.XCosSecurityToken = data.credentials.sessionToken;
                    self.expiredTime = data.expiredTime;
                })

            }
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
            var self = this;
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.userList("");
            this.teamTypeList();
            this.getTeamList();
            this.accountList();
            this.taskList();
            this.getUpLoadKey();


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
.task_imgs{
    width: 100%;;
}
    .avatar-uploader img{
        width: 178px;
        height: 178px;
    }
</style>