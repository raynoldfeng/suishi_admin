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
                    label="队伍ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="account"
                    label="用户昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="course_name"
                    label="登录类型"
                    >
                        <template slot-scope="scope">
                            <p v-if="scope.row.course_name == 0" >已报名</p>
                            <p v-else-if="scope.row.course_name == 1">已分配</p>
                            <p v-else-if="scope.row.course_name == 2">已拒绝</p>
                            <p v-else-if="scope.row.course_name == 3">未报名</p>
                            <p v-else>未报名</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <p v-if="scope.row.real_name" v-text="scope.row.real_name"></p>
                            <p v-else>0</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="联系方式"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="teamListShow(scope.row)" type="text" size="small">分配队伍</el-button>
                            <el-button type="text" size="small" @click="deleteEvent(scope.row.account)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-dialog title="分配队伍" :visible.sync="dialogTableVisible">
            <div class="view_main">
                <el-table
                :data="teamList"
                border
                style="width: 100%"
                tooltip-effect="dark"
               >
                <el-table-column
                        width="55">
                    <template slot-scope="scope">
                        <div class="choice_btn" :class="{choice_clicked : nowTeam == scope.$index}" @click="selectEvent(scope)"></div>
                    </template>

                </el-table-column>
                <el-table-column
                        prop="name"
                        label="队伍名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="team_type_id"
                        label="学习类型"
                        >
                    <template slot-scope="scope">
                        <p v-html="teamTypeObj[scope.row.team_type_id]"></p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="当前人数">
                </el-table-column>
                </el-table>
            </div>
            <div class="view_main">
                <div class="view_main page_main">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                    :current-page.sync="teamNowPage"
                    :total="teamAllPage">
                </el-pagination>
                </div>
            </div>
            <el-button @click="toggleSelection">确认分配</el-button>
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
                isUseMenu: [
                    {value: "true",
                        label: "是"},
                    {value: "false",
                        label: "否"}
                ],
                isUse: "false",
                userJumpData:[],
                userinfo:"",
                dialogTableVisible:false,
                nowPage:1,
                allPage:0,
                teamList:[],
                teamNowPage:1,
                teamAllPage:0,
                teamTypeObj:{},
                teamTypeData:"",
                choiceUser:"",
                choiceTeam:[],
                nowTeam:"-1",
                nowTeamData:"",
                nowUser:"",
                dialogVisible:false
            }
        },
        mounted:function(){
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.requestUserJump();
            this.teamTypeList();

        },
        methods:{
            requestUserJump(){
                var self =this;
                this.common.getEventToken(this.api.host+this.api.request+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
                    self.userJumpData = data.data;
                    self.allPage = data.last_page * 10;
                })
            },
            teamListShow(data){
                this.dialogTableVisible = true;
                this.nowUser = data;
                this.getTeamList();
            },
            getTeamList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.addTeams+"?page="+this.teamNowPage+"&per_page=10",{},this.userinfo,function(data){
                    console.log(data);
                    self.teamList = data.data;
                    self.teamAllPage = data.last_page * 10;

                })
            },
            teamTypeList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.teamType,{},this.userinfo,function(data){
                    self.teamTypeData = data.data;
                    for(var index in self.teamTypeData){
                        self.teamTypeObj[self.teamTypeData[index].id] = self.teamTypeData[index].name;
                    }
                })
            },
            toggleSelection(){
                var self=this;
                var data = {"account":this.nowUser.account,"team_id":this.nowTeamData.id,role:this.nowUser.role};
                if(this.nowTeam != "-1"){
                    this.common.putEventToken(this.api.host+this.api.allot,data,this.userinfo,function(data){
                        self.dialogTableVisible = false;
                        self.getTeamList();
                        self.$message({
                            message: '分配成功',
                            type: 'success'
                        });
                    })
                }else{
                    alert("选择队伍")
                }
            },
            selectEvent(data){
                this.nowTeam = data.$index;
                this.nowTeamData = data.row;
            },
            deleteEvent(account){
                this.handleClose(account);
            },
            handleClose(account) {
                var self=this;
                this.$confirm('确认删除用户？')
                                .then(_ => {
                        this.common.putEventToken(this.api.host+this.api.reject,{"account":account},this.userinfo,function(data){
                            console.log(data);
                            self.getTeamList();
                            self.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        })
                    }).catch(_ => {
                        this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                    });
            }

        },
        watch:{
            nowPage(){
                this.requestUserJump();
            },
            dialogTableVisible(){
                this.nowTeam = "-1";
                this.nowTeamData = "";
            }
        },
    }
</script>
<style>
.choice_btn{
    width: 20px;
    height: 20px;
    border: 1px solid #999999;
    margin: 0 auto;
    cursor: pointer;
}
.choice_clicked{
    background: deepskyblue;
    border: 1px solid deepskyblue;
}
</style>