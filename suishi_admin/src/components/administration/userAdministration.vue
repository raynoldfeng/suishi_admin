<template>
    <div id="userAdministration">
        <div class="view_main">
            <el-input
            placeholder="请输入内容"
            class="search_input"
            v-model="searchText">
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="用户ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">禁言</el-button>
                            <el-button type="text" size="small">封停</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
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
                searchText:""
            }
        }
    }
</script>
<style>
.search_input{
    width: 300px;
}
.view_main{
    overflow:hidden;
    margin-top:10px
}
</style>