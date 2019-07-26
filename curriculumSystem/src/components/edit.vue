<template>
    <div >
        <el-container>
        <el-header class="blues head-title">
           <div class="head_main"> 课件编辑系统</div>
        </el-header>
        <el-container>
        <el-aside width="200px">
        <div id="leftMenu">
            <div class="page_menu">
                <div class="pagebtnBox" v-for="(data,index) in dataMenu" v-if=" dataMenu.length > 0">
                    <div class="pagebtn" @click="nowPageEvent(index)" :class="{pageboxclick:nowpage == index}">
                    第{{index+1}}节
                </div>
                <i class="delete_btn el-icon-close"  @click="deleteEvent(index)"></i>
        </div>

    </div>
    <el-button class="add_page" @click="addPage" type="primary" >添加</el-button>
        </div>

        </el-aside>
<el-main >
<input id="file-selector" type="file" >
                    <input id="file-selector2" type="file" >
                    <input id="selectL-selector" type="file" >
                    <input id="imgtext-selector" type="file" >
                    <input id="file-selector3" multiple="multiple" type="file">
                    <input id="select-selector" type="file" >
                    <input id="selectAllJ-selector" type="file" >
                    <input id="selectImgJ-selector" type="file" >
                    <input id="selectLt-selector" type="file" >
                    <input id="sideEdgeImg-upload" type="file" >
                    <input id="selectR-selector" type="file" >
                            <div  v-if=" dataMenu.length > 0">
                                <div id="testMedolBox" :class="{big_size:isbig}" @click="bigEvent">
                                    <img  v-if="nowData.testType == 0 && nowData.displayType == 't1'" src="./../image/01.png" />
                                    <img v-if="nowData.testType == 1 && nowData.displayType == 'it1'" src="./../image/02.png" />
                                    <img v-if="nowData.testType == 2 && nowData.displayType == 'ic1'" src="./../image/03.png" />
                                    <img v-if="nowData.testType == 3 && nowData.displayType == 'j1'" src="./../image/04.png" />
                                    <img v-if="nowData.testType == 4 && nowData.displayType == 's1'" src="./../image/05.png" />
                                    <img v-if="nowData.testType == 5 && nowData.displayType == 'sm1'" src="./../image/06.png" />
                                </div>
                                <div>
                                <p>章节:第<span v-text="(nowData.page+1)">1</span>节</p>
                                <el-button  class="view_main" @click="getJsons"  type="primary" >生成配置文件</el-button>
                                <!--<el-button  class="view_main" @click="goUpLoad"  type="primary" >上传</el-button>-->
                            <div  class="view_main">
                                <span>模板类型:</span>
                                <el-select v-model="nowData.testType" class="select-css" placeholder="类型" v-on:change="displayTypeReset">
                                        <el-option
                                                v-for="item in testTypeMenu"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                         </el-option>
                                </el-select>
                            <span>交互类型:</span>
                            <el-select v-show="nowData.testType == 0" class="select-css" v-model="nowData.displayType" placeholder="类型">
                                <el-option
                                     v-for="item in titleInfoTypeMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-show="nowData.testType == 1" class="select-css" v-model="nowData.displayType" placeholder="类型">
                            <el-option
                                    v-for="item in imgTextTypeMenu"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 2" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in imgChangeTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                            <el-select v-show="nowData.testType == 3" class="select-css" v-model="nowData.displayType" placeholder="类型">
                                    <el-option
                                            v-for="item in judgeTypeMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        <el-select v-show="nowData.testType == 4" class="select-css" v-model="nowData.displayType" placeholder="类型">
                            <el-option
                                    v-for="item in selectTypeMenu"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 5" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in selectMoreTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 6" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in selectAllJTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 7" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in imgJumpTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 8" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in listTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="nowData.testType == 9" class="select-css" v-model="nowData.displayType" placeholder="类型">
                        <el-option
                                v-for="item in sideEdgeImgTypeMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                        </div>
                    </div>

                    <div v-if="nowData.testType == 0 && nowData.displayType == 't1'">
                        <div  class="view_main">
                            <span>课程标题:</span>
                            <el-input class="input_type" v-model="nowData.courseTitle"></el-input>
                        </div>
                        <div  class="view_main">
                            <span class="type_title">封面图:</span>

                            <div class="avatar-uploader" @click="uploadClick('file-selector')">
                            <img v-if="nowData.courseImg" :src="nowData.courseImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        <i class="el-icon-close" @click="deleteImg('courseImg')"></i>
                </div>
                <div  class="view_main">
                    <span  class="type_title">作者图:</span>

                    <div class="avatar-uploader" @click="uploadClick('file-selector2')">
                    <img v-if="nowData.authorImg" :src="nowData.authorImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <i class="el-icon-close" @click="deleteImg('authorImg')"></i>
        </div>
        <div  class="view_main">
            <span >作者名字:</span>
            <el-input class="input_type" v-model="nowData.authorInfo"></el-input>

        </div>
        <div  class="view_main">
            <span class="type_title">介绍:</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="nowData.courseInfo">
        </el-input>
    </div>
