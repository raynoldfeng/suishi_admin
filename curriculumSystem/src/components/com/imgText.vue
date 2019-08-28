<template>
    <div >
        <div class="view_main">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.imgTextTitle"></el-input>
            </div>
                    <div class="view_main">
                        <div class="type_title">图片:</div>

                            <div class="avatar-uploader" @click="uploadClick('imgtext-selector')">
                            <img v-if="nowData.imgTextImg" :src="nowData.imgTextImg" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../../image/addi.png">
                            </div>
                        </div>
                        <i  @click="deleteImg('imgTextImg')">
                        <img  class="icon_btn" src="./../../image/close.png" />
                         </i>
                    </div>

                    <div class="view_main">
                        <span>是否添加段落样式:</span>

                        <el-select v-model="nowData.imgTextValue" class="select-css" placeholder="段落样式">
                            <el-option
                                    v-for="item in judgeAnswerMenu"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>


                <div  class="view_main">

                     <p>文本</p>
                    <div  class="view_main"  v-for="(data,index) in nowData.imgTextMenu">
                        <el-input   v-if="nowData.imgTextMenu.length>0"
                                    class="textarea_type"
                                    type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="nowData.imgTextMenu[index]">
                        </el-input>
                         <span  @click="deleteImgText(index)">删除</span>
                     </div>
                    <div  class="view_main">
                            <el-button @click="addImgText">添加段落</el-button>
                     </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return {
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",
            selectImgIndex:""      //模板需要多个带图片的问题时
        }
    },
    props:{
        nowData:"",
        cosData:"",

    },
    mounted:function(){

    },
    methods:{

    }
}
</script>