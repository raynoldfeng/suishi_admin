/**
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

}