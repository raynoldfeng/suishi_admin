// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style.css'

const common=require("./common/common.js");
const api = require("./common/api.js");
require("./common/cos-js-sdk-v5.js");
var cosjs = function newCos(SecretId,SecretKey,file,XCosSecurityToken,expiredTime ){
//    console.log(2545454);
//    console.log(SecretId);
//    console.log(SecretKey);
//    console.log(file);
//    console.log(file.name);
   var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
//    cos.sliceUploadFile({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(err, data);
//    });

    cos.putObject({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: file.name,
        Body: file
    }, function (err, data) {
        console.log(data.headers);

    });
    cos.getObjectUrl({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
    });

};

Vue.prototype.common = common.common;
Vue.prototype.api = api.api;
Vue.prototype.cosjs = cosjs;
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
