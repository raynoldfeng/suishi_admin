<template>
    <div id = "book">
        <div id="saveBox" v-if="hasSave"></div>
        <div id="saveMain" v-if="hasSave">
            <p>需要继续之前的学习吗？</p>
            <div id="yesbtn" @click="studyEvent(1)">继续学习</div>
            <div id="nobtn" @click="studyEvent(2)">重新学习</div>
        </div>
        <swiper class="swiper_type_menu" ref="pages" :options="swiperOption" >
            <!-- slides -->

  <!--          <swiper-slide key="0" :style='{"height":windowHeight+"px"}' >
               <v-titlePage v-on:isStart = "isStartEvent"></v-titlePage>
            </swiper-slide>
        <swiper-slide key="1">
            <v-select></v-select>
        </swiper-slide>
        <swiper-slide key="2">
            <v-imageText></v-imageText>
        </swiper-slide>
      <swiper-slide key="3">
            <v-imageChange></v-imageChange>
        </swiper-slide>
        <swiper-slide key="4">
            <v-judge></v-judge>
        </swiper-slide>
        <swiper-slide key="5">
            <v-selectmore></v-selectmore>
        </swiper-slide>-->

            <swiper-slide v-for="(data,index) in bookData" :key="index">
                <v-titlePage v-if="data.testType == '0' && data.displayType == 't1'" v-on:isStart = "isStartEvent" :data="data"></v-titlePage>
                <v-imageText v-else-if="data.testType == '1' && data.displayType == 'it1'" :data="data"></v-imageText>
                <v-imageChange v-else-if="data.testType == '2' && data.displayType == 'ic1'" :data="data"></v-imageChange>
                <v-judge  v-else-if="data.testType == '3' && data.displayType == 'j1'" :data="data"></v-judge>
                <v-select v-else-if="data.testType == '4' && data.displayType == 's1'" :data="data" :nowyes="nowyesEvent(data)" v-on:imgShow = "imgShowEvent"></v-select>
                <v-selectmore  v-else-if="data.testType == '5' && data.displayType == 'sm1'" :data="data"></v-selectmore>
                <v-selectAllJType   v-else-if="data.testType == '6' && data.displayType == 'sm2'" :data="data"></v-selectAllJType>
                <v-imgJumpType v-else-if="data.testType == '7' && data.displayType == 'imt'" :data="data" :page="index"  v-on:isJump = "isJumpEvent"></v-imgJumpType>
                <v-listTypePage v-else-if="data.testType == '8' && data.displayType == 'lt'" :data="data" v-on:imgShow = "imgShowEvent"></v-listTypePage>
                <v-sideEdgeImg v-else-if="data.testType == '9' && data.displayType == 'ct'" :data="data"></v-sideEdgeImg>
                <v-blanksType v-else-if="data.testType == '10' && data.displayType == 'bl'" :data="data"></v-blanksType>
                <v-imgSelectType v-else-if="data.testType == '11' && data.displayType == 'isd'" :data="data"></v-imgSelectType>
                <v-imgDisplayType v-else-if="data.testType == '12' && data.displayType == 'idp'" :data="data"></v-imgDisplayType>
            </swiper-slide>
            <swiper-slide :key="bookData.length">
                <v-lastPage></v-lastPage>
            </swiper-slide>
        </swiper>
