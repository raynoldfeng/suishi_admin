<template>
    <div id = "book">
        <div id="saveBox" v-if="hasSave"></div>
        <div id="saveMain" v-if="hasSave">
            <p>需要继续之前的学习吗？</p>
            <div id="yesbtn" @click="studyEvent(1)">继续学习</div>
            <div id="nobtn" @click="studyEvent(2)">重新学习</div>
        </div>
        <swiper class="swiper_type_menu" ref="pages" :options="swiperOption" >
            <!--<swiper-slide>-->
                <!--<v-dragMore></v-dragMore>-->
            <!--</swiper-slide>-->

            <swiper-slide v-for="(data,index) in bookData" :key="index">
                <v-titlePage v-if="data.testType == '0' && data.displayType == 't1'" v-on:isStart = "isStartEvent" :data="data"></v-titlePage>
                <v-imageText v-else-if="data.testType == '1' && data.displayType == 'it1'" :data="data"></v-imageText>
                <v-imageChange v-else-if="data.testType == '2' && data.displayType == 'ic1'" :data="data" :page="index" v-on:isJump = "isJumpEvent" v-on:imgShow = "imgShowEvent2"></v-imageChange>
                <v-judge  v-else-if="data.testType == '3' && data.displayType == 'j1'" :data="data" :index = "index" :nowPage="nowPage" v-on:isJump = "isJumpEvent"></v-judge>
                <v-select v-else-if="data.testType == '4' && data.displayType == 's1'" :data="data" :nowyes="nowyesEvent(data)" v-on:imgShow = "imgShowEvent"></v-select>
                <v-selectmore  v-else-if="data.testType == '5' && data.displayType == 'sm1'" :data="data"></v-selectmore>
                <v-selectAllJType   v-else-if="data.testType == '6' && data.displayType == 'sm2'" :data="data"></v-selectAllJType>
                <v-imgJumpType v-else-if="data.testType == '7' && data.displayType == 'imt'" :data="data" :page="index"  v-on:isJump = "isJumpEvent"></v-imgJumpType>
                <v-listTypePage v-else-if="data.testType == '8' && data.displayType == 'lt'" :data="data" v-on:imgShow = "imgShowEvent"></v-listTypePage>
                <v-sideEdgeImg v-else-if="data.testType == '9' && data.displayType == 'ct'" :data="data"></v-sideEdgeImg>
                <v-blanksType v-else-if="data.testType == '10' && data.displayType == 'bl'" :data="data"></v-blanksType>
                <v-imgSelectType v-else-if="data.testType == '11' && data.displayType == 'isd'" :data="data"></v-imgSelectType>
                <v-imgDisplayType v-else-if="data.testType == '12' && data.displayType == 'idp'" :data="data"></v-imgDisplayType>
                <v-lastPage  v-else-if="data.testType == '1111' && data.displayType == 'oooo'" :data="data"></v-lastPage>
            </swiper-slide>

        </swiper>
<div id="swiper-button-prev" class="swiper-button-prev" slot="button-prev" @click="pageTurn('left')"></div>
<div id="swiper-button-next" class="swiper-button-next" slot="button-next" @click="pageTurn('right')"></div>
<div class="swiper-pagination" slot="progressbar"></div>
        <div id="page-menu">
            <div id="displayBtn" @click="pageMenuDisplay">☰</div>
            <div id="dealMenu">
                <swiper class="swiper-menu" ref="pageMenu" :options="swiperSmooth" >

                    <swiper-slide  v-for="(data,index) in bookData" :key="index">
                        <div v-if="index == bookData.length-1" class="type-main" @click="pageClickEvent(index)"  :class="{typemainclick:nowPage == index}">最后一页</div>
                        <div v-else class="type-main" @click="pageClickEvent(index)"  :class="{typemainclick:nowPage == index}">第{{index+1}}页</div>
                    </swiper-slide>
                    <!--<swiper-slide :key="bookData.length">-->
                        <!--<div class="type-main"  @click="pageClickEvent(bookData.length)"  :class="{typemainclick:nowPage == bookData.length}">最后一页</div>-->
                    <!--</swiper-slide>-->
                </swiper>
            </div>
        </div>
        <transition name="img">
        <div id="imgWin"  @click="imgHiddenEvnet"  :class="{showBox:displayImg != ''}" v-show="displayImg != ''"></div>
        </transition>
        <transition name="fade">
            <div id="imgBox"   :class="{showBox:displayImg != '', bigImgs:isbig == '1'}" v-show="displayImg != ''">
                <div @click="imgHiddenEvnet" class="closeBtn">
                    <img src="./../img/close_btn.png" />
                </div>
                <img :src="displayImg" />
                <p v-if="displayText != ''" v-html="Trim(displayText)"></p>
            </div>
        </transition>

        <div id="noteWin" @click="hideNoteEvent"></div>
        <div id="noteText">
            <p  v-html="noteTexts"></p>
        </div>
    </div>
