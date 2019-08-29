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
                <i class="delete_btn"  @click="deleteEvent(index)">
                    <img  class="icon_btn" src="./../image/close.png" />
                </i>
                <i class="add_btn " @click="addPage('add',index)">
                    <img class="icon_btn" src="./../image/add.png" />
                </i>
        </div>

    </div>
    <el-button class="add_page" @click="addPage" type="primary" >添加</el-button>
        </div>

        </el-aside>
<el-main >
<el-button class="view_main" type="primary" @click="uploadClick('fileId')">导入文件</el-button>

    <input type="file" name = "file" id = "fileId" />

                    <input id="selectL-selector" type="file" >

                    <input id="file-selector3" multiple="multiple" type="file">



                    <input id="selectLt-selector" type="file" >
                    <input id="selectLt-selector-big" type="file" >
                    <input id="sideEdgeImg-upload" type="file" >
                    <input id="selectR-selector" type="file" >
                    <input id="img-selector" type="file" >
                    <input id="img-display" type="file" >
                    <input id="mimg-selector" type="file" >

                            <div  v-if=" dataMenu.length > 0">
                                <div id="testMedolBox" :class="{big_size:isbig}" @click="bigEvent">
                                    <img  v-if="nowData.testType == 0 && nowData.displayType == 't1'" src="./../image/01.png" />
                                    <img v-if="nowData.testType == 1 && nowData.displayType == 'it1'" src="./../image/02.png" />
                                    <img v-if="nowData.testType == 2 && nowData.displayType == 'ic1'" src="./../image/03.png" />
                                    <img v-if="nowData.testType == 3 && nowData.displayType == 'j1'" src="./../image/04.png" />
                                    <img v-if="nowData.testType == 4 && nowData.displayType == 's1'" src="./../image/05.png" />
                                    <img v-if="nowData.testType == 5 && nowData.displayType == 'sm1'" src="./../image/06.png" />
                                    <img v-if="nowData.testType == 6 && nowData.displayType == 'sm2'" src="./../image/07.jpg" />
                                    <img v-if="nowData.testType == 7 && nowData.displayType == 'imt'" src="./../image/08.jpg" />
                                    <img v-if="nowData.testType == 8 && nowData.displayType == 'lt'" src="./../image/09.png" />
                                    <img v-if="nowData.testType == 9 && nowData.displayType == 'ct'" src="./../image/10.jpg" />
                                    <img v-if="nowData.testType == 10 && nowData.displayType == 'bl'" src="./../image/11.jpg" />
                                    <img v-if="nowData.testType == 11 && nowData.displayType == 'isd'" src="./../image/12.jpg" />
                                    <img v-if="nowData.testType == 12 && nowData.displayType == 'idp'" src="./../image/13.png" />
                                </div>
                                <div  class="view_main">
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
                                <el-select v-show="nowData.testType == 10" class="select-css" v-model="nowData.displayType" placeholder="类型">
                                    <el-option
                                    v-for="item in blanksTypeMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            <el-select v-show="nowData.testType == 11" class="select-css" v-model="nowData.displayType" placeholder="类型">
                                <el-option
                                        v-for="item in imgselectDisplayMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-show="nowData.testType == 12" class="select-css" v-model="nowData.displayType" placeholder="类型">
                                <el-option
                                        v-for="item in imgDisplayTypeMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>




                    <titlePage v-if="nowData.testType == 0 && nowData.displayType == 't1'" :nowData="nowData" :cosData="cosData"></titlePage>

        <imgText v-if="nowData.testType == 1 && nowData.displayType == 'it1'" :nowData="nowData" :cosData="cosData" :judgeAnswerMenu="judgeAnswerMenu"></imgText>





<div v-if="nowData.testType == 2 && nowData.displayType == 'ic1'">
<div class="view_main">
    <div>图片</div>

        <div  class="view_main" v-for="(data,index) in nowData.imageChange">
            <div class="avatar-uploader">
                <img v-if="nowData.imageChange[index]" :src="nowData.imageChange[index]" class="avatar">
                    <div v-else class=" avatar-uploader-icon">
                        <img class="addi-icon" src="./../image/addi.png">
                     </div>
            </div>
            <el-button @click="imageChangeDelete(index)">删除</el-button>
        </div>
        <div class="view_main">
            <el-button @click="uploadClick('file-selector3')">添加图片</el-button>
         </div>


        </div>
        </div>