</div>

<div v-if="nowData.testType == 1 && nowData.displayType == 'it1'">
    <div class="view_main">
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.imgTextTitle"></el-input>
        </div>
        <div class="view_main">
            <div class="type_title">图片:</div>

            <div class="avatar-uploader" @click="uploadClick('imgtext-selector')">
            <img v-if="nowData.imgTextImg" :src="nowData.imgTextImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <i class="el-icon-close" @click="deleteImg('imgTextImg')"></i>
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

<div v-if="nowData.testType == 2 && nowData.displayType == 'ic1'">
<div class="view_main">
    <div>图片</div>

        <div  class="view_main" v-for="(data,index) in nowData.imageChange">
            <div class="avatar-uploader">
                <img v-if="nowData.imageChange[index]" :src="nowData.imageChange[index]" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <el-button @click="imageChangeDelete(index)">删除</el-button>
        </div>
        <div class="view_main">
            <el-button @click="uploadClick('file-selector3')">添加图片</el-button>
         </div>


        </div>
        </div>
<div v-if="nowData.testType == 3 && nowData.displayType == 'j1'">
<div class="view_main">
    <span>题目:</span>
    <el-input class="input_type" v-model="nowData.judgeTitle"></el-input>
</div>
<div class="view_main">
    <span>答案文本:</span>
    <el-input class="input_type" v-model="nowData.judgeText"></el-input>
</div>
<div class="view_main">
    <span>正确选项:</span>

    <el-select v-model="nowData.judgeAnswer" class="select-css" placeholder="正确选项">
        <el-option
                v-for="item in judgeAnswerMenu"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
</el-select>
</div>
        </div>

<div v-if="nowData.testType == 4 && nowData.displayType == 's1'">
    <div class="view_main">
        <el-button @click="selectAddQEvent">添加题目</el-button>
    </div>
    <div v-for="(selectData,selectIndex) in nowData.selectQMenu"  class="padd-bottom">
        <div class="view_main">
            <span>第{{selectIndex+1}}题</span>
            <el-button @click="selectDeleteQEvent(selectIndex)">删除</el-button>
        </div>
        <div class="view_main">
            <span>题目:</span>
            <el-input class="input_type" v-model="selectData.selectTitle"></el-input>
        </div>
        <div class="view_main">
            <div class="type_title">图片:</div>
            <div class="avatar-uploader" @click="uploadClick('select-selector',selectIndex)">
                <img v-if="selectData.selectImg" :src="selectData.selectImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <i class="el-icon-close" @click="deleteImg('selectImg')"></i>
        </div>

        <div class="view_main">
            <span>答案选项</span>
            <el-button @click="selectAddEvent(selectIndex)">添加选项</el-button>
            <div class="">
                <ul>
                    <li v-for="(data,index) in selectData.selectMenu" class="view_main" >
                        <span>选项{{index+1}}</span>
                        <el-input class="input_type" v-model="selectData.selectMenu[index].answerText"></el-input>
                        <el-select v-model="data.isAnswer" class="select-css" placeholder="是否正确">
                            <el-option
                                    v-for="item in judgeAnswerMenu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span @click="selectDeleteEvent(index,selectIndex)">删除</span>
                    </li>
                 </ul>
            </div>
         </div>
        <div class="view_main">
            <span class="type_title">答案注释:</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="selectData.imgTextNote">
            </el-input>
        </div>

    </div>




