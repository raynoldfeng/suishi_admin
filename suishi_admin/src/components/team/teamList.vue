<template>
    <div id="teamList">
        <p class="title_main">队伍列表</p>
        <div class="view_main">
            <!--<el-select v-model="typeValue" placeholder="所属圈子">-->
                <!--<el-option-->
                <!--v-for="item in isUseMenu"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="typeValue1" placeholder="是否推荐">-->
                <!--<el-option-->
                <!--v-for="item in isUseMenu"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <el-select v-model="isUse" placeholder="是否禁用" @change="getTeamList(1)">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input
                    v-model="teamName"
            placeholder="输入关键字"
            class="search_input"
            >
            </el-input>
            <el-button @click="getTeamList">搜索</el-button>
        </div>
        <div class="view_main"><el-button class="add_btn" type="primary" @click="LabelDialog(true)">新增队伍</el-button></div>
        <div class="view_main">
            <template>
                <el-table
                :data="teamList"
                border
                style="width: 100%">
                    <el-table-column
                    prop="id"
                    label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="队伍名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="team_type_id"
                    label="类型"
                    >
                        <template slot-scope="scope">
                            <p v-html="teamTypeObj[scope.row.team_type_id]"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="number"
                    label="人数"
                    >
                    </el-table-column>
                  <!--  <el-table-column
                    prop="name"
                    label="创建时间"
                    >
                    </el-table-column>-->
                    <el-table-column
                    prop="total_score"
                    label="得分"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="是否禁用"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0">否</span>
                            <span v-else>是</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button @click="deleteEvent(scope.row.id)" type="text" size="small">解散</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
         </div>
        <el-dialog title="新增队伍" :visible.sync="dialogTableVisible" width="30%">
            <div class="view_main">
                <span>队伍名称：</span>
                <el-input v-model="teamName" class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>队伍类型：</span>
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
                <span>是否禁用：</span>
                <el-select v-model="isStatus" placeholder="是否禁用">
                    <el-option
                    v-for="item in isUseMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="view_main"><el-button @click="addTeamEvent" type="primary">添加</el-button>  </div>
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
export default
{
    data()
    {
        return{
            typeValue: '',
            typeValue1: '',
            isUseMenu: [
                {value: "1",
                    label: "是"},
                {value: "0",
                    label: "否"},
                {value:"-1",
                    label:"全部"}
            ],
            isUse: "-1",
            isStatus:"0",
            searchText:"",
            tableData: [{
                id: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }],
            userinfo:"",
            teamTypeObj:{},
            teamTypeData:[],
            teamTypeValue:"",
            teamName:"",
            dialogTableVisible:false,
            teamList:[],
            nowPage:1,
            allPage:0,
            teamName:""

        }
    },
    methods:{
        LabelDialog(boolean){
            this.dialogTableVisible = boolean;
        },
        editEvent(id){
            this.$router.push({path:"/editTeam",query:{id:id}})
        },
        teamTypeList(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.teamType,{},this.userinfo,function(data){
                console.log(22);
                console.log(data);
                self.teamTypeData = data.data;
                for(var index in self.teamTypeData){
                    self.teamTypeObj[self.teamTypeData[index].id] = self.teamTypeData[index].name;
                }
            })
        },
        getTeamList(type){
            var self = this;
            if(type == 1){
                this.nowPage = 1;
            }
            var url = this.api.host+this.api.addTeams+"?page="+this.nowPage+"&per_page=10&name="+this.teamName;
            if(this.isUse != "-1"){
                url+=("&status="+this.isUse);
            }
            this.common.getEventToken(url,{},this.userinfo,function(data){
                console.log(data);
                self.teamList = data.data;
                self.allPage = data.last_page * 10;
            })
        },
        deleteEvent(id){
            this.$confirm('确认解散队伍？')
                    .then(_ => {
                this.common.deleteEventToken(this.api.host+this.api.addTeams+"/"+id,{},this.userinfo,(data)=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getTeamList();
                })
            }).catch(_ => {

            });

        },
        addTeamEvent(){
            var self = this;
            if(this.teamName == ""){
                alert("输入队伍名称");
                return;
            }else if(this.teamTypeValue == ""){
                alert("请选择队伍类型");
                return;
            }
            this.common.postEventToken(this.api.host+this.api.addTeams,{"name":this.teamName, "team_type_id":this.teamTypeValue, "status":this.isStatus},this.userinfo,function(data){
                console.log(data);
                self.dialogTableVisible = false;
                self.getTeamList()
            })
        }

    },
    watch:{
        nowPage(){
            this.getTeamList();
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.teamTypeList();
        this.getTeamList();
    }

}
</script>
    <style>
    .search_input{
        width: 300px;
        }
    .view_main{
        margin-top:10px
        }
    </style>