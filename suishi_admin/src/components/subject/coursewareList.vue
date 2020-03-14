<template>
    <div id="courseware">
        <p class="title_main">课件列表</p>
            <div class="view_main">
            <!--<el-select v-model="typeValue1" placeholder="专业">
                <el-option
                        v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>-->
        <!--<el-select v-model="isUse" placeholder="是否禁用">-->
            <!--<el-option-->
                    <!--v-for="item in isUseMenu"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
        <!--</el-option>-->
    <!--</el-select>-->
    <el-input
    placeholder="请输入内容"
    class="search_input"
    v-model="searchText">
    </el-input>
    <el-button @click="courseList('1')">搜索</el-button>
    <el-button @click="courseList('2')">还原</el-button>
            </div>
        <el-button class="add_btn" type="primary" @click="addEvent">新增课件</el-button>
        <div class="view_main">
<template>
<el-table
:data="coursewareData"
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
        prop="course_name"
        label="所属专业"
       >
</el-table-column>
<el-table-column label="课件数">
    <template slot-scope="scope">
       <p v-if="scope.row.url" v-text="scope.row.url.length"></p>
        <p v-else>0</p>
    </template>
</el-table-column>
<el-table-column

        label="是否试听"
        >
    <template slot-scope="scope">
        <span v-if="scope.row.is_audition == 0">是</span>
        <span v-else>否</span>
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
    <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
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
<style>
#courseware {
    text-align: left;
}
.search_input{
    width: 300px;
}
.el-button.add_btn{
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

            ],
            typeValue: '',
            typeValue1: '',
            isUseMenu: [
                {value: "1",
                    label: "是"},
                {value: "0",
                    label: "否"}
            ],
            isUse: "0",
            searchText:"",
            coursewareData: [],
            userinfo:"",
            nowPage:1,
            allPage:0,
            course_namekey:{},
        }
    },
    methods:{
        addEvent(){
            this.$router.push("/addCourseware");
        },
        /**
         * type
         * 1点击搜索
         * 2 还原搜索
         */
        courseList(type){
            if(type == 1){
                this.nowPage = 1;
            }else if(type == 2){
                this.nowPage = 1;
                this.searchText ="";
            }
            var self = this;
            this.common.getEventToken(this.api.host+this.api.lesson+"?page="+this.nowPage+"&per_page=10&name="+this.searchText,{},this.userinfo,function(data){
                self.coursewareData = data.data;
                console.log(data.data)
//                for(var i = 0; i<self.coursewareData.length;i++){
//                    self.course_namekey[self.coursewareData[i].course_name] = self.majorName(self.coursewareData[i].course_name);
//                }
//                console.log( self.course_namekey)
                self.allPage = data.last_page * 10;

            });
        },
        deleteEvent(id){
            var self = this;
            this.$confirm('确认删除课件？')
                    .then(_ => {
                this.common.deleteEventToken(this.api.host+this.api.lesson+"/"+id,{},this.userinfo,(data)=>{
                    self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    self.courseList();
                })
            }).catch(_ => {});

        },
        searchEvent(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.lesson+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
            self.coursewareData = data.data;
            self.allPage = data.last_page * 10;
            });
        },
        majorName(name){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.course+"?name="+name,{},this.userinfo,function(data){

                if(data.data.length>0){
                    console.log(data.data[0].name);
                    return data.data[0].name;

                }else{
                    return "";
                }

                //    return data.data[0].name;




            })
        },
        editEvent(id){
            this.$router.push({path:"/editCourseware",query:{id:id}});
        }
    },
    watch:{
        nowPage(){
            this.courseList();
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.courseList();
    }

}
</script>