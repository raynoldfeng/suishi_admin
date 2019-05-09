<template>
    <div id="testList">
        <div class="type_menu">
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
            >
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
<div class="view_main"><el-button class="add_btn" @click="addEvent">新增</el-button></div>
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
</template>
        </el-table-column>
        </el-table>
        </template>

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
            optionsType: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
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
            testListData: [{
                id: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }],

        }
    },
    methods:{

        addEvent(){
            this.$router.push("/addTest");
        },
        editEvent(id){
            this.$router.push({path: "/editTest", query: {id: id}});
        },
        testData(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.test,{},this.userinfo,function(data){
                console.log(data);
                self.testListData = data;

            })
        },
        isedits(){
            if(this.$route.name == "editTest"){
                return true;
            }else{
                return false;
            }
        },
    },
    mounted:function(){
    var self = this;
    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
    this.testData();
    }

}
</script>