<template>
    <div id = "book">
        <div id="loadMain" v-if="!loaded">
            <img id="loadingImg" src="./../img/loading.gif" />
            <p v-text="percent" ></p>
        </div>
        <div id="saveBox" v-if="hasSave"></div>
        <div id="saveMain" v-if="hasSave">
            <p>需要继续之前的学习吗？</p>
            <div id="yesbtn" @click="studyEvent(1)">继续学习</div>
            <div id="nobtn" @click="studyEvent(2)">重新学习</div>
        </div>
        <swiper class="swiper_type_menu" ref="pages" :options="swiperOption" >


            <swiper-slide v-for="(data,index) in bookData" :key="index">
                <v-titlePage v-if="data.testType == '0' && data.displayType == 't1'" v-on:isStart = "isStartEvent" :data="data"></v-titlePage>
                <v-imageText v-else-if="data.testType == '1' && data.displayType == 'it1'" :data="data"></v-imageText>
                <v-imageChange v-else-if="data.testType == '2' && data.displayType == 'ic1'" :data="data" :page="index" v-on:isJump = "isJumpEvent" v-on:imgShow = "imgShowEvent2"></v-imageChange>
                <v-judge  v-else-if="data.testType == '3' && data.displayType == 'j1'" :data="data" :page="index" :index = "index" :nowPage="nowPage" v-on:isJump = "isJumpEvent"></v-judge>
                <v-select v-else-if="data.testType == '4' && data.displayType == 's1'" :data="data" :nowyes="nowyesEvent(data)" v-on:imgShow = "imgShowEvent"></v-select>
                <v-selectmore  v-else-if="data.testType == '5' && data.displayType == 'sm1'" :data="data"></v-selectmore>
                <v-selectAllJType   v-else-if="data.testType == '6' && data.displayType == 'sm2'" :data="data"></v-selectAllJType>
                <v-imgJumpType v-else-if="data.testType == '7' && data.displayType == 'imt'" :data="data" :page="index"  v-on:isJump = "isJumpEvent"></v-imgJumpType>
                <v-listTypePage v-else-if="data.testType == '8' && data.displayType == 'lt'" :data="data" v-on:imgShow = "imgShowEvent"></v-listTypePage>
                <v-sideEdgeImg v-else-if="data.testType == '9' && data.displayType == 'ct'" :data="data"></v-sideEdgeImg>
                <v-blanksType v-else-if="data.testType == '10' && data.displayType == 'bl'" :data="data"></v-blanksType>
                <v-imgSelectType v-else-if="data.testType == '11' && data.displayType == 'isd'" :data="data"></v-imgSelectType>
                <v-imgDisplayType v-else-if="data.testType == '12' && data.displayType == 'idp'" :data="data"></v-imgDisplayType>
                <v-dragMore v-else-if="data.testType == '13' && data.displayType == 'pp'" :page="index" :data="data" v-on:imgShow = "imgShowEvent" v-on:isJump = "isJumpEvent"></v-dragMore>
                <v-videoType v-else-if="data.testType == '14' && data.displayType == 'vd'" :nowPage="nowPage" :page="index" :data="data"></v-videoType>
                <v-selectDisplay v-else-if="data.testType == '15' && data.displayType == 'sd'" :data="data" v-on:imgShow = "imgShowEvent"></v-selectDisplay>
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
            <div id="imgBox"   :class="{showBox:displayImg != ''}" v-show="displayImg != ''">
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
 import videoType from '../components/videoType.vue'
