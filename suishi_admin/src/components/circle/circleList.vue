<template>
    <div id="circleList">
        <p class="title_main">圈子列表</p>
        <div class="view_main">
            <!--<el-select v-model="typeValue" placeholder="所属圈子">-->
                <!--<el-option-->
                <!--v-for="item in optionsType"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="typeValue1" placeholder="是否推荐">-->
                <!--<el-option-->
                <!--v-for="item in optionsType"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <el-select v-model="isUse" placeholder="是否禁用" @change="getCircleList(1)">
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
            v-model="circleText"
            >
            </el-input>
            <el-button @click="getCircleList(1)">搜索</el-button>
        </div>
        <div class="view_main"><el-button class="add_btn" @click="addEvent" type="primary">新增圈子</el-button></div>
        <div class="view_main">
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
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_recommend == 0">否</span>
                        <span v-else>是</span>
                    </template>
                </el-table-column>
            <el-table-column
                    prop="status"
                    label="是否禁用"
                    >
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">否</span>
                    <span v-else>是</span>
                </template>
            </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="editEvent(scope.row.id)" type="text" size="small">编辑</el-button>
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
                {value: "1",
                    label: "是"},
                {value: "0",
                    label: "否"},
                {value:"-1",
                    label:"全部"}
            ],
            isUse: "-1",
            searchText:"",
            userinfo:"",
            circleListData:[],
            nowPage:1,
            allPage:0,
            circleText:""
        }
    },
    methods:{
        addEvent(){
            this.$router.push("/addGame")
        },
        getCircleList(type){
            var self =this;
            if(type == 1){
                this.nowPage = 1;
            }
            var url=this.api.host+this.api.category+"?page="+this.nowPage+"&per_page=10";
            if(this.isUse != "-1"){
                 url+=("&status="+this.isUse);
            }
            if(this.circleText){
                 url+=("&name="+this.circleText);
            }

            this.common.getEventToken(url,{},this.userinfo,function(data){
                console.log(data);
                self.circleListData = data.data;
                self.allPage = data.last_page * 10;
            })
        },
        editEvent(id){
            this.$router.push({path:"/editGame",query:{id:id}})
        },
        deleteEvent(id){
            var self = this;
            this.$confirm('确认删除圈子？')
                    .then(_ => {
                    this.common.deleteEventToken(this.api.host+this.api.category+"/"+id,{},this.userinfo,(data)=>{
                    self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        self.getCircleList();
                    })
            }).catch(_ => {});

        }
    },
    watch:{
        nowPage(){
            this.getCircleList();
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
.page_main{
    text-align:center;
    }

</style>