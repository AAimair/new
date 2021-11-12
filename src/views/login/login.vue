<template>
  <div class="loginPage">
    <div class="logo"><img src="../../assets/code365.jpg"></div>
    <div class="loginForm">
      <div class="top">
        <p>Code 365</p>
        <p>Foundation 1</p>
        <p>ALP Digital Industries Software</p>
      </div>
      <h6>用户登录</h6>
      <div class="form">
        <div class="row">
          <a-input v-model:value="userName" placeholder="用户名" />
        </div>
        <div class="row">
          <a-input v-model:value="userPwd" type="password" @keyup.enter="login" placeholder="密码" />
        </div>
        <div class="row" v-if="isVerify">
          <div class="verifyInput">
            <a-input v-model:value="verify" placeholder="验证码" >
              <template #prefix>
                <VerifiedOutlined />
              </template>
            </a-input>
          </div>
          <div class="verifyImg" @click="getVerify">
            <img :src="verifyImg">
          </div>
        </div>
      </div>
      <div class="error-message">
        <p>{{errStr}}</p>
      </div>
      <div class="loginBtn">
        <a-checkbox v-model:checked="rememberMe">记住密码</a-checkbox>
        <a-button type="primary" @click="login">登陆</a-button>
      </div>
      <p>Copyright © 2021 ALP</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { encrypt, decrypt } from "../../common/jsencrypt.js";

export default defineComponent({
  name: 'loginPage',
  data: function(){
    return {
      isVerify: false,
      verifyImg: '',
      uuid: '',
    }
  },
  setup() {
    const data = {
      userName: ref(""),
      userPwd: ref(''),
      errStr: ref(''),
      verify: ref(''),
      rememberMe: ref(false)
    }

    return {
      ...data,
    }
  },
  methods: {
    getVerify: function(){
      return this.$axios.get("/captchaImage").then(res => {
        // console.log(res)
        if(res.data.code == 200){
          this.isVerify = res.data.captchaOnOff?true:false;
          this.verifyImg = 'data:image/png;base64,'+res.data.img;
          this.uuid = res.data.uuid;
        }
      })
    },
    login: function(){
      var checkErr = false;
      if(!this.userName.length){
        this.errStr =  "请输入用户名";
        checkErr = true;
      } else if(!this.userPwd.length){
        this.errStr =  "请输入密码";
        checkErr = true;
      }
      
      if(this.isVerify && !this.verify.length){
        this.errStr =  "请输入验证码";
        checkErr = true;
      }

      // 名称或密码不正确。请再次尝试输入您的凭证。
      if(!checkErr){
        var loading = this.$loading({
          target: this.$el,
          background: 'rgba(0,0,0,0.75)',
          size: 166,
          iconColor: '#00678C',
        })
        this.$axios.post('/login', {
          username: this.userName.trim(),
          password: this.$md5(this.userPwd.trim()),
          code: this.verify.trim(),
          uuid: this.isVerify?this.uuid:'',
        }).then(res => {
          if(res.data.code == 200){
            // 存一下token
            sessionStorage['token'] = JSON.stringify(res.data.token);
            document.cookie = 'token='+res.data.token+';';
            // 保存记住密码
            if(this.rememberMe){
              localStorage['code365_user'] = this.userName.trim();
              localStorage['code365_rememberMe'] = this.rememberMe?1:0;
              localStorage['code365_up'] = encrypt(this.userPwd.trim());
            }else{
              localStorage['code365_rememberMe'] = 0;
              localStorage['code365_user'] = '';
              localStorage['code365_up'] = '';
            }
            this.$router.push('/home');
          }else{
            loading.close();
            this.errStr = res.data.msg;
          }
        }).catch(err => {
          // console.log(err); 
          loading.close();
          this.errStr = '服务器异常';
        });
      }
    },
  },
  created: function(){
    // 获取登陆验证码
    this.getVerify();

    if(localStorage['code365_rememberMe']){
      this.rememberMe = true;
      this.userName = localStorage['code365_user'];
      this.userPwd = decrypt(localStorage['code365_up']);
    }
  }
})
</script>
<style lang="less">
.loginPage{
  height: 100%;
  background: url(../../assets/loginBG.jpg) no-repeat center center fixed;
  background-size: cover;
  position: relative;
  >.logo{
    margin: 40px;
    position: absolute;
    top: 0;
    left: 0;
    // width: calc(96px + 10vw);
    width: 220px;
    background: #FFFFFF;
    >img{
      display: block;
      width: 100%;
    }
  }

  >.loginForm{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 288px;
    padding: 14px 8px 8px 8px;
    background: rgba(255, 255, 255, 0.85);

    >.top{
      padding-bottom: 12px;
      color: #1E1E1E;
      >p{
        line-height: 1.4;
      }
      >p:nth-child(1){
        font-size: 16px;
      } 
      >p:nth-child(2){
        font-size: 14px;
      }
      >p:nth-child(3){
        font-size: 12px;
      }
    }


    >h6{
      padding-bottom: 12px;
      font-size: 16px;  
      font-weight: 300;
      color: rgb(30, 30, 30);
    }
    >.form{
      >.row{
        margin-bottom: 8px;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        >.verifyInput{
          width: 100%;
          .ant-input-affix-wrapper{
            padding-left: 7px;
          }
          .anticon{
            color: #aaa;
          }
        }
        >.verifyImg{
          margin-left: 10px;
          height: 28px;
          cursor: pointer;
          >img{
            display: block;
            height: 100%;
          }
        }
      }
    }
    >.error-message{
      height: 80px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      >p{
        color: red;
        font-size: 13px;
        text-overflow: ellipsis;
        padding: 0 5px 0 5px;
      }
    }
    >.loginBtn{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
    }
    >p{
      font-size: 12px;
      color: #464646;
    }
  }
}
</style>