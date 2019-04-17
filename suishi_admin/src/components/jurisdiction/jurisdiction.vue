<template>
    <div id="jurisdiction">
        <el-button @click="userDialog(true)">新建用户</el-button>
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
        <el-dialog title="新建" :visible.sync="dialogVisible">
            <div class="view_main">
                <span>账户</span>
                <el-input class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>姓名</span>
                <el-input class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>密码</span>
                <el-input class="input_type"></el-input>
            </div>
            <div class="view_main">
                <span>职位</span>
                <el-select v-model="isUse" placeholder="是否推荐">
                    <el-option
                    v-for="item in isUseMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="userDialog(false)">新建</el-button>
        </el-dialog>
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
            }],
            isUseMenu: [
                {value: "true",
                    label: "是"},
                {value: "false",
                    label: "否"}
            ],
            isUse: "false",
            dialogVisible:false
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

        },
        userDialog(boolean){
            this.dialogVisible = boolean;
        }
    }
}
</script>

<style>
    #jurisdiction{
        text-align:left;
    }
.view_main{
    text-align: center;
    margin-top:10px
    }
.input_type{
    width: 200px;
    }
</style>