</div>


<div v-if="nowData.testType == 5 && nowData.displayType == 'sm1'">
    <div class="view_main" >
        <span>问题:</span>
        <el-input class="input_type" v-model="nowData.selectMoreTitle"></el-input>
    </div>
    <div class="view_main" >
        <span class="type_title">问题描述:</span>
        <el-input
            class="textarea_type"
            type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="nowData.selectMoreInfo">
        </el-input>
    </div>
        <!--<div>-->
        <!--<span>文本1</span>-->
        <!--<el-input class="input_type" v-
model="nowData.selectTitle"></el-input>-->
        <!--</div>-->
    <div class="view_main" >
        <div class="type_title">左侧图片:</div>
        <div class="avatar-uploader" @click="uploadClick('selectL-selector')">
            <img v-if="nowData.selectMoreImgL" :src="nowData.selectMoreImgL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <i class="el-icon-close" @click="deleteImg('selectMoreImgL')"></i>

       </div>
    <div class="view_main" >
        <span>左侧选项:</span><el-button @click="selectMoreAddEvent('l')">添加选项</el-button>
        <div class="">

        <ul>
            <li v-for="(data,index) in nowData.selectMoreMenuL" class="view_main">
                <span>选项{{index+1}}</span>
                <el-input class="input_type" v-model="data.answerText"></el-input>
                <el-select class="select-css" v-model="data.isAnswer"
                           placeholder="是否正确">
                    <el-option
                            v-for="item in judgeAnswerMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span @click="selectMoreDeleteEvent('l',index)">删除</span>
        </li>
                </ul>
        <div class="view_main">
        <span class="type_title">答案注释</span>
        <el-input
                class="textarea_type"
                type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="nowData.selectTextNoteL">
        </el-input>
                </div>
        </div>
        </div>
        <!--<div>-->
        <!--<span>文本2</span>-->
        <!--<el-input class="input_type" v-
model="nowData.selectTitle"></el-input>-->
        <!--</div>-->
<div class="view_main" >
<div class="type_title">右侧图片:</div>
<div class="avatar-uploader" @click="uploadClick('selectR-selector')">
    <img v-if="nowData.selectMoreImgR" :src="nowData.selectMoreImgR" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</div>
<i class="el-icon-close" @click="deleteImg('selectMoreImgR')"></i>
        </div>
    <div class="view_main" >
          <span>右侧选项:</span><el-button  @click="selectMoreAddEvent('r')">添加选项</el-button>
    <div>
<ul>
    <li v-for="(data,index) in nowData.selectMoreMenuR" class="view_main">
        <span>选项{{index+1}}</span>
        <el-input class="input_type" v-model="data.answerText"></el-input>
        <el-select v-model="data.isAnswer" class="select-css" placeholder="正确选项">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <span  @click="selectMoreDeleteEvent('r',index)">删除</span>
</li>
        </ul>
        </div>