</template>
 <script>
 import Vue from 'vue'
 import judge from '../components/judge.vue'
 import select from "../components/select.vue"
 import imageText from "../components/imageText.vue"
 import imageChange from "../components/imageChange.vue"
 import titlePage from "../components/titlePage.vue"
 import selectmore from "../components/selectmore.vue"
import lastPage from "../components/lastPage.vue"
 import selectAllJType from "../components/selectAllJType.vue"
 import imgJumpType from "../components/imgJumpType.vue"
import listTypePage from "../components/listTypePage.vue"
import sideEdgeImg from "../components/sideEdgeImg.vue"
import blanksType from '../components/blanksType.vue'
 import imgSelectType from  '../components/imgSelectType.vue'
 import imgDisplayType from '../components/imgDisplayType.vue'
 import dragMore from '../components/dragmore.vue'
 import $ from 'jquery'
    export default{
        data(){
         var self = this;
            return{
                swiperOption: {
                    allowTouchMove:true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar'
                    },
                    noSwiping:true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    paginationClickable :true,
                    mousewheelControl : true,
                    observeParents:true,
                    loop: false,
                    on:{
                        slideChange:function(){
                            self.nowPage = self.$refs.pages.swiper.snapIndex;
                            window.nowPage = self.$refs.pages.swiper.snapIndex;
                            self.$refs.pageMenu.swiper.slideTo(self.$refs.pages.swiper.snapIndex);

                        }
                    }
                },
                swiperSmooth:{
                    freeMode: true,
                    slidesPerView: 'auto',
                    loop: false,
                    slidesPerView:3,
                    on:{
                        tap:function(){
                          console.log(  self.$refs.pageMenu.swiper.clickedIndex)
                            self.$refs.pages.swiper.slideTo(self.$refs.pageMenu.swiper.clickedIndex);
                        }
                    }
                },
                windowHeight:0,
                isPageMenuShow:false,
                nowPage:0,
                isMove:false,
                bookData:"",
                hasSave:false,
                displayImg:"",
                isbig:'0',
                displayText:"",
                noteTexts:"",
                lastData:{
                    page:0,
                    testType:"1111",
                    displayType:"oooo",
                    judgeTitle:"",
                    judgeMenu:[{
                        judgeText:"",
                        judgeAnswer:"0",
                        judgeAnswerText:""
                    }],
                }
            }
        },
     components:{
         'v-judge':judge,
         'v-select':select,
          'v-imageText':imageText,
          'v-imageChange':imageChange,
          'v-titlePage':titlePage,
         'v-selectmore':selectmore,
          'v-lastPage':lastPage,
          "v-selectAllJType":selectAllJType,
           'v-imgJumpType':imgJumpType,
           'v-listTypePage':listTypePage,
             'v-sideEdgeImg':sideEdgeImg,
             "v-blanksType":blanksType,
             "v-imgSelectType":imgSelectType,
             "v-imgDisplayType":imgDisplayType,
             'v-dragMore':dragMore
     },
        mounted:function(){
            window.jpage = 0;
            window.jshow = true;
            var self = this;
            this.bookData = window.edit;
            this.bookData.push(this.lastData);
            window.savePage = 0;
            window.nowPage = 0;
            this.nowPage = this.$refs.pages.swiper.realIndex;
            window.nowPage =  this.$refs.pages.swiper.realIndex;
            this.windowHeight = window.innerHeight;
         //   this.pageClickEvent();
            window.getAllPage=function(){
                try{
                    h5.getAllPageResult(window.edit.length);
                }catch (e){
                    console.log(e);
                }
               // return window.edit.length;
            };

            window.getNowPage=function(){
                try{
                    h5.getNowPageResult( window.nowPage);
                }catch (e){
                    console.log(e);
                }
            };
            window.setCurrentPage = function(page){
                window.nowPage = page;
                if(page > 0){
                    self.hasSave = true;
                }
            };

            window.onresetStudyResult = function(){
                try{
                    h5.resetStudyResult();
                }catch (e){

                }
            }

            this.jqEvent();
        },
        methods:{
            jqEvent(){
              $("#jtBtn").on("click",function(){
                  var dis = $(this).attr("dis");
                  if(dis == "0"){
                      $(this).attr("dis","1");
                      $("#noteText").animate({"height":"84%"},800);
                  }else{
                      $(this).attr("dis","0");
                      $("#noteText").animate({"height":"12%"},800)
                  }

              })
            },
            Trim(str) {
                console.log(str)
                return str.replace(/\n|\r\n/g,"<br/>");
            },
            nowyesEvent(data){
                var nowyes =[];
                for(let l = 0;l < data.selectQMenu.length;l++){
                    nowyes.push(0)
                }
                return nowyes;
            },
            studyEvent(type){
               if(type == 1) {
                   this.nowPage = window.nowPage-1;
                   this.$refs.pageMenu.swiper.slideTo(this.nowPage);
                   this.$refs.pages.swiper.slideTo(this.nowPage);
                   this.hasSave = false;
               }else{
                   this.hasSave = false;
                   this.$refs.pageMenu.swiper.slideTo(0);
                   this.$refs.pages.swiper.slideTo(0);
                   this.nowPage = 0;
                   window.nowPage = 0;
                   window.onresetStudyResult();
               }
            },

            /**
             * 点击第几页
             */
            pageClickEvent(index){
                this.nowPage = index;
                window.nowPage = index;
//                $("#dealMenu .type-main").eq(this.nowPage).addClass("type-main-click");
//                $("#dealMenu .type-main").on("touchend",function(){
//                    if(self.isMove){
//                        self.isMove = false;
//                        return;
//                    }else{
//                        $("#dealMenu .type-main").removeClass("type-main-click");
//                        $(this).addClass("type-main-click");
//                        self.isMove = false;
//                    }
//                });
//                $("#dealMenu .type-main").on("touchmove",function(){
//                    self.isMove = true;
//                })
            },
            /**
             * 左右翻页
             */
            pageTurn(type){
                console.log(this.$refs.pages.swiper.realIndex);
                $("#dealMenu .type-main").removeClass("typemainclick");
                var len = $("#dealMenu .type-main").length;
                if(type =="left"){
                    if(this.$refs.pages.swiper.realIndex == 0){
                        $("#dealMenu .type-main").eq(0).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(0);
                        this.nowPage = 0;
                        window.nowPage = 0;
                    }else{
                        $("#dealMenu .type-main").eq(this.$refs.pages.swiper.realIndex-1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(this.$refs.pages.swiper.realIndex-1);
                        this.nowPage = this.$refs.pages.swiper.realIndex-1;
                        window.nowPage = this.$refs.pages.swiper.realIndex-1;
                    }
                }else if("right"){
                    if(this.$refs.pages.swiper.realIndex == len-1){
                        $("#dealMenu .type-main").eq(len-1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(len-1);
                        this.nowPage = len-1;
                        window.nowPage = len-1;
                    }else{
                        $("#dealMenu .type-main").eq(this.$refs.pages.swiper.realIndex+1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(this.$refs.pages.swiper.realIndex+1);
                        this.nowPage = this.$refs.pages.swiper.realIndex+1;
                        window.nowPage = this.$refs.pages.swiper.realIndex+1;
                    }

                }

            },
            pageMenuDisplay(){
                if(!this.isPageMenuShow){
                    this.isPageMenuShow = true;
                    $("#page-menu").animate({"bottom":0})
                }else{
                    this.isPageMenuShow = false;
                    var bottom = $("#dealMenu").outerHeight(true);
                    $("#page-menu").animate({"bottom":("-"+bottom)})
                }
            },
            isStartEvent(boolean){
                if(boolean){
                    this.$refs.pages.swiper.slideTo(1);
                    this.$refs.pageMenu.swiper.slideTo(1);
                    this.nowPage = 1;
                    window.nowPage = 1;
                }
            },
            isJumpEvent(index){
                this.$refs.pages.swiper.slideTo(index);
                this.$refs.pageMenu.swiper.slideTo(index);
                this.nowPage = index;
                window.nowPage = index;
            },
            imgShowEvent(data){
                console.log(data);
                this.isbig = '0';
                if(data.url == ""){
                    this.displayImg = "";
                }else{
                    if(data.urlbig != ""){
                        this.displayImg = data.urlbig;
                    }else{
                        this.displayImg = data.url;
                    }
                }
                if(data.text == "" || data.text == undefined){
                    this.displayText = "";
                }else{
                    this.displayText = data.text;
                }
            },
            imgShowEvent2(data){
                this.isbig = '1';
                if(data.url == ""){
                    this.displayImg = "";
                }else{
                    if(data.urlbig != ""){
                        this.displayImg = data.urlbig;
                    }else{
                        this.displayImg = data.url;
                    }
                }
                if(data.text == "" || data.text == undefined){
                    this.displayText = "";
                }else{
                    this.displayText = data.text;
                }
            },
            imgHiddenEvnet(){
                this.displayImg = "";
                this.displayText = "";
            },
            hideNoteEvent(){
                $("#noteWin").hide().removeClass("noteWin-play");
                $("#noteText").hide().removeClass("noteText-play");
//                $("#noteText").css({"height":"12%"});
//                $("#jtBtn").attr("dis","0");
                this.noteTexts = "";
            }
        },
    }
 </script>
  <style>
  .swiper-slide{


  }
  .swiper-pagination{
      position: fixed;
      top: 0;
      width: 100%;
      height: 5px;
      z-index: 200;
  }
#page-menu{
    position: fixed;
    bottom: -56px;
    left: 0;
    z-index: 100;
    width: 100%;

}
#dealMenu{
      background:#fff;
    border-top: 1px solid #ddd;
}
#displayBtn{
    width: 20%;
    background-color: #ffffff;
    border-top:1px solid #dddddd;
    border-left:1px solid #dddddd;
    border-right:1px solid #dddddd;
    margin: 0 auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

}
  .type-main{
      width: 90%;
      height: 50px;
      text-align: center;
      float: left;
      line-height: 50px;
      color: #333;
      overflow: hidden;
      background-color: #fff;
      padding: 2% 3%;
      margin: 0 0;
      font-size: 4.5vw;
  }
  .typemainclick ,.type-main-click{
      background-color: #f48335;
      color: #ffffff;
      font-size: 4.5vw;
  }
      #book, .swiper_type_menu{
        position:fixed;
        width:100%;
      height:100%;
      }
  #saveBox{
      width: 100%;
        height: 100%;
    position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      background-color: #000000;
      opacity: 0.6;
  }
  #saveMain p{
      color: #ffffff;
      font-size: 5vw;
      padding-bottom: 39%;
  }
  #saveMain{
      width: 80%;
      position: fixed;
      top: 29%;
      left: 50%;
      margin-left: -40%;
      z-index: 1002;
  }
  #yesbtn,#nobtn{
      width: 60%;
      padding: 3% 0;
      margin: 6% auto;
      font-size: 4.5vw;
      text-align: center;
      background-color: #019ccb;
      color: #fff;
      border-radius: 4px;
  }
  #swiper-button-prev, .swiper-container-rtl .swiper-button-next{
      display:none;
       background-image:url("./../img/left.png");
   }
  #swiper-button-next, .swiper-container-rtl .swiper-button-prev{
      display:none;
      background-image:url("./../img/right.png");
  }
  #imgBox{
          position: absolute;
          z-index:0;
          top: 0;
          left: 50%;
          width: 80%;
          margin:25% 0 0 -40%;
      }
  #imgBox.bigImgs{
      width: 100%;
      left: 0;
      margin: 25% 0 0 0;;
  }

      #imgBox img{
          width: 100%;
          float:left;
      }
  #imgBox p{
      width: 90%;
      padding: 4% 5% 2%;
      background: #ffffff;
      text-align: left;
      float: left;
      font-size:4vw;
      }
  #imgBox.showBox{


      z-index:100;
      }
      #imgWin{
          position: absolute;
          z-index:0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
            opacity: 0.3;
          background-color: #333333;

      }

  #imgWin.showBox{


      z-index:99;
      }
      .closeBtn{
          width:8%;
          position: absolute;
          top: -4%;
          right: -3%;
      }
  #imgBox.bigImgs .closeBtn{
      top: -6%;
      right: 0;
  }
  </style>