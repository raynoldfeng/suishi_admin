<template>
    <div id="addTeam">
        <div class="top-main">
            <div class="fraction">
            得分：0
            </div>
            <p class="title_main">专业列表</p>
        </div>
        <div class="view_main">
            <span>队伍名称</span>
            <el-input class="input_type"></el-input>
            <span>组队类型</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span>是否启用</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <el-input class="input_type"></el-input>
            <el-select v-model="isUse" placeholder="队长">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button>新增成员</el-button>
        </div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
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
                prop="name"
                label="身份"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="view_main">
            任务
            <el-button>添加任务</el-button>
        </div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="任务ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="任务名称"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="发布日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="最迟完成日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="完成状态"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="打分"
                >
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                isUseMenu: [
                    {value: "true",
                        label: "是"},
                    {value: "false",
                        label: "否"}
                ],
                isUse: "false",
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
    .top-main{
         position:relative;
    }
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
    .fraction{
        width:30%;
   float:right;
    padding:20px 0;
    }
.view_main{
    margin-top:10px
    }
.input_type{
    width: 200px;
    }
</style>