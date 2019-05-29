<template>
    <div id = "book">
        <swiper class="swiper_type_menu" ref="pages" :options="swiperOption" >
            <!-- slides -->

            <swiper-slide key="0" :style='{"height":windowHeight+"px"}' >
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
        </swiper-slide>
        </swiper>
<div class="swiper-button-prev" slot="button-prev" @click="pageTurn"></div>
<div class="swiper-button-next" slot="button-next" @click="pageTurn"></div>
<div class="swiper-pagination" slot="progressbar"></div>
        <div id="page-menu">
            <div id="displayBtn" @click="pageMenuDisplay">☰</div>
            <div id="dealMenu">
                <swiper class="swiper-menu" ref="pageMenu" :options="swiperSmooth" >
                <!-- slides -->
                    <swiper-slide  :key="0">
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
                nowPage:0
            }
        },
     components:{
         'v-judge':judge,
         'v-select':select,
          'v-imageText':imageText,
          'v-imageChange':imageChange,
          'v-titlePage':titlePage,
         'v-selectmore':selectmore
     },
        mounted:function(){
            this.nowPage = this.$refs.pages.swiper.realIndex;
            this.windowHeight = window.innerHeight;
            this.pageClickEvent();

        },
        methods:{
            /**
             * 点击第几页
             */
            pageClickEvent(){
                $("#dealMenu .type-main").eq(this.nowPage).addClass("type-main-click");
                $("#dealMenu .type-main").on("touchstart",function(){
                    $("#dealMenu .type-main").removeClass("type-main-click");
                    $(this).addClass("type-main-click");
                })
            },
            /**
             * 左右翻页
             */
            pageTurn(){
                console.log(this.$refs.pages.swiper.realIndex)
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
      bottom: 0;
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
  .type-main-click{
      background-color: skyblue;
      color: steelblue;
  }
  </style>