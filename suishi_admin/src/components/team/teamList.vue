<template>
    <div id="teamList">
        <div class="type_menu">
            <el-select v-model="typeValue" placeholder="所属圈子">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="typeValue1" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
        <div class="view_main"><el-button class="add_btn" @click="LabelDialog(true)">新增</el-button></div>
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
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="新增队伍" :visible.sync="dialogTableVisible" width="30%">
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
            <el-button @click="addTeamEvent">添加</el-button>
        </el-dialog>
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
                    label: "否"}
            ],
            isUse: "0",
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
            teamList:[]

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
                console.log(data);
                self.teamTypeData = data;
                for(var index in data){
                    self.teamTypeObj[data[index].id] = data[index].name;
                }
            })
        },
        getTeamList(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.addTeams,{},this.userinfo,function(data){
                console.log(data);
                self.teamList = data;
            })
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