<template>
    <div id="labelAdmin">
        <p class="title_main">标签管理</p>
        <div class="label_main">
            <div class="parents_main">
                <div class="view_main">
                    <el-input
                    placeholder="输入名称"
                    class="name_input"
                    ></el-input>
                    <el-button>新建母标签</el-button>
                </div>
                <el-table class="table_main"
                :data="tableData"
                style="width: 90%">
                    <el-table-column
                    prop="date"
                    label="id"
                   >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                   >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="顺序">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="sub_main">
                <div class="view_main">
                    <el-input
                    placeholder="输入名称"
                    class="name_input"
                    ></el-input>
                    <el-button>新建子标签</el-button>
                </div>
                <el-table class="table_main"
                :data="tableData"
                style="width: 90%">
                    <el-table-column
                    prop="date"
                    label="id"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="顺序">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    data(){
        return{
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海'
            }]
        }
    }
}
</script>

<style>
    #labelAdmin{

    }
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
    .label_main{
        overflow:hidden;
    }
    .parents_main, .sub_main{
        min-height:600px;
        width:400px;
        background:#efefef;
    float:left;
    }
    .sub_main{
        margin-left:60px;
    }
    .name_input{
        width:200px;
    }
    .table_main{
        margin: 10px auto 0;
    }
</style>