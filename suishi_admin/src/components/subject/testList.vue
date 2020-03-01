<template>
    <div id="testList">
        <p class="title_main">测试列表</p>
        <div class="view_main">
            <el-select v-model="typeValue" placeholder="类型">
                <el-option
                        v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="typeValue1" placeholder="专业">
            <el-option
                    v-for="item in optionsType"
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
            placeholder="请输入内容"
            class="search_input"
            v-model="searchText"
            >
            </el-input>
            <el-button @click="testData('1')">搜索</el-button>
            <el-button @click="testData('2')">还原</el-button>
        </div>
<div class="view_main"><el-button class="add_btn"  type="primary" @click="addEvent">新增测试</el-button></div>
        <div class="view_main">
<template>
<el-table
:data="testListData"
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
        label="试题题目"
        >
    <template slot-scope="scope">
        <p v-text="ellipsisEvent(scope.row.name)"></p>
    </template>
</el-table-column>
<el-table-column
        prop="course_id"
        label="类型"
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
    <el-button type="text" size="small" @click="deleteEvent(scope.row.id)">删除</el-button>
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
        </div>
        </template>
<style>
.search_input{
    width: 300px;
}
.add_btn{
    margin-top: 10px;
}
.view_main{
    margin-top:10px
}
</style>
<script>
export default
{
    data()
    {
        return{
            optionsType: [],
            typeValue: '',
            typeValue1: '',
            isUseMenu: [
                {value: "true",
                    label: "是"},
                {value: "false",
                    label: "否"}
            ],
            isUse: "false",
            searchText:"",
            testListData: [],
            nowPage:1,
            allPage:0,
            searchText:""
        }
    },
    methods:{
        ellipsisEvent(text){
            return this.common.ellipsisEvent(text);
        },
        addEvent(){
            this.$router.push("/addTest");
        },
        editEvent(id){
            this.$router.push({path: "/editTest", query: {id: id}});
        },
/**
 * type
 * 1点击搜索
 * 2 还原搜索
 */
        testData(type){
            if(type == 1){
               this.nowPage = 1;
            }else if(type == 2){
                this.nowPage = 1;
                this.searchText ="";
            }
            var self = this;
            this.common.getEventToken(this.api.host+this.api.test+"?page="+this.nowPage+"&per_page=10&name="+this.searchText,{},this.userinfo,function(data){
                console.log(data);
                self.testListData = data.data;
                self.allPage = data.last_page * 10;
            })
        },
        isedits(){
            if(this.$route.name == "editTest"){
                return true;
            }else{
                return false;
            }
        },
        deleteEvent(id){

            this.$confirm('确认删除测试？')
                    .then(_ => {
                this.common.deleteEventToken(this.api.host+this.api.test+"/"+id,{},this.userinfo,(data)=>{
                    this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    this.testData();
                })
            }).catch(_ => {});


//            var self = this;
//
//                this.common.deleteEventToken(this.userinfo,this.api.test,id,function(){
//                    self.$message({
//                    type: 'success',
//                    message: '删除成功!'
//                });
//                self.testData();
//            })
        },
    },
    watch:{
        nowPage(){
            this.testData();
        }
    },
    mounted:function(){
    var self = this;
    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
    this.testData();
    }

}
</script>