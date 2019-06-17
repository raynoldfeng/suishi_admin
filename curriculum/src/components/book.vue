<template>
    <div id = "book">
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
                <v-select v-else-if="data.testType == '4' && data.displayType == 's1'" :data="data"></v-select>
                <v-selectmore  v-else-if="data.testType == '5' && data.displayType == 'sm1'" :data="data"></v-selectmore>
            </swiper-slide>
            <swiper-slide :key="bookData.length">
                <v-lastPage></v-lastPage>
            </swiper-slide>
        </swiper>
<div class="swiper-button-prev" slot="button-prev" @click="pageTurn('left')"></div>
<div class="swiper-button-next" slot="button-next" @click="pageTurn('right')"></div>
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
                bookData:""
            }
        },
     components:{
         'v-judge':judge,
         'v-select':select,
          'v-imageText':imageText,
          'v-imageChange':imageChange,
          'v-titlePage':titlePage,
         'v-selectmore':selectmore,
             'v-lastPage':lastPage
     },
        mounted:function(){
            this.bookData = window.edit;
            console.log(this.bookData)
            this.nowPage = this.$refs.pages.swiper.realIndex;
            this.windowHeight = window.innerHeight;
         //   this.pageClickEvent();
            window.getAllPage=function(){
                try{
                    getCurrentPage(window.edit.length);
                }catch (e){
                    alert(e);
                }
               // return window.edit.length;
            }
        },
        methods:{
            /**
             * 点击第几页
             */
            pageClickEvent(index){
                var self= this;
                this.nowPage = index;
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
                    }else{
                        $("#dealMenu .type-main").eq(this.$refs.pages.swiper.realIndex-1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(this.$refs.pages.swiper.realIndex-1);
                        this.nowPage = this.$refs.pages.swiper.realIndex-1;
                    }
                }else if("right"){
                    if(this.$refs.pages.swiper.realIndex == len-1){
                        $("#dealMenu .type-main").eq(len-1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(len-1);
                        this.nowPage = len-1;
                    }else{
                        $("#dealMenu .type-main").eq(this.$refs.pages.swiper.realIndex+1).addClass("typemainclick");
                        this.$refs.pageMenu.swiper.slideTo(this.$refs.pages.swiper.realIndex+1);
                        this.nowPage = this.$refs.pages.swiper.realIndex+1;
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
                }
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
  }
      #book, .swiper_type_menu{
        position:fixed;
        width:100%;
      height:100%;
      }
  </style>