<div id="swiper-button-prev" class="swiper-button-prev" slot="button-prev" @click="pageTurn('left')"></div>
<div id="swiper-button-next" class="swiper-button-next" slot="button-next" @click="pageTurn('right')"></div>
<div class="swiper-pagination" slot="progressbar"></div>
        <div id="page-menu">
            <div id="displayBtn" @click="pageMenuDisplay">☰</div>
            <div id="dealMenu">
                <swiper class="swiper-menu" ref="pageMenu" :options="swiperSmooth" >
                <!-- slides -->
                    <!--     <swiper-slide  :key="0">
                         <div class="type-main">第1页</div>
                      </swiper-slide>
                     <swiper-slide  :key="1">
                         <div class="type-main">第2页</div>
                     </swiper-slide>
                     <swiper-slide  :key="2">
                         <div class="type-main">第3页</div>
                     </swiper-slide>
                     <swiper-slide  :key="3">
                         <div class="type-main">第4页</div>
                     </swiper-slide>
                     <swiper-slide  :key="4">
                         <div class="type-main">第5页</div>
                     </swiper-slide>
                     <swiper-slide  :key="5">
                         <div class="type-main">第6页</div>
                     </swiper-slide>-->
                    <swiper-slide  v-for="(data,index) in bookData" :key="index">
                        <div class="type-main" @click="pageClickEvent(index)"  :class="{typemainclick:nowPage == index}">第{{index+1}}页</div>
                    </swiper-slide>
                    <swiper-slide :key="bookData.length">
                        <div class="type-main"  @click="pageClickEvent(bookData.length)"  :class="{typemainclick:nowPage == bookData.length}">最后一页</div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div id="imgWin"  @click="imgHiddenEvnet"  :class="{showBox:displayImg != ''}"></div>
        <div id="imgBox"   :class="{showBox:displayImg != ''}">
            <div @click="imgHiddenEvnet" class="closeBtn">x</div>
            <img :src="displayImg" />
            <p v-if="displayText != ''" v-html="Trim(displayText)"></p>
        </div>
        <div id="noteWin" @click="hideNoteEvent"></div>
        <p id="noteText" v-html="noteTexts"></p>
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
 import $ from 'jquery'
    export default{
        data(){
         var self = this;
            return{
                swiperOption: {
                    allowTouchMove:false,
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
                    loop: false
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
                displayText:"",
                noteTexts:""
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
             "v-imgDisplayType":imgDisplayType
     },
        mounted:function(){
            var self = this;
            this.bookData = window.edit;
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


        },
        methods:{
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
                var self= this;
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
                console.log(len)
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
                    $("#page-menu").animate({"bottom":(-55)})
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
                if(data.url == null || data.url == undefined){
                    this.displayImg = "";
                }else{
                    this.displayImg = data.url;
                }
                if(data.text == null || data.text == undefined){
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
                $("#noteWin").hide();
                $("#noteText").hide();
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
    bottom: -55px;
    left: 0;
    z-index: 100;
    width: 100%;
    background-color: #ffffff;

}
#dealMenu{
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
      color: #ff6077;
      overflow: hidden;
      background-color: #feeae8;
      padding: 2% 3%;
      margin: 0 5%;
  }
  .typemainclick ,.type-main-click{
      background-color: skyblue;
      color: steelblue;
      font-size: 5vw;
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
      opacity: 0.4;
  }
  #saveMain p{
      color: #ffffff;
      font-size: 6vw;
      padding-bottom: 2%;
  }
  #saveMain{
      width: 80%;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -40%;
      z-index: 1002;
  }
  #yesbtn,#nobtn{
      width: 60%;
      padding: 3% 0;
      margin: 4% auto;
      font-size: 5vw;
      text-align: center;
      background-color: #019ccb;
      color: #ffffff;
  }
  #swiper-button-prev, .swiper-container-rtl .swiper-button-next{
       background-image:url("./../img/left.png");
   }
  #swiper-button-next, .swiper-container-rtl .swiper-button-prev{
      background-image:url("./../img/right.png");
  }
  #imgBox{
          position: absolute;
          z-index:0;
          top: 0;
          left: 50%;
          width: 80%;
          opacity: 0;
          display: none;
            margin:25% 0 0 -40%;
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
      transition:opacity 2s ;
      -webkit-transition:opacity 2s ;
      opacity: 1;
      display: block;
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
          display: none;
      }
  #imgWin.showBox{
      transition:opacity 2s ;
      -webkit-transition:opacity 2s ;
      display: block;
      z-index:99;
      }
      .closeBtn{
          position: absolute;
          top:0;
          right:0;
      }

  </style>