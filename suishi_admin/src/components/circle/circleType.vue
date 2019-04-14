<template>
    <div id="circleType">
        <p class="title_main">圈子类型管理</p>
        <div class="view_main">
            <el-input class="input_type" placeholder="输入名称"></el-input>
            <el-button>新增</el-button>
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
                            <el-button type="text" size="small">删除</el-button>
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
                }]
            }
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