<div class="view_main">
<span class="type_title">答案注释:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="nowData.selectTextNoteR">
</el-input>
        </div>
        </div>
        </div>
        </div>
        <div v-if="nowData.testType == 6 && nowData.displayType == 'sm2'">

            <div class="view_main">
                <span>题目:</span>
                <el-input class="input_type" v-model="nowData.selectAllJTitle"></el-input>
            </div>
            <div class="view_main">
                <span>副标题:</span>
                <el-input class="input_type" v-model="nowData.selectAllJSubtitleTitle"></el-input>
            </div>
            <div class="view_main">
                <div class="type_title">背景图片:</div>

                <div class="avatar-uploader" @click="uploadClick('selectAllJ-selector')">
                    <img v-if="nowData.selectAllJImg" :src="nowData.selectAllJImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <!--<i class="el-icon-close" @click="deleteImg('selectAllJImg')"></i>-->
            </div>
            <div class="view_main">
                <span>答案选项</span>
                <el-button @click="selectAllJAddEvent">添加选项</el-button>
                <div class="">
                    <ul>
                        <li v-for="(data,index) in nowData.selectAllJMenu" class="view_main" >
                            <span>选项{{index+1}}</span>
                            <el-input class="input_type" v-model="nowData.selectAllJMenu[index].answerText"></el-input>
                            <el-select v-model="data.isAnswer" class="select-css" placeholder="是否正确">
                                <el-option
                                        v-for="item in judgeAnswerMenu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span @click="selectAllJDeleteEvent(index)">删除</span>
                    <div class="view_main">
                        <span class="type_title">答案解释:</span>
                        <el-input
                                class="textarea_type"
                                type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="data.selectTextNote">
                    </el-input>
                </div>

                        </li>
                     </ul>
                  </div>
                </div>


        </div>

        <div v-if="nowData.testType == 7 && nowData.displayType == 'imt'">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.ImgJumpTypeTitle"></el-input>
            </div>
            <div class="view_main">
                <span>介绍文字:</span>
                <el-input
                        class="textarea_type"
                        type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="nowData.ImgJumpTypeInfo"></el-input>
            </div>
            <div class="view_main">
                <div class="type_title">背景图片:</div>

                <div class="avatar-uploader" @click="uploadClick('selectImgJ-selector')">
                    <img v-if="nowData.ImgJumpTypeBg" :src="nowData.ImgJumpTypeBg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <i class="el-icon-close" @click="deleteImg('ImgJumpTypeBg')"></i>
            </div>
            <div class="view_main">
                <span>跳转按钮文本:</span>
                <el-input class="input_type" v-model="nowData.ImgJumpBtnText"></el-input>
            </div>
        </div>

        <div v-if="nowData.testType == 8 && nowData.displayType == 'lt'">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.listTypeTitle"></el-input>
            </div>
            <div class="view_main">
                <div class="type_title">背景图片:</div>

                <div class="avatar-uploader" @click="uploadClick('selectLt-selector')">
                    <img v-if="nowData.listTypeImg" :src="nowData.listTypeImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <!--<i class="el-icon-close" @click="deleteImg('listTypeImg')"></i>-->
            </div>
            <div class="view_main">
                <span>按钮文案:</span>
                <el-input class="input_type" v-model="nowData.listTypeBtnText"></el-input>
            </div>
            <div>
            <el-button @click="selectListTypeAddEvent">添加段落</el-button>
                <ul>
                    <li v-for="(data,index) in nowData.listTypeMenu" class="view_main" >
                        <el-input
                                class="textarea_type"
                                type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="data.listTypeText"></el-input>
                        <span @click="selectListTypeDeleteEvent(index)">删除</span>
                    </li>
                </ul>

            </div>

        </div>

        <div v-if="nowData.testType == 9 && nowData.displayType == 'ct'">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.sideEdgeImgTypeTitle"></el-input>
            </div>
            <div class="view_main">
                <span>展示方式:</span>
                <el-select v-model="nowData.sideEdgeImgLRType" class="select-css" placeholder="是否正确">
                    <el-option
                            v-for="item in sideEdgeImgDisplayType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="view_main">
                <span>副标题:</span>
                <el-input class="input_type" v-model="nowData.sideEdgeImgTypeInfo"></el-input>
            </div>
            <div class="view_main">
                <div class="type_title">图片:</div>
                <div class="avatar-uploader" @click="uploadClick('sideEdgeImg-upload')">
                    <img v-if="nowData.sideEdgeImg" :src="nowData.sideEdgeImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                    <!--<i class="el-icon-close" @click="deleteImg('listTypeImg')"></i>-->
            </div>
            <div>
                <el-button @click="sideEdgeImgTypeAddEvent">添加段落</el-button>
                <ul>
                    <li v-for="(data,index) in nowData.sideEdgeImgMenu" class="view_main" >
                        <el-input
                                class="textarea_type"
                                type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="data.sideEdgeImgTypeText"></el-input>
                         <span @click="sideEdgeImgTypeDeleteEvent(index)">删除</span>
                      </li>
                 </ul>
            </div>

        </div>

        </el-main>
        </el-container>
        </el-container>
        </div>
        </template>
