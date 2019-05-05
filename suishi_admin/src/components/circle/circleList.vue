<template>
    <div id="circleList">
        <div class="type_menu">
            <el-select v-model="typeValue" placeholder="所属圈子">
                <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="typeValue1" placeholder="是否推荐">
                <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="isUse" placeholder="是否启用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input
            placeholder="输入关键字"
            class="search_input"
            >
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
        <div class="view_main"><el-button class="add_btn" @click="addEvent">新增</el-button></div>
        <template v-if="circleListData.length>0">
            <el-table
            :data="circleListData"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="圈子名称"
                >
                </el-table-column>
                <el-table-column
                prop="type"
                label="类型"
                >
                </el-table-column>
                <el-table-column
                prop="follow"
                label="人数"
                >
                </el-table-column>
                <el-table-column
                prop="comment"
                label="帖子数"
                >
                </el-table-column>
                <el-table-column
                prop="sort"
                label="排序"
                >
                </el-table-column>
                <el-table-column
                prop="is_recommend"
                label="是否推荐"
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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
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
            userinfo:"",
            circleListData:[]
        }
    },
    methods:{
        addEvent(){
            this.$router.push("/addGame")
        },
        getCircleList(){
            var self =this;

            this.common.getEventToken(this.api.host+this.api.category,{},this.userinfo,function(data){
                console.log(data);
                self.circleListData = data;
            })
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.getCircleList();
    }

}
</script>
<style>
.search_input{
    width: 300px;
    }
.view_main{
    margin-top:10px
    }
</style>