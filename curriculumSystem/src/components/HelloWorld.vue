<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
        <input id="file-selector" type="file" >
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    isUseMenu: [
    {value: "1",
    label: "是"},
    {value: "0",
    label: "否"}
    ],
    isUse: "0",
    isStudy:"0",
    descText:"",
    imageUrl: '',
    dialogTableVisible: false,
    userinfo:"",
    SecretId:"",
    SecretKey:"",
    XCosSecurityToken:"",
    expiredTime:"",
    majorName:"",
    orderValue:"",
    coverImg:"",
    majorTypeMenu:[
    {value: 1,
    label: "专业课"},
    {value: 0,
    label: "公开课"}
    ],
    majorType:"",


    typeData:[],
    nowType:"",
    tagData:[],
    tagDataList:[],
    tagDataMenu:[],
    tags: [],
    tagsArr:[]
    }
  },
    methods: {
    getUpLoadKey(){
    var self =this;
    this.common.getEventToken(this.api.host+this.api.cosToken,{},this.userinfo,function(data){
    console.log(data);
    self.SecretId = data.credentials.tmpSecretId;
    self.SecretKey = data.credentials.tmpSecretKey;
    self.XCosSecurityToken = data.credentials.sessionToken;
    self.expiredTime = data.expiredTime;
    })

    },
    },
    mounted:function(){
    var self =this;
    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
    this.getUpLoadKey();

    document.getElementById('file-selector').onchange = function () {
    var file = this.files[0];
    var fileurl = "courseware/a/";
    if (!file) return;
    //                console.log(file.name);
    //                console.log(file)
    if(self.SecretId != "" && self.SecretKey !="" ){
    if(file){
    self.cosjsFile(self.SecretId,self.SecretKey,fileurl,file,self.XCosSecurityToken,self.expiredTime,function(img){
    // self.coverImg = img;
    });
    }
    }

    };
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
