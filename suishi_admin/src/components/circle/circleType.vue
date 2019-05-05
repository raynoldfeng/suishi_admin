<template>
    <div id="circleType">
        <p class="title_main">圈子类型管理</p>
        <div class="view_main">
            <el-button @click="LabelDialog(true)">新增</el-button>
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
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    <el-dialog title="新增圈子类型" :visible.sync="dialogTableVisible" width="30%">
        <div class="view_main">
            <span>类型</span>
            <el-input v-model="circleName" class="input_type"></el-input>
        </div>
        <div class="view_main">
            <span>简介</span>
            <el-input v-model="description" class="input_type"></el-input>
        </div>
        <el-button @click="addCircle">添加</el-button>
    </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData: [{
                    id: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                userinfo:"",
                dialogTableVisible:false,
                circleName:"",
                circleType:"",
                circleData:"",
                description:""
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
                this.common.getEventToken(this.api.host+this.api.categoryType,{},this.userinfo,function(data){
                    self.circleData = data;
                });
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
</style>