<judgeType v-if="nowData.testType == 3 && nowData.displayType == 'j1'" :nowData="nowData" :cosData="cosData" :judgeAnswerMenu="judgeAnswerMenu"></judgeType>

<selectType v-if="nowData.testType == 4 && nowData.displayType == 's1'" :nowData="nowData" :cosData="cosData" :judgeAnswerMenu="judgeAnswerMenu"></selectType>


<selectMore  v-if="nowData.testType == 5 && nowData.displayType == 'sm1'" :nowData="nowData" :cosData="cosData" :judgeAnswerMenu="judgeAnswerMenu"></selectMore>


        </div>

<selectAllJType v-if="nowData.testType == 6 && nowData.displayType == 'sm2'" :nowData="nowData" :cosData="cosData" :judgeAnswerMenu="judgeAnswerMenu" :titleColor="titleColor">
        </selectAllJType>


<imgJumpType  v-if="nowData.testType == 7 && nowData.displayType == 'imt'" :nowData="nowData" :cosData="cosData" :titleColor="titleColor"></imgJumpType>



        <div v-if="nowData.testType == 8 && nowData.displayType == 'lt'">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.listTypeTitle"></el-input>
            </div>

            <div class="view_main">
                <div class="type_title">图片:</div>

                <div class="avatar-uploader" @click="uploadClick('selectLt-selector')">
                    <img v-if="nowData.listTypeImg" :src="nowData.listTypeImg" class="avatar">
                        <div v-else class=" avatar-uploader-icon">
                            <img class="addi-icon" src="./../image/addi.png">
                        </div>
                </div>
                <i  @click="deleteImg('listTypeImg')">
                    <img  class="icon_btn" src="./../image/close.png" />
                </i>
            </div>
                <div class="view_main">
                    <div class="type_title">大图片:</div>

                    <div class="avatar-uploader" @click="uploadClick('selectLt-selector-big')">
                        <img v-if="nowData.listTypeImgBig" :src="nowData.listTypeImgBig" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../image/addi.png">
                            </div>
                        </div>
                        <i  @click="deleteImg('listTypeImgBig')">
                            <img  class="icon_btn" src="./../image/close.png" />
                        </i>
                    </div>
            <div class="view_main">
                <span>按钮文案:</span>
                <el-input class="input_type" v-model="nowData.listTypeBtnText"></el-input>
            </div>
                    <div class="view_main">
                        <span>是否添加段落样式:</span>

                        <el-select v-model="nowData.listTypeValue" class="select-css" placeholder="段落样式">
                            <el-option
                            v-for="item in judgeAnswerMenu"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
            <div class="view_main">
                <span>段落:</span>
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
                        <div v-else class=" avatar-uploader-icon">
                            <img class="addi-icon" src="./../image/addi.png">
                        </div>
                </div>
                    <i  @click="deleteImg('sideEdgeImg')">
                        <img  class="icon_btn" src="./../image/close.png" />
                    </i>
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

            <div v-if="nowData.testType == 10 && nowData.displayType == 'bl'">
                <div class="view_main">
                    <span>标题:</span>
                    <el-input class="input_type" v-model="nowData.blanksTitle"></el-input>
                </div>
                <div class="view_main">
                    <span>副标题:</span>
                    <el-input class="input_type" v-model="nowData.blanksInfo"></el-input>
                </div>
                <div class="view_main">
                    <el-button @click="blanksAddEvent(1)">添加段落</el-button>
                    <el-button @click="blanksAddEvent(2)">添加填空</el-button>
                </div>
                <div class="view_main">
                    <ul>
                        <li v-for="(data,index) in nowData.blanksMenu "  class="view_main">
                            <span v-if="data.blanksType == 1">段落:</span>
                            <el-input
                            class="textarea_type"
                            type="textarea"
                            v-if="data.blanksType == 1"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="data.blanksText"></el-input>
                            <span v-if="data.blanksType == 2">答案:</span>
                            <el-input class="input_type" v-if="data.blanksType == 2" v-model="data.blanksAnswer"></el-input>
                            <span @click="blanksDeleteEvent(index)">删除</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div v-if="nowData.testType == 11 && nowData.displayType == 'isd'">
                <div class="view_main">
                    <span>标题:</span>
                    <el-input class="input_type" v-model="nowData.imgselectDisplayTitle"></el-input>
                </div>
                <div class="view_main">
                    <span>副标题:</span>
                    <el-input class="input_type" v-model="nowData.imgselectDisplayInfo"></el-input>
                </div>
                <div class="view_main">
                    <div class="type_title">默認图片:</div>
                    <div class="avatar-uploader" @click="uploadClick('mimg-selector')">
                        <img v-if="nowData.imgselectDisplayMImg" :src="nowData.imgselectDisplayMImg" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../image/addi.png">
                            </div>
                    </div>
                <div class="view_main">
                    <el-button @click="imgselectDisplayMImgEvent">删除</el-button>

                </div>
                </div>
                    <div class="view_main">
                        <span>是否添加段落样式:</span>

                        <el-select v-model="nowData.imgselectDisplayValue" class="select-css" placeholder="段落样式">
                            <el-option
                            v-for="item in judgeAnswerMenu"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                <div class="view_main">
                    <el-button @click="imgSelectAddEvent" type="primary" >添加图片选项</el-button>
                    <div class="view_main box-css" v-for="(data,index) in nowData.imgselectDisplayMenu">
                        <div class="view_main">
                            <el-button @click="imgSelectDeleteEvent(index)">删除</el-button>
                        </div>
                        <div class="view_main">
                            <span>按钮内容:</span>
                            <el-input class="input_type" v-model="data.imgselectDisplayBtn"></el-input>
                        </div>
                        <div class="view_main">
                            <div class="type_title">图片:</div>
                            <div class="avatar-uploader" @click="uploadClick('img-selector',index)">
                                <img v-if="data.imgselectDisplayImg" :src="data.imgselectDisplayImg" class="avatar">
                                    <div v-else class=" avatar-uploader-icon">
                                        <img class="addi-icon" src="./../image/addi.png">
                                    </div>
                            </div>
                        </div>
                        <div class="view_main">
                            <span>段落:</span>
                            <el-button @click="imgSelectTextAddEvent(index)">添加段落</el-button>
                            <ul class="view_main">
                                <li v-for="(sdata,sindex) in data.imgselectDisplayTextMenu"  class="view_main">
                                    <el-input
                                            class="textarea_type"
                                            type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="sdata.imgselectDisplayText"></el-input>
                                    <span @click="imgSelectTextDeleteEvent(index,sindex)">删除</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="nowData.testType == 12 && nowData.displayType == 'idp'">
                <div class="view_main">
                    <span>标题:</span>
                    <el-input class="input_type" v-model="nowData.imgDisplayTypeTitle"></el-input>
                </div>
                <div class="view_main">
                    <span>副标题:</span>
                    <el-input class="input_type" v-model="nowData.imgDisplayTypeInfo"></el-input>
                </div>
                <div class="view_main">
                    <el-button @click="imgDisplayAddEvent" type="primary" >添加图片展示</el-button>
                    <div class="view_main" v-for="(data,index) in nowData.imgDisplayTypeMenu">
                        <div class="view_main">
                            <el-button @click="imgDisplayDeleteEvent(index)">删除</el-button>
                        </div>
                        <div class="view_main">
                            <div class="type_title">图片:</div>
                            <div class="avatar-uploader" @click="uploadClick('img-display',index)">
                                <img v-if="data.imgDisplayTypeImg" :src="data.imgDisplayTypeImg" class="avatar">
                                    <div v-else class=" avatar-uploader-icon">
                                        <img class="addi-icon" src="./../image/addi.png">
                                    </div>
                            </div>
                                <i  @click="deleteMenuImg(index,'imgDisplayTypeMenu','imgDisplayTypeImg')">
                                    <img class="icon_btn" src="./../image/close.png" />
                                </i>
                        </div>
                            <div class="view_main">
                                <span>是否添加段落样式:</span>

                                <el-select v-model="nowData.imgDisplayTypeValue" class="select-css" placeholder="段落样式">
                                    <el-option
                                    v-for="item in judgeAnswerMenu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        <div class="view_main">
                            <span>段落:</span>
                            <el-button @click="imgDisplayTextAddEvent(index)">添加段落</el-button>
                            <ul class="view_main">
                                <li v-for="(sdata,sindex) in data.imgDisplayTypeTextMenu"  class="view_main">
                                    <el-input
                                            class="textarea_type"
                                            type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="sdata.imgDisplayTypeText"></el-input>
                                    <span @click="imgDisplayTextDeleteEvent(index,sindex)">删除</span>
                               </li>
                            </ul>
                        </div>
                    </div>
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
 * imgTextValue 图文类型段落样式
  * imgTextImg  图文类型图片
 * imgTextMenu  图文类型段落
 *
 * 2
 * imageChange 图片轮播
 *
 * 3
 * judgeTitle 判断类型题目
 *   judgeInfo 判断类型副标题
 *   judgeTitleTrue 判断类型正确标题
 *    judgeTitleFalse 判断类型错误标题
 *    judgeMenu 判断类型菜单
  * judgeText 判断类型答案
 * judgeAnswer 正确选项
 * judgeAnswerText 答案注释
  *
 * 4
 * selectQMenu 选择类型菜单
 * selectTitle 选择类型题目 (selectQMenu)
 * selectInfo 选择类型副标题 (selectQMenu)
  * selectImg  选择类型图片 (selectQMenu)
 * selectImgBig  选择类型大图片 (selectQMenu)
  * selectMenu 选择类型选项 (selectQMenu)
 *answerText 答案选项 (selectMenu内)
 * isAnswer 是不是正确 (selectMenu内)
 *imgTextNote 答案注释
 *imgNoteNode 图片文字介绍
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
 * selectAllJSubtitleTitleColor 标题颜色
 * selectAllJImg 选项带解释选择背景图片
 * selectAllJMenu 选项
 * answerText 答案选项 (selectAllJMenu内)
 * isAnswer 是不是正确 (selectAllJMenu内)
 * selectTextNote 解释 (selectAllJMenu内)
 *
 * 7
 * ImgJumpTypeTitle 图片类型标题
 * ImgJumpTypeTitleColor 标题背景
 * ImgJumpTypeInfo  图片类型介绍文字
 * ImgJumpTypeBg  图片类型背景
 * ImgJumpBtnText 图片类型跳转按钮文本
 *
 * 8
 * listTypeTitle 列表类型标题
 * listTypeTitleColor 标题背景
 * listTypeImg 列表类型图片
 * listTypeImgBig 列表类型大图片
  * listTypeBtnText 列表类型按钮文案