<script>
/**
 * page 第几章
 *
 * testType 测试类型
 * 0 介绍页
 * 1 图文
 * 2 图片轮播
 * 3 判断
 * 4  选泽
 * 5. 多题选泽
 *
 * 0
 * courseTitle 标题
 * courseImg 封面图
 * authorImg 作者头像
 * authorInfo 作者名字
 * courseInfo 课程介绍
 * 1
 * imgTextTitle 图文类型标题
 * imgTextImg  图文类型图片
 * imgTextMenu  图文类型段落
 *
 * 2
 * imageChange 图片轮播
 *
 * 3
 * judgeTitle 判断类型题目
 * judgeText 判断类型答案
 * judgeAnswer 正确选项
 *
 * 4
 * selectQMenu 选择类型菜单
 * selectTitle 选择类型题目 (selectQMenu)
 * selectImg  选择类型图片 (selectQMenu)
 * selectMenu 选择类型选项 (selectQMenu)
 *answerText 答案选项 (selectMenu内)
 * isAnswer 是不是正确 (selectMenu内)
 *imgTextNote 答案注释
 *
 * 5
 * selectMoreTitle 多个选择题目
 *selectMoreInfo 多个选择题目注释
 * selectMoreImgL  多个选择类型图片1
 * selectMoreMenuL 多个选择类型选项1
 *  selectMoreImgR  多个选择类型图片2
 * selectMoreMenuR 多个选择类型选项2
 *answerText 答案选项 (selectMoreMenu内)
 * isAnswer 是不是正确 (selectMoreMenu内)
 * selectTextNoteL   左侧答案注释
 * selectTextNoteR   右侧答案注释
 *
 * 6
 * selectAllJTitle 选项带解释选择题目
 * selectAllJSubtitleTitle 选项带解释选择副标题
 * selectAllJImg 选项带解释选择背景图片
 * selectAllJMenu 选项
 * answerText 答案选项 (selectAllJMenu内)
 * isAnswer 是不是正确 (selectAllJMenu内)
 * selectTextNote 解释 (selectAllJMenu内)
 *
 * 7
 * ImgJumpTypeTitle 图片类型标题
 * ImgJumpTypeInfo  图片类型介绍文字
 * ImgJumpTypeBg  图片类型背景
 * ImgJumpBtnText 图片类型跳转按钮文本
 *
 * 8
 * listTypeTitle 列表类型标题
 * listTypeImg 列表类型图片
 * listTypeBtnText 列表类型按钮文案
 * listTypeMenu 列表类型段落集合
 * listTypeText 列表类型段落(listTypeMenu内)
 *
 * 9
 * sideEdgeImgTypeTitle 侧边图片标题
 * sideEdgeImgTypeInfo 侧边图片副标题
 * sideEdgeImg  侧边图片图片
 * sideEdgeImgMenu 侧边图片段落菜单
 * sideEdgeImgTypeText 侧边图片段落 (sideEdgeImgMenu内)
 * sideEdgeImgLRType 侧边图片展示位置(左右)
 */