import selectDisplay from '../components/selectDisplay.vue'
 import $ from 'jquery'
    export default{
        data(){
         var self = this;/**
          * Created by Administrator on 2019/4/21 0021.
          */
     import axios from 'axios'
     import VueAxios from 'vue-axios'
     import router from '../router'
     export const common={
             cookie: {
                 get: function (name) { // 获取
                     var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
                     if (arr != null) {
                         return decodeURI(arr[2]);
                     }

                     return null;
                 },
                 set: function (name, value, days) { // 设置
                     var Days = days || 30; // 保存天数
                     var exp = new Date(); // new Date("December 31, 9998");
                     exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                     var expire = 'expires=' + exp.toGMTString();
                     //;domain=.nimo.tv
                     //;domain=.sui10.com;path=/;
                     //;domain=129.204.236.40;path=/;
                     var cookieValue = name + '=' + encodeURI(value) + ';domain=.sui10.com;path=/;' + expire;
                     //   var cookieValue = name + '=' + encodeURI(value) + ';domain=129.204.236.40;path=/;' + expire;
                     document.cookie = cookieValue;
                 },
                 del: function (name) { // 删除
                     var exp = new Date();
                     exp.setTime(exp.getTime() - 1);
                     var cval = this.get(name);
                     if (cval != null) {
                         //  document.cookie = name + '=' + cval + ';domain=.nimo.tv;path=/;expires=' + exp.toGMTString();
                         document.cookie = name + '=' + cval + ';domain=.sui10.com;path=/;expires=' + exp.toGMTString();
                         //    document.cookie = name + '=' + cval + ';domain=129.204.236.40;path=/;expires=' + exp.toGMTString();
                     }
                 }
             },
             getEventToken(url,data,userinfo,callback){
             var token = userinfo.token;
             var userid = userinfo.user_id;
             axios({
                 method:'get',
                 url:url,
                 headers: { 'content-type': 'application/json','token':token,'userid':userid },
                 withCredentials: false,
                 data: {}
             }).then((res)=>{
                 if(res.status===200){
                 var code = res.data.code;
                 var data = "";
                 if(code == 0){
                     data = res.data.data;
                 }else if(code == 414){
                     router.push("/login");
                 }else{
                     alert(res.data.msg);
                     return;
                 }
                 callback(data);
             }
         }).catch((err)=>{
             alert(err);
         console.log(err);
     })
 },
 getEvent(url,data,callback){
     axios({
         method:'get',
         url:url,
         headers: { 'content-type': 'application/x-www-form-urlencoded' },
         withCredentials: false,
         data: {}
     }).then((res)=>{
         if(res.status===200){
         var code = res.data.code;
         var data = "";
         if(code == 0){
             data = res.data.data;
         }else if(code == 414){
             router.push("/login");
         }else{
             alert(res.data.msg);
             return;
         }
         callback(data);
     }
 }).catch((err)=>{
     alert(err);
 console.log(err);
 })
 },
 postEventToken(url,data,userinfo,callback){
     var token = userinfo.token;
     var userid = userinfo.user_id;
     axios({
         method:'post',
         url:url,
         headers: { 'content-type': 'application/json','token':token,'userid':userid },
         withCredentials: false,
         data: data ? data:{}
     }).then((res)=>{
         console.log(res)
     if(res.status===200 || res.status===201){
         var code = res.data.code;
         var data = "";
         if (code == 0) {
             data = res.data.data;
         } else if(code == 414){
             router.push("/login");
         }else {
             alert(res.data.msg);
             return;
         }

         callback(data);
     }
 }).catch((err)=>{
     alert(err);
 console.log(err);
 })
 },
 postEvent(url,data,callback){
     axios({
         method:'post',
         url:url,
         headers: { 'content-type': 'application/x-www-form-urlencoded' },
         withCredentials: false,
         data: data ? data:{}
     }).then((res)=>{
         if(res.status===200){
         var code = res.data.code;
         var data = "";
         if (code == 0) {
             data = res.data.data;
         } else if(code == 414){
             router.push("/login");
         }else {
             alert(res.data.msg);
             return;
         }
         callback(data);
     }
 }).catch((err)=>{
     alert(err);
 console.log(err);
 })
 },
 putEventToken(url,data,userinfo,callback){
     var token = userinfo.token;
     var userid = userinfo.user_id;
     axios({
         method:'put',
         url:url,
         headers: { 'content-type': 'application/json','token':token,'userid':userid },
         withCredentials: false,
         data: data ? data:{}
     }).then((res)=>{
         if(res.status===200){
         var code = res.data.code;
         var data = "";
         if (code == 0) {
             data = res.data.data;
         }else if(code == 414){
             router.push("/login");
         } else {
             alert(res.data.msg);
             return;
         }
         callback(data);
     }
 }).catch((err)=>{
     alert(err);
 console.log(err);
 })
 },
 deleteEventToken(url,data,userinfo,callback){
     var token = userinfo.token;
     var userid = userinfo.user_id;
     axios({
         method:'delete',
         url:url,
         headers: { 'content-type': 'application/json','token':token,'userid':userid },
         withCredentials: false,
         data: data ? data:{}
     }).then((res)=>{
         if(res.status===200){
         var code = res.data.code;
         var data = "";
         if (code == 0) {
             data = res.data.data;
         }else if(code == 414){
             router.push("/login");
         } else {
             alert(res.data.msg);
             return;
         }
         callback(data);
     }
 }).catch((err)=>{
     alert(err);
 console.log(err);
 })
 },
 commonDeleteEvent(self,userinfo,url,id,callback){
     var _this = self
     _this.$confirm('确定要删除此帖子吗?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
     }).then(() => {
         _this.common.deleteEventToken(_this.api.host+url+'/'+id,{},userinfo,function(data){
                 console.log(data);
                 callback && callback(data);

             })
 }).catch(() => {
     _this.$message({
             type: 'info',
             message: '已取消删除'
         });
 });
 },
 ellipsisEvent(text){
     if(text.length > 50){
         var content =  text.slice(0,50)+"...";
         return content;
     }else{
         return text
     }
 }

 }
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
                },
                imgs:[],
                count: 0,
                percent:'',
                imglength:0,
                loaded:false
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
             'v-dragMore':dragMore,
             "v-videoType":videoType,
             'v-selectDisplay':selectDisplay
     },
        mounted:function(){
            window.jpage = 0;
            window.jshow = true;
            var self = this;
            if(window.edit.length == undefined){
                this.bookData = window.edit.data;
                this.imgs = window.edit.imgMenu;
            }else{
                this.bookData = window.edit;
            }

            this.imglength = this.imgs.length;
            if(this.imglength > 0){

                for (let img of this.imgs) {
                    let image = new Image()
                    image.src = img;
                    image.onload = () => {
                        this.count++;
                        // 计算图片加载的百分数，绑定到percent变量
                        let percentNum = Math.floor(this.count / this.imglength * 100);
                        this.percent = percentNum+"%";
                        if(this.count == this.imglength){
                            $("#loadMain").animate({opacity:0},800);
                            setTimeout(()=>{
                            this.loaded = true;
                            },900)
                        }
                        //document.getElementById('_bar').style.backgroundSize = `${percentNum}% 100%`
                        // console.log(this.percent)
                    }
                }
            }else{
                this.loaded = true;
            }


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
  #loadMain{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      background: #ffffff;
      width: 100%;
      height: 100%;
  }
      #loadingImg{
        width:100%;
        margin-top:38%;
      }
      #loadMain p{
        margin-top:-9%;
      }
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
    width: 10%;
    text-shadow: 0 1.5px 0 #fff;
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
          /*left: 50%;*/
          /*width: 80%;*/
          /*margin:25% 0 0 -40%;*/
          width: 100%;
          left: 0;
          margin: 25% 0 0 0;
      }
  #imgBox.bigImgs{
      width: 100%;
      left: 0;
      margin: 25% 0 0 0;
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
          /*top: -4%;*/
          /*right: -3%;*/
          top: -6%;
          right: 0;
      }
  #imgBox.bigImgs .closeBtn{
      top: -6%;
      right: 0;
  }
  </style>