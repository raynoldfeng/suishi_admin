/**
 * Created by lenovo on 2019/8/27.
 */
/**
 * Created by Administrator on 2019/5/23.
 */
/**
 * Created by Administrator on 2019/5/23.
 */
var paramsmore = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false,
    self:""
};
var now =0;
var _self = "";
function getCss(o,key){
    //  return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
    return o.css(key);
};
export const dropmore = {

    phoneStartDrag:function(bar, target,id,callback,truecallback){
        if(getCss(target, "left") !== "auto"){
            paramsmore.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            paramsmore.top = getCss(target, "top");
        }


        bar.on("touchstart",function(event){
            $(".kuang").addClass("select-css");
            paramsmore.self = $(this);
            paramsmore.flag = true;
            if(!event){
                event = window.event;
                //防止IE文字选中???
                bar.onselectstart = function(){
                    return false;
                }
            }
            var e = event;
            //    console.log(e.targetTouches[0].clientX)
            paramsmore.currentX = e.targetTouches[0].clientX;
            paramsmore.currentY = e.targetTouches[0].clientY;
        });






        document.addEventListener("touchend",function(){

//        target.style.left = 100 + "px";
//        target.style.top = 300 + "px";



            if(!paramsmore.flag){
                return false;
            }
            if(isSelection(".true-main", target.css("top"), target.css("left")) || isSelection(".false-main", target.css("top"), target.css("left"))){
                target.css("left",(window.innerWidth - $(id).width())/2 + "px");
                target.css("top",window.innerHeight/1.2 + "px");
                //  params.self.hide();
                //$(id).hide();
                if(getCss(target, "left") !== "auto"){
                    paramsmore.left = getCss(target, "left");
                }
                if(getCss(target, "top") !== "auto"){
                    paramsmore.top = getCss(target, "top");
                }
                var all = parseInt(paramsmore.self.attr("attr-all"));
                truecallback && truecallback(all,now);
            }else{
                $(id).removeClass("shake");
                var left = (window.innerWidth - $(id).width())/2 + "px";
                var top =window.innerHeight/1.2 + "px";
                $(id).animate({left:left,top:top},function(){
                    if(getCss(target, "left") !== "auto"){
                        paramsmore.left = getCss(target, "left");
                    }
                    if(getCss(target, "top") !== "auto"){
                        paramsmore.top = getCss(target, "top");
                    }
                    $(id).addClass("shake");
                });
            }


            $(".kuang").removeClass("select-css");
            paramsmore.flag = false;
        });
        document.addEventListener("touchmove",function(event){
            var e = event ? event: window.event;
            // console.log(e);
            if(paramsmore.flag){
                var nowX = e.targetTouches[0].clientX, nowY = e.targetTouches[0].clientY;
                var disX = nowX - paramsmore.currentX, disY = nowY - paramsmore.currentY;
//                target.style.left = parseInt(params.left) + disX + "px";
//                target.style.top = parseInt(params.top) + disY + "px";
                target.css("left",parseInt(paramsmore.left) + disX + "px");
                target.css("top",parseInt(paramsmore.top) + disY + "px");

                if (typeof callback == "function") {
                    callback((parseInt(paramsmore.left) || 0) + disX, (parseInt(paramsmore.top) || 0) + disY);
                }
//
//            if (event.preventDefault) {
//                event.preventDefault();
//            }
                return false;
            }
        });
        function isSelection(id,top,left){
            if(paramsmore.self!= ""){
                var left_s =paramsmore.self.prev(".judgebox").find(id).offset().left - paramsmore.self.prev(".judgebox").find(id).width();
                var left_e = paramsmore.self.prev(".judgebox").find(id).offset().left + paramsmore.self.prev(".judgebox").find(id).width()/2;
                var top_s = paramsmore.self.prev(".judgebox").find(id).offset().top -  paramsmore.self.prev(".judgebox").find(id).height()/2;
                var top_e =  paramsmore.self.prev(".judgebox").find(id).offset().top + paramsmore.self.prev(".judgebox").find(id).height();
                var nowTop = parseInt(top);
                var nowLeft = parseInt(left);
                if(nowTop > top_s && nowTop < top_e && nowLeft > left_s && nowLeft < left_e){
                    if(paramsmore.self.prev(".judgebox").find(id).find(".kuang").hasClass("yes")){
//                    $(id).find(".kuang").addClass("answer-css");  //给答案添加样式
//                    $(id).find(".kuang").find("p").text(target.innerHTML);
                        //    params.self.prev(".judgebox").find(id).find(".kuang").addClass("answer-css");  //给答案添加样式
                        var html = "<li class='li-main' attr='"+paramsmore.self.attr("attr")+"'>"+ paramsmore.self.text() +"</li>";
                        paramsmore.self.prev(".judgebox").find(id).find(".anwer-menu").append(html);
                        $(".li-main").on("click",function(){
                            $("#noteWin").show().addClass("noteWin-play");
                            $("#noteText").css("bottom","-"+$("#noteText").height());
                            $("#noteText").show().addClass("noteText-play");
                            $("#noteText p").html(Trim($(this).attr("attr")));
                        });
                        // params.self.prev(".judgebox").find(id).find(".kuang").find("p").text(target.innerHTML);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }
            function Trim(str) {
                return str.replace(/\n|\r\n/g,"<br/>");
            }

        };

    },
    getNow(nowQ){
    now = nowQ;
},

}