* listTypeValue     列表类型段落样式
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
*
* 10
*blanksTitle 填空题标题
*blanksInfo 填空副标题
* blanksMenu 填空题菜单
* blanksType 段落类型(1 段落 2填空)
* blanksText 填空段落
* blanksInput 填空内容
* blanksAnswer 填空答案
 * isShow 答案是否展示
 *
 * 11
 * imgselectDisplayTitle 图片选项展示标题
 *imgselectDisplayInfo 图片选项展示副标题
 * imgselectDisplayMImg 默認圖片
* imgselectDisplayValue 图片选项展示段落样式
  * imgselectDisplayMenu 图片选项展示菜单
 * imgselectDisplayBtn 按钮文案
  * imgselectDisplayImg 图片
 * imgselectDisplayTextMenu 段落菜单
 * imgselectDisplayText 段落
 *
 * 12
 * imgDisplayTypeTitle 图片展示标题
 * imgDisplayTypeInfo  图片展示副标题
 * imgDisplayTypeMenu 图片展示菜单
 *imgDisplayTypeImg 图片展示图片
 * imgDisplayTypeValue 图片展示段落样式
* imgDisplayTypeTextMenu 图片展示段落菜单
 * imgDisplayTypeText 图片展示段落
 *
*
 */
import $ from 'jquery'
import titlePage from './com/titlePage.vue'
import imgText from './com/imgText.vue'
import judgeType from './com/judgeType.vue'
import selectType from './com/selectType.vue'
//import selectMore from './nouse/selectMore.vue'
import selectAllJType from './com/selectAllJType.vue'
import imgJumpType from './com/imgJumpType.vue'
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
            titleColor:[
                {value: "0",
                    label: "黑色"},
                {value: "1",
                    label: "白色"},
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
                    label: "多题选泽(废弃)"},
                {value:"6",
                label:"选择(带解释)"},
                {value:"7",
                label:"图片形式"},
                {value:"8",
                    label:"列表类型"},
                {value:"9",
                    label:"侧边图片"},
                {value:"10",
                    label:"填空"},
                {value:"11",
                    label:"图片选项展示"},
                {
                    value:"12",
                    label:"图片展示"
                }
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
            blanksTypeMenu:[
                {
                    value:"bl",
                    label:"填空"
                }
            ],
            imgselectDisplayMenu:[
                {
                    value:"isd",
                    label:"点击"
                }
            ],
            imgDisplayTypeMenu:[
                {
                    value:"idp",
                    label:"点击"
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
                imgTextValue:"1",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                judgeInfo:"",
                judgeTitleTrue:"",
                judgeTitleFalse:"",
                judgeMenu:[{
                    judgeText:"",

                    judgeAnswer:"0",
                    judgeAnswerText:""
                }],




                selectQMenu:[{
                    selectTitle:"",
                    selectImgBig:"",
                    selectInfo:"",
                    selectImg:"",
                    selectMenu:[
                        {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                    ],
                    imgTextNote:"",
                    imgTextNoteShow:false,
                    imgNoteNode:""
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
                selectAllJSubtitleTitleColor:"0",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeTitleColor:"0",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeTitleColor:"0",
                listTypeImg:"",
                listTypeImgBig:"",
                listTypeBtnText:"",
                listTypeValue:"1",
                listTypeMenu:[
                    {listTypeText:""}
                ],


                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:"",



                blanksTitle:"",
                blanksInfo:"",
                blanksMenu:[],


                imgselectDisplayTitle:"",
                imgselectDisplayInfo:"",
                imgselectDisplayMImg:"",
                imgselectDisplayValue:"1",
                imgselectDisplayMenu:[
                    {
                        imgselectDisplayBtn:"",
                        imgselectDisplayImg:"",
                        imgselectDisplayTextMenu:[{
                            imgselectDisplayText:""
                        }]
                    }
                ],





                 imgDisplayTypeTitle :"",
                 imgDisplayTypeInfo:"",
                imgDisplayTypeValue:"1",
                imgDisplayTypeMenu:[{
                    imgDisplayTypeImg:"",
                    imgDisplayTypeTextMenu:[{
                        imgDisplayTypeText:""
                    }]
                }]

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
                imgTextValue:"1",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                    judgeInfo:"",
                judgeTitleTrue:"",
                judgeTitleFalse:"",
                judgeMenu:[{
                    judgeText:"",

                    judgeAnswer:"0",
                    judgeAnswerText:""
                }],



                selectQMenu:[{
                        selectTitle: "",
                        selectImgBig:"",
                        selectInfo:"",
                        selectImg: "",
                        selectMenu: [
                            {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                        ],
                        imgTextNote: "",
                        imgTextNoteShow:false,
                        imgNoteNode:""
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
                selectAllJSubtitleTitleColor:"0",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeTitleColor:"0",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeTitleColor:"0",
                listTypeImg:"",
                listTypeImgBig:"",
                listTypeBtnText:"",
                listTypeValue:"1",
                listTypeMenu:[
                    {listTypeText:""}
                ],



                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:"",



                blanksTitle:"",
                blanksInfo:"",
                blanksMenu:[],


                imgselectDisplayTitle:"",
                imgselectDisplayInfo:"",
                imgselectDisplayMImg:"",
                imgselectDisplayValue:"1",
                imgselectDisplayMenu:[
                    {
                        imgselectDisplayBtn:"",
                        imgselectDisplayImg:"",
                        imgselectDisplayTextMenu:[{
                            imgselectDisplayText:""
                        }]
                    }
                ],





                imgDisplayTypeTitle :"",
                imgDisplayTypeInfo:"",
                imgDisplayTypeValue:"1",
                imgDisplayTypeMenu:[{
                    imgDisplayTypeImg:"",
                    imgDisplayTypeTextMenu:[{
                        imgDisplayTypeText:""
                    }]
                }]
            },
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",
            cosData:{SecretId:"",SecretKey:"",XCosSecurityToken:"",expiredTime:""},
            userinfo:"",
            selectImgIndex:""      //模板需要多个带图片的问题时
        }
    },
    components:{
        "titlePage":titlePage,
        "imgText":imgText,
        "judgeType":judgeType,
        "selectType":selectType,
        "selectAllJType":selectAllJType,
        "imgJumpType":imgJumpType
    },
    methods:{
        bigEvent(){
            this.isbig = !this.isbig;

        },
        displayTypeReset(){
           this.nowData.displayType = "";
        },
        addPage(type,index){
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
                imgTextValue:"1",
                imgTextImg:"",
                imgTextMenu:[""],



                imageChange:[],



                judgeTitle:"",
                judgeInfo:"",
                judgeTitleTrue:"",
                judgeTitleFalse:"",
                judgeMenu:[{
                    judgeText:"",

                    judgeAnswer:"0",
                    judgeAnswerText:""
                }],



                selectQMenu:[{
                        selectTitle: "",
                        selectImgBig:"",
                        selectInfo:"",
                        selectImg: "",
                        selectMenu: [
                            {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                        ],
                        imgTextNote: "",
                    imgTextNoteShow:false,
                    imgNoteNode:""
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
                selectAllJSubtitleTitleColor:"0",
                selectAllJImg:"",
                selectAllJMenu:[
                    {answerText:"",isAnswer:"0",selectTextNote:""}
                ],


                ImgJumpTypeTitle:"",
                ImgJumpTypeTitleColor:"0",
                ImgJumpTypeInfo :"",
                ImgJumpTypeBg:"",
                ImgJumpBtnText:"",


                listTypeTitle:"",
                listTypeTitleColor:"0",
                listTypeImg:"",
                listTypeImgBig:"",
                listTypeBtnText:"",
                listTypeValue:"1",
                listTypeMenu:[
                    {listTypeText:""}
                ],


                sideEdgeImgTypeTitle:"",
                sideEdgeImgTypeInfo:"",
                sideEdgeImgMenu:[{sideEdgeImgTypeText:""}],
                sideEdgeImgLRType:"0",
                sideEdgeImg:"",


                blanksTitle:"",
                blanksInfo:"",
                blanksMenu:[],



                imgselectDisplayTitle:"",
                imgselectDisplayInfo:"",
                imgselectDisplayMImg:"",
                imgselectDisplayValue:"1",
                imgselectDisplayMenu:[
                    {
                        imgselectDisplayBtn:"",
                        imgselectDisplayImg:"",
                        imgselectDisplayTextMenu:[{
                            imgselectDisplayText:""
                        }]
                    }
                ],



                imgDisplayTypeTitle :"",
                imgDisplayTypeInfo:"",
                imgDisplayTypeValue:"1",
                imgDisplayTypeMenu:[{
                    imgDisplayTypeImg:"",
                    imgDisplayTypeTextMenu:[{
                        imgDisplayTypeText:""
                    }]
                }]
            };
            if(type == "add"){
                this.nowData.page = index;
                this.dataMenu.splice(index,0,this.nowData);
                this.nowpage = index;
    console.log(this.dataMenu)
                for(var i = index;i < this.dataMenu.length ; i++){
                    this.dataMenu[i].page = i;
                }

            }else{
                this.nowData.page = this.dataMenu.length;
                console.log(this.dataMenu)
                this.dataMenu.push(this.nowData);
                console.log(this.dataMenu.length)
                this.nowpage = this.dataMenu.length-1;
            }




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
                self.cosData ={SecretId:self.SecretId,SecretKey:self.SecretKey,XCosSecurityToken:self.XCosSecurityToken,expiredTime:self.expiredTime};
            })

        },
        uploadEvent(){
            var self = this






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
            document.getElementById('selectLt-selector-big').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.listTypeImgBig = img;
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


            document.getElementById('img-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.imgselectDisplayMenu[self.selectImgIndex].imgselectDisplayImg = img;
                        });
                    }
                }
            };

            document.getElementById('img-display').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.imgDisplayTypeMenu[self.selectImgIndex].imgDisplayTypeImg = img;
                            console.log(111111111111)
                            console.log(img)
                            console.log( self.nowData.imgDisplayTypeMenu)
                        });
                    }
                }
            };

            document.getElementById('mimg-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.imgselectDisplayMImg = img;
                        });
                    }
                }
            };

            document.getElementById('fileId').onchange = function () {
                var file = this.files[0];
                if (!file) return;
                console.log(file.size); // 文件字节数
                    self.dataMenu = [];

                    var reader = new FileReader();//新建一个FileReader
                    reader.readAsText(file, "UTF-8");//读取文件
                    reader.onload = function(evt){ //读取完文件之后会回来这里
                        var fileString = evt.target.result; // 读取文件内容
                        var json = JSON.parse(fileString.slice(12,fileString.length));
                  //      self.dataMenu =json;
                        self.nowData = json[0];
                        for(let i = 0 ; i < json.length;i++){
                            var odata = self.copyData;
                            //类型4选择类型大图片key特殊兼容处理
                            if(json[i]["selectQMenu"].length > 0 && !json[i]["selectQMenu"][0].hasOwnProperty("selectImgBig")){
                                    for(let a = 0 ;a <  json[i]["selectQMenu"].length ; a++){
                                         json[i]["selectQMenu"][a]["selectImgBig"]="";
                                    }
                            }

                            var obj = $.extend({},odata,json[i])
                                self.dataMenu.push(obj);
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
        deleteMenuImg(index,key1,key2){
             this.nowData[key1][index][key2] = "";
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
        },
        /**
         * 填空
         */
        blanksAddEvent(type){
            if(type == 1){
                var data = {blanksType:1,blanksText:""};
            }else if(type == 2){
                var data ={blanksType:2,blanksInput:"",blanksAnswer:"",isShow:false};
            }
            this.nowData.blanksMenu.push(data);
        },
        blanksDeleteEvent(index){
            this.nowData.blanksMenu.splice(index,1);
        },
        /**
         * 图片选项展示
         */
        imgSelectAddEvent(){
            var newdata = { imgselectDisplayBtn:"",
                imgselectDisplayImg:"",
                imgselectDisplayTextMenu:[{
                    imgselectDisplayText:""
                }]
            };
            this.nowData.imgselectDisplayMenu.push(newdata);
        },
        imgSelectDeleteEvent(index){
            this.nowData.imgselectDisplayMenu.splice(index,1);
        },
        imgSelectTextAddEvent(index){
            var newdata = {imgselectDisplayText:""};
            this.nowData.imgselectDisplayMenu[index].imgselectDisplayTextMenu.push(newdata);
        },
        imgSelectTextDeleteEvent(index,sindex){
            this.nowData.imgselectDisplayMenu[index].imgselectDisplayTextMenu.splice(sindex,1);
        },
        imgselectDisplayMImgEvent(){
            this.nowData.imgselectDisplayMImg = "";
        },
        /**
         * 图片展示类型
         */
        imgDisplayAddEvent(){
            var newdata = {
                imgDisplayTypeImg:"",
                imgDisplayTypeTextMenu:[{
                    imgDisplayTypeText:""
                }]
            };
            this.nowData.imgDisplayTypeMenu.push(newdata);
        },
        imgDisplayDeleteEvent(index){
            this.nowData.imgDisplayTypeMenu.splice(index,1);
        },
        imgDisplayTextAddEvent(index){
            var newdata = {imgDisplayTypeText:""}
            this.nowData.imgDisplayTypeMenu[index].imgDisplayTypeTextMenu.push(newdata);
        },
        imgDisplayTextDeleteEvent(index,sindex){
            this.nowData.imgDisplayTypeMenu[index].imgDisplayTypeTextMenu.splice(sindex,1);
        },


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

</style>
