<template>
    <div id="circleType">
        <p class="title_main">圈子类型管理</p>
        <div class="view_main">
            <el-button @click="LabelDialog(true)"  type="primary">新增圈子类型</el-button>
        </div>
        <div class="view_main" v-if="circleData.length>0">
            <template>
                <el-table
                :data="circleData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                    >
                    </el-table-column>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="editEvent(scope.row.id)" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteEvent(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    <el-dialog title="新增圈子类型" :visible.sync="dialogTableVisible" width="30%">
        <div class="view_main">
            <span>类型：</span>
            <el-input v-model="circleName" class="input_type"></el-input>
        </div>
        <div class="view_main">
            <span>简介：</span>
            <el-input v-model="description" class="input_type"></el-input>
        </div>
        <div class="view_main"><el-button @click="addCircle"  type="primary">添加</el-button></div>
    </el-dialog>
    <el-dialog title="编辑圈子类型" :visible.sync="editDialogTableVisible" width="30%">
        <div class="view_main">
            <span>类型：</span>
            <el-input v-model="eCircleName" class="input_type"></el-input>
        </div>
        <div class="view_main">
            <span>简介：</span>
            <!--<el-input v-model="eDescription" class="input_type"></el-input>-->
            <el-input
                    class="textarea_type2"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="eDescription">
        </el-input><span>最多300字</span>
        </div>
        <div class="view_main"> <el-button @click="editCircle"  type="primary">修改</el-button></div>
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
                dialogTableVisible:false,
    editDialogTableVisible:false,
                circleName:"",
                circleType:"",
                circleData:[],
                description:"",
                eCircleName:"",
                eCircleId:"",
                eDescription:"",
                nowPage:1,
                allPage:0
            }
    },
    methods:{
        LabelDialog(boolean){
             this.dialogTableVisible = boolean;
        },
            addCircle(){
                var self = this;
                if(this.circleName == ""){
                    alert("请输入类型");
                    return ;
                }
                this.common.postEventToken(this.api.host+this.api.categoryType,{"name":this.circleName,"description":this.description},this.userinfo,function(data){
                    self.dialogTableVisible = false;
                    self.circleName = "";
                    self.description = "";
                    self.circleList();
                });
            },
            circleList(){
                 var self = this;
                this.common.getEventToken(this.api.host+this.api.categoryType+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
                    self.circleData = data.data;
                    self.allPage = data.last_page * 10;
                });
            },
            editEvent(id){
                var self = this;
                this.editDialogTableVisible = true;
                    this.common.getEventToken(this.api.host+this.api.categoryType+"/"+id,{},this.userinfo,function(data){
                        // self.circleData = data;
                         console.log(data)
                        self.eCircleName = data.name;
                        self.eDescription = data.description;
                        self.eCircleId = data.id;
                     });
            },
            deleteEvent(id){
                var self = this;
                this.common.commonDeleteEvent(this,this.userinfo,this.api.categoryType,id,function(){
                    self.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    self.circleList();
                })
            },
            editCircle(){
                var self = this;
                if(this.eCircleName == ""){
                    alert("请输入类型");
                    return ;
                }else if(this.eDescription == ""){
                    alert("请输入简介");
                    return ;
                }
                this.common.putEventToken(this.api.host+this.api.categoryType+"/"+self.eCircleId,{"name":this.eCircleName,"description":this.eDescription},this.userinfo,function(data){
                    self.editDialogTableVisible = false;
                    self.circleList();
                });
            }
    },
    watch:{
        nowPage(){
            this.circleList();
        },
        eDescription(){
            if(this.eDescription.length>300){
                this.eDescription = this.eDescription.slice(0,299);
            }
        }
    },
    mounted:function(){
    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
    this.circleList();
    }
}
</script>
<style>
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
.view_main{
    overflow:hidden;
    margin-top:10px
    }
.input_type{
    width: 200px;
    }
.textarea_type2{
    width: 300px;;
}
</style>