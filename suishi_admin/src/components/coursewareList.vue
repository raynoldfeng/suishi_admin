<template>
    <div id="courseware">
            <div class="type_menu">
            <el-select v-model="typeValue1" placeholder="专业">
                <el-option
                        v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="isUse" placeholder="是否使用">
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
    v-model="searchText">
    </el-input>
    <el-button>搜索</el-button>
    <el-button>还原</el-button>
            </div>
        <el-button class="add_btn" @click="addEvent">新增</el-button>
<template>
<el-table
:data="tableData"
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
        prop="province"
        label="所属专业"
       >
</el-table-column>
<el-table-column
        prop="zip"
        label="课件数"
        >
</el-table-column>
<el-table-column
        prop="city"
        label="创建时间"
      >
</el-table-column>
<el-table-column
        prop="address"
        label="是否启用"
    >
</el-table-column>
<el-table-column
label="操作"
>
<template slot-scope="scope">
    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
<el-button type="text" size="small">编辑</el-button>
</template>
        </el-table-column>
        </el-table>
        </template>
        </div>
        </template>
<style>
#courseware {
    text-align: left;
}
.search_input{
    width: 300px;
}
.add_btn{
    margin-top: 10px;
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
            tableData: [{
                id: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
        }
    },
    methods:{
        addEvent(){
            this.$router.push("/addCourseware");
        }
    }

}
</script>