export default {
    data(){
        return {
            isbig:false,
            nowpage:0,
            judgeAnswerMenu:[
                {value: "0",
                    label: "false"},
                {value: "1",
                    label: "true"},
            ],
            sideEdgeImgDisplayType:[
                {value: "0",
                    label: "left"},
                {value: "1",
                    label: "right"},
            ],
            testTypeMenu:[
                {value: "0",
                    label: "介绍页"},
                {value: "1",
                    label: "图文"},
                {value: "2",
                    label: "图片轮播"},
                {value: "3",
                    label: "判断"},
                {value: "4",
                    label: "选择"},
                {value: "5",
                    label: "多题选泽"},
                {value:"6",
                label:"选择(带解释)"},
                {value:"7",
                label:"图片形式"},
                {value:"8",
                    label:"列表类型"},
                {value:"9",
                    label:"侧边图片"}
            ],
            titleInfoTypeMenu:[
                {
                    value:"t1",
                    label:"跳转"
                }
            ],
            imgTextTypeMenu:[
                {
                    value:"it1",
                    label:"跳转"
                }
            ],
            imgChangeTypeMenu:[
                {
                    value:"ic1",
                    label:"跳转"
                }
            ],
            judgeTypeMenu:[
                {
                    value:"j1",
                    label:"拖拽"
                }
            ],
            selectTypeMenu:[
                {
                    value:"s1",
                    label:"点击"
                }
            ],
            selectMoreTypeMenu:[
                {
                    value:"sm1",
                    label:"点击"
                }
            ],
            selectAllJTypeMenu:[
                {
                    value:"sm2",
                    label:"点击"
                }
            ],
            imgJumpTypeMenu:[
                {
                    value:"imt",
                    label:"跳转"
                }
            ],
            listTypeMenu:[
                {
                    value:"lt",
                    label:"点击"
                }
            ],
            sideEdgeImgTypeMenu:[
                {
                    value:"ct",
                    label:"展示"
                }
            ],
            dataMenu:[ ],
            nowData:{
                page:0,
                testType:"0",
                displayType:"",
                courseTitle:"",
                courseImg:"",
                authorImg:"",
                courseInfo:"",
                authorInfo:"",



                imgTextTitle:"",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                judgeText:"",
                judgeAnswer:"",



                selectQMenu:[{
                    selectTitle:"",
                    selectImg:"",
                    selectMenu:[
                        {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                    ],
                    imgTextNote:"",
                    imgTextNoteShow:false
                }],





                selectMoreTitle:"",
                selectMoreInfo:"",
                selectMoreImgL:"",
                selectMoreImgR:"",
                selectMoreMenuL:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectMoreMenuR:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectTextNoteL:"",
                selectTextNoteR:"",



                selectAllJTitle:"",
                selectAllJSubtitleTitle:"",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeImg:"",
                listTypeBtnText:"",
                listTypeMenu:[
                    {listTypeText:""}
                ],


                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:""
            },
            copyData:{
                page:0,
                testType:"0",
                displayType:"",
                courseTitle:"",
                courseImg:"",
                authorImg:"",
                courseInfo:"",
                authorInfo:"",



                imgTextTitle:"",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                judgeText:"",
                judgeAnswer:"",



                selectQMenu:[{
                        selectTitle: "",
                        selectImg: "",
                        selectMenu: [
                            {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                        ],
                        imgTextNote: "",
                        imgTextNoteShow:false,
                    }],



                selectMoreTitle:"",
                selectMoreInfo:"",
                selectMoreImgL:"",
                selectMoreImgR:"",
                selectMoreMenuL:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectMoreMenuR:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectTextNoteL:"",
                selectTextNoteR:"",



                selectAllJTitle:"",
                selectAllJSubtitleTitle:"",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeImg:"",
                listTypeBtnText:"",
                listTypeMenu:[
                    {listTypeText:""}
                ],



                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:""
            },
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",
            userinfo:""
        }
    },
    methods:{
        bigEvent(){
            this.isbig = !this.isbig;

        },
        displayTypeReset(){
           this.nowData.displayType = "";
        },
        addPage(){
            console.log(this.dataMenu.length)
            if(this.dataMenu.length > 0){
                this.dataMenu[this.nowData.page] = this.nowData;
            }

            this.nowData ={
                page:0,
                testType:"0",
                displayType:"",
                courseTitle:"",
                courseImg:"",
                authorImg:"",
                courseInfo:"",
                authorInfo:"",



                imgTextTitle:"",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                judgeText:"",
                judgeAnswer:"",



                selectQMenu:[{
                        selectTitle: "",
                        selectImg: "",
                        selectMenu: [
                            {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                        ],
                        imgTextNote: "",
                    imgTextNoteShow:false
                    }],




                selectMoreTitle:"",
                selectMoreInfo:"",
                selectMoreImgL:"",
                selectMoreImgR:"",
                selectMoreMenuL:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectMoreMenuR:[
                    {answerText:"",isAnswer:"0"}
                ],
                selectTextNoteL:"",
                selectTextNoteR:"",



                selectAllJTitle:"",
                selectAllJSubtitleTitle:"",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeImg:"",
                listTypeBtnText:"",
                listTypeMenu:[
                    {listTypeText:""}
                ],


                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:"",

                selectImgIndex:""      //选择题类型需要展示的图片
            };
            //    this.nowData = this.copyData;
            console.log(this.nowData)
            this.nowData.page = this.dataMenu.length;
            console.log(this.dataMenu)
            this.dataMenu.push(this.nowData);
            console.log(this.dataMenu.length)
            this.nowpage = this.dataMenu.length-1;

        },
        goUpLoad(){
            this.$router.push("/upload")
        },
        getJsons(){
            this.dataMenu[this.nowData.page] = this.nowData;
//                this.getjsFile();
            window.datas = this.dataMenu;
            this.uploadClick("export");
            console.log(window.datas);
        },
        nowPageEvent(page){
            this.dataMenu[this.nowData.page] = this.nowData;
            this.nowData = this.dataMenu[page];
            this.nowpage = page;
        },
        deleteEvent(page){
            console.log(this.nowData.page)
            this.dataMenu[this.nowData.page] = this.nowData;
            //     this.nowData = this.copyData;
            console.log(this.dataMenu)
            this.dataMenu.splice(page,1);

            console.log(this.dataMenu)
            console.log(this.dataMenu.length)
            for(let i = 0; i < this.dataMenu.length;i++){
                if(this.dataMenu.length>0){
                    this.dataMenu[i].page = i;
                    if(i == this.dataMenu.length-1){
                        this.nowData = this.dataMenu[i];
                        this.nowpage =  i;
                    }
                }
            }

        },
        getUpLoadKey(){
            var self =this;
            this.common.getEventToken(this.api.host+this.api.cosToken,{},this.userinfo,function(data){
                console.log(data);
                self.SecretId = data.credentials.tmpSecretId;
                self.SecretKey = data.credentials.tmpSecretKey;
                self.XCosSecurityToken = data.credentials.sessionToken;
                self.expiredTime = data.expiredTime;
                console.log(self.SecretId)
            })

        },
        uploadEvent(){
            var self = this
            document.getElementById('file-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                //                console.log(file.name);
                //                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.courseImg = img;
                        });
                    }
                }

            };

            document.getElementById('file-selector2').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.authorImg = img;
                        });
                    }
                }

            };

            document.getElementById('imgtext-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                //                console.log(file.name);
                //                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.imgTextImg = img;
                        });
                    }
                }

            };

            document.getElementById('selectImgJ-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                //                console.log(file.name);
                //                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.ImgJumpTypeBg = img;
                        });
                    }
                }

            };

            document.getElementById('selectLt-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                //                console.log(file.name);
                //                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.listTypeImg = img;
                        });
                    }
                }

            };
            document.getElementById('file-selector3').onchange = function () {
                var files = this.files;
                //                console.log(file.name);
                //                console.log(file)
                if(files.length>0){
                    self.pptUrl = [];
                }
                if(self.SecretId != "" && self.SecretKey !="" ){
                    for(let i = 0 ;i<files.length;i++){
                        var file = files[i];
                        if (!file) return;
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(url){
                                self.nowData.imageChange.push(url);
                            });
                        }
                    }
                }

            };


            document.getElementById('select-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.selectQMenu[self.selectImgIndex].selectImg = img;
                        });
                    }
                }
            };

            document.getElementById('selectL-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.selectMoreImgL = img;
                        });
                    }
                }
            };
            document.getElementById('selectAllJ-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.selectAllJImg = img;
                        });
                    }
                }
            };


            document.getElementById('selectR-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.selectMoreImgR = img;
                        });
                    }
                }
            };

            document.getElementById('sideEdgeImg-upload').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.sideEdgeImg = img;
                        });
                    }
                }
            };

        },
        uploadClick(id,index){
            document.getElementById(id).click();
            if(index > (-1)){
                this.selectImgIndex = index;
            }
        },
        /**
         * 1
         * 添加段落
         */
        addImgText(){
            this.nowData.imgTextMenu.push("");
        },
        deleteImgText(index){
            this.nowData.imgTextMenu.splice(index,1);
        },
        /**
         * 选择类型 (可添加多个题目)
         */
        selectAddQEvent(){
              var newData = {
                  selectTitle: "",
                  selectImg: "",
                  selectMenu: [
                      {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                  ],
                  imgTextNote: "",
                  imgTextNoteShow:false
              };
            this.nowData.selectQMenu.push(newData);
        },
        selectDeleteQEvent(index){
            this.nowData.selectQMenu.splice(index,1);
        },
        selectAddEvent(index){
            var newData =  {answerText:"",isAnswer:"0"}
            this.nowData.selectQMenu[index].selectMenu.push(newData);
        },
        selectDeleteEvent(index,pIndex){
            this.nowData.selectQMenu[pIndex].selectMenu.splice(index,1);
        },

        /**
         * 选择类型 (多题)
         */
        selectMoreAddEvent(type){
            var newData =  {answerText:"",isAnswer:"0"}
            if(type=="l"){
                this.nowData.selectMoreMenuL.push(newData);
            }else if(type == "r"){
                this.nowData.selectMoreMenuR.push(newData);
            }
        },
        selectMoreDeleteEvent(type,index){
            if(type == "l"){
                this.nowData.selectMoreMenuL.splice(index,1);
            }else if(type == "r"){
                this.nowData.selectMoreMenuR.splice(index,1);
            }

        },
        imageChangeDelete(index){
            if(this.nowData.imageChange.length > 0){
                this.nowData.imageChange.splice(index,1);
            }
        },
        deleteImg(type){
            this.nowData[type] = "";
        },
        /**
         * 选项带解释 选择
         */
        selectAllJAddEvent(){
            var newData =  {answerText:"",isAnswer:"0",selectTextNote:""};
            this.nowData.selectAllJMenu.push(newData);
        },
        selectAllJDeleteEvent(index){
            this.nowData.selectAllJMenu.splice(index,1);
        },
        /**
         * 列表类型
         */
        selectListTypeAddEvent(){
            var newData = {listTypeText:""};
            this.nowData.listTypeMenu.push(newData);
        },
        selectListTypeDeleteEvent(index){
            this.nowData.listTypeMenu.splice(index,1);
        },
        /**
         * 侧边图片
         */
        sideEdgeImgTypeAddEvent(){
            var newData = {sideEdgeImgTypeText:""};
            this.nowData.sideEdgeImgMenu.push(newData);
        },
        sideEdgeImgTypeDeleteEvent(index){
            this.nowData.sideEdgeImgMenu.splice(index,1);
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        console.log( this.userinfo)
        this.getUpLoadKey();
        this.uploadEvent();
    }
}
</script>
<style>
.head_main{
    position: fixed;
    top: 0;
    z-index: 1000;
    background: skyblue;
    width: 100%;
    height: 60px;
    left: 0;
}
.blues{
    background:skyblue;
}
.input_type{
    width: 200px;
}
.textarea_type{
    width: 500px;
}
.pagebtn{
    width: 150px;
    height: 150px;
    margin: 15px auto;
    border: 1px solid #d0d0d0;
    position: relative;
    background:#d8d8d8;
    font-size:25px;
    line-height: 150px;
}
.pageboxclick{
    background:#9cd7ef;
    color:#fff;
}
.page_menu{
    max-height:80%;
    overflow: auto;
}
.pagebtnBox{
    position: relative;
}
.delete_btn{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.view_main{
    overflow:hidden;
}
.type_title{
    float:left;
}
.head-title {
    line-height: 300%;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
}
#leftMenu{
    text-align: center;
    width:200px;
    height:100%;
    background:#efefef;
    position: fixed;
    top: 60px;
}
.add_page{
    width:80%;
}
#testMedolBox{
    width: 150px;
    background: #ffffff;
    position: fixed;
    top: 10%;
    right: 0;
    z-index: 1000;
    cursor: pointer;
    border: 1px solid #999999;
}
#testMedolBox img{
    width: 100%;
}
#testMedolBox.big_size{
    animation:bigs 0.3s linear 0s forwards;
}
.select-css{
    margin-right: 10px;;
}
.avatar-uploader-icon{
    background: #ffffff;
}
@keyframes bigs{
    0%{width: 150px}
    100%{width: 350px}
}
</style>
