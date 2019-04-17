<template>
    <div id="jurisdiction">
        <el-button @click="userEvent">新建用户</el-button>
        <el-button @click="addEvent">职能权限</el-button>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
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

<script>
export default {
    data(){
        return {
            tableData: [{
                id: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                id: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                id: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                id: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }]
        }
    },
    methods:{
        handleClick(row) {
            console.log(row);
        },
        addEvent(){
            this.$router.push("/addJurisdiction");
        },
        userEvent(){

        }
    }
}
</script>

<style>
    #jurisdiction{
        text-align:left;
    }
</style>