<template>
    <div id="addJurisdiction">
        <p class="title_main">新增授权</p>
        <div class="view_main">
            <span>公司邮箱</span>
            <el-input class="input_type1"  placeholder="公司邮箱"></el-input>
            <span>姓名</span>
            <el-input class="input_type1"  placeholder="姓名"></el-input>
        </div>
        <div  class="view_main">
            <span>职能</span>
            <template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="view_main checkbox_main">
            <p>权限勾选</p>
            <div style="overflow:hidden">
                <div class="checkbox_menu"  v-for="(data,index) in dataMenu">
                    <el-checkbox :indeterminate="data.isIndeterminate" v-model="data.checkAll" @change="handleCheckAllChange(data.isIndeterminate,index)">{{data.typeName}}</el-checkbox>
                    <div style="margin: 15px 0;">
                        <el-checkbox-group  v-model="data.checkedCities" @change="handleCheckedCitiesChange(data.checkedCities,index)">
                            <el-checkbox class="sub_checkbox" v-for="city in data.cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <el-button class="view_main">保存</el-button>
    </div>
</template>


<script>
export default {
    data(){
        return{
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
                    cityOptions:['队伍列表', '队伍属性'],
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
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    },
    methods: {
        handleCheckAllChange(val,index) {
            this.dataMenu[index].checkedCities = val ? this.dataMenu[index].cityOptions : [];
            this.dataMenu[index].isIndeterminate = !this.dataMenu[index].isIndeterminate;
        },
        handleCheckedCitiesChange(value,index) {
            let checkedCount = value.length;
            this.dataMenu[index].checkAll = checkedCount === this.dataMenu[index].cities.length;
            this.dataMenu[index].isIndeterminate = checkedCount > 0 && checkedCount < this.dataMenu[index].cities.length;
        }
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
        .view_main{
            margin-top:10px
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