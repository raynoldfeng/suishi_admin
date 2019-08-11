<template>
    <div id="addJurisdiction">
        <p class="title_main">新增授权</p>
  <!--      <div class="view_main">
            <span>公司邮箱</span>
            <el-input class="input_type1"  placeholder="公司邮箱"></el-input>
            <span>姓名</span>
            <el-input class="input_type1"  placeholder="姓名"></el-input>
        </div>-->
        <div  class="view_main">
            <span>职能</span>
            <template v-if="rolesList.length>0">
                <el-select @change="authGet"   v-model="rolesValue" placeholder="请选择">
                    <el-option
                    v-for="item in rolesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="view_main checkbox_main">
            <p>权限勾选</p>
            <div style="overflow:hidden">
                <div class="checkbox_menu"  v-for="(data,index) in dataMenu">
                    <el-checkbox :indeterminate="data.isIndeterminate" v-model="data.checkAll" @change="handleCheckAllChange(data.isIndeterminate,index)">{{data.title}}</el-checkbox>
                    <div style="margin: 15px 0;">
                        <el-checkbox-group  v-model="data.checkedCities" @change="handleCheckedCitiesChange(data.checkedCities,index)">
                            <el-checkbox class="sub_checkbox" v-for="city in data.children" :label="city.id" :key="city.id">{{city.title}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="view_main">
            <el-button  @click="addJurisdictions()">保存</el-button>
            <!--<el-button v-if="dealType == 1" @click="editJurisdictions()">编辑</el-button>-->
            <!--<el-button v-if="dealType == 2" @click="saveJurisdictions()">保存</el-button>-->
            <el-button v-if="dealType == 2" @click="cancelEvnet()">取消</el-button>
        </div>

    </div>
</template>


<script>
export default {
    data(){
        return{
            dealType:"",
            checked: true,
            dataMenu:[
                {checkAll: false,
                    typeName:"全局",
                    checkedCities: [],
                    cities: ['管理权限', '标签管理'],
                    cityOptions:['管理权限', '标签管理'],
                    isIndeterminate: true
                },
                {checkAll: false,
                    typeName:"题库",
                    checkedCities: [],
                    cities: ['专业列表', '课题列表',"测试列表"],
                    cityOptions:['专业列表', '课题列表',"测试列表"],
                    isIndeterminate: true
                },
                {checkAll: false,
                    typeName:"实战队伍",
                    checkedCities: [],
                    cities: ['队伍列表', '队伍属性'],
                    cityOptions:['队伍列表', '队伍属性','报名用户管理'],
                    isIndeterminate: true
                },
                {checkAll: false,
                    typeName:"圈子",
                    checkedCities: [],
                    cities: ['圈子列表', '圈子列表管理'],
                    cityOptions:['圈子列表', '圈子列表管理'],
                    isIndeterminate: true
                },
                {checkAll: false,
                    typeName:"帖子",
                    checkedCities: [],
                    cities: ['帖子列表'],
                    cityOptions:['帖子列表'],
                    isIndeterminate: true
                },
                {checkAll: false,
                    typeName:"用户管理",
                    checkedCities: [],
                    cities: ['用户管理'],
                    cityOptions:['用户管理'],
                    isIndeterminate: true
                }
            ],
            rolesList: [],
            rolesValue: '',
            rolesId:"",
            userinfo:[],
            alllist:[]
        }
    },
    methods: {
        dealEvent(){
            var self = this;
//            if(self.isedits()){
//                this.common.getEventToken(this.api.host+this.api.addAuth+"/"+this.$route.query.id,{},this.userinfo,function(data){
//                        console.log(data)
//                })
//            }
        },

        isedits(){
            if(this.$route.name == "editJurisdiction"){
                return true;
            }else{
                return false;
            }
        },

        handleCheckAllChange(val,index) {
      //      console.log(this.dataMenu[index].cityOptions);
       //     console.log(this.dataMenu[index].checkedCities);
            this.dataMenu[index].checkedCities = val ? this.dataMenu[index].cityOptions : [];
            this.dataMenu[index].isIndeterminate = !this.dataMenu[index].isIndeterminate;
        },
        handleCheckedCitiesChange(value,index) {
  //         console.log(value)
            let checkedCount = value.length;
            this.dataMenu[index].checkAll = checkedCount === this.dataMenu[index].children.length;
            this.dataMenu[index].isIndeterminate = checkedCount > 0 && checkedCount < this.dataMenu[index].children.length;
        },
        //每个职能的权限菜单
        rolesListEvent(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.roles,{},this.userinfo,function(data){
                self.rolesList = data;
                self.rolesValue = data[0].id;
                self.authGet();
            });
        },
        //添加权限
        addJurisdictions(){
            var self = this;
            var menu_ids = [];
            for(let i = 0; i<self.dataMenu.length;i++){
                for(let a = 0; a < self.dataMenu[i].checkedCities.length;a++){
                    menu_ids.push(self.dataMenu[i].checkedCities[a]);
                }
            }
            console.log(this.rolesId);
            console.log(menu_ids);
//            if(this.isedits()){
//                this.common.putEventToken(this.api.host+this.api.addAuth+"/"+this.$route.query.id,{menu_ids:menu_ids,role_id:this.rolesId},this.userinfo,function(data){
//                    //     console.log(data)
//                    alert("ok")
//                });
//            }else{
                this.common.postEventToken(this.api.host+this.api.addAuth,{menu_ids:menu_ids,role_id:this.rolesId},this.userinfo,function(data){
                    //     console.log(data)
                    alert("ok")
                });
//            }

        },
        saveJurisdictions(){

        },
        editJurisdictions(){
            this.$router.push("/editJurisdiction");
          //  this.dealType = 2;
        },
        cancelEvnet(){
            this.$router.push("/jurisdiction");
        },
        //权限列表渲染
        jurisdictionMenu(datalist){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.menus,{},this.userinfo,function(data){
                console.log(2);
                console.log(data);
                var dataMenus = data;
                for(let i = 0 ;i<dataMenus.length;i++){
                    dataMenus[i].checkedCities = new Array();
                    dataMenus[i].cityOptions = new Array();
                    for(let a = 0;a<dataMenus[i].children.length;a++){
                        dataMenus[i].cityOptions.push(dataMenus[i].children[a].id);
                        if(datalist.indexOf(dataMenus[i].children[a].id) != (-1)){
                            dataMenus[i].checkedCities.push(dataMenus[i].children[a].id);
                        }
                    }
                    dataMenus[i].isIndeterminate = true;
                    dataMenus[i].checkAll = false;
                }
                self.dataMenu = dataMenus;

            });

        },
        //获取职能权限
        authGet(){
            var self = this;
            this.rolesId = "";
            for(let i= 0; i<self.rolesList.length;i++){
                if(self.rolesValue == self.rolesList[i].id){
                    self.rolesId = self.rolesList[i].id;
                }
            }
            this.common.getEventToken(this.api.host+this.api.auth+"?role_id="+this.rolesId,{role_id:this.rolesId},this.userinfo,function(data){
                console.log(data);
                self.jurisdictionMenu(data);
            });
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.rolesListEvent();
        this.dealEvent();
    }
}
</script>
    <style>
        #addJurisdiction{
            text-align:left;
        }
        .title_main{
            padding:20px 0;
        border-bottom: 1px solid #999;
        }
        .input_type1{
            width:200px;
        }

        .checkbox_main{
            padding:10px;
            background:#efefef;
        }
        .checkbox_menu{
            width:16%;
        float:left;
        }
        .sub_checkbox{
        display: block;
        }
    </style>