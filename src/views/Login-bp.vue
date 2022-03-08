<template>
  <el-form ref="loginForm" :rules="fieldRules" :model="loginForm" label-width="0px" label-position="left"
           class="login login-cotainer">

    <span class="tool-bar">
      <!-- 主题切换 -->
      <theme-picker style="float:right;" class="theme-picker" :default="themeColor"
                    @onThemeChange="onThemeChange"></theme-picker>
    </span>

    <h2 class="title" style="padding-left: 22px">系统登陆</h2>
    <el-form-item prop="account" >
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" >
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-col :span="12">
        <el-form-item prop="captcha">
          <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                    style="width: 100%;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item>
          <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>

  </el-form>
</template>
<div class="header">
<div class="inner-header flex">

</div>

<!--Waves Container-->
<div>
  <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
    </defs>
    <g class="parallax">
      <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
      <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
      <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
      <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"/>
    </g>
  </svg>
</div>
<!--Waves end-->

</div>
<!--Header ends-->

<!--Content starts-->
<div class="content flex">
<p>By.Goodkatz | Free to use </p>
</div>
<!--Content ends-->

<script>
import ThemePicker from "../components/ThemePicker";
import Cookies from "js-cookie";
import { mapState } from 'vuex'

export default {
  name: "Login",
  components: {ThemePicker},
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        captcha: '',
        src: ''
      },
      fieldRules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
      this.$api.login.login(userInfo).then((res) => {
        if(res.msg != null) {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        } else {
          Cookies.set('token', res.data.token) // 放置token到Cookie
          sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
          this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
          this.$router.push('/')  // 登录成功，跳转到主页
        }
        this.loading = false
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'error'
        })
      });
    },
    refreshCaptcha: function () {
      this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime()
      let item = sessionStorage.getItem('JSESSIONID')
      console.log(item)

      let jsessionid = Cookies.get('JSESSIONID');
      console.log(jsessionid)
    },
    reset() {
      this.$refs.loginForm.resetFields()
    },
    onThemeChange: function (themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    }
  },
  // mounted:html加载完成后执行。执行顺序:子组件-父组件
  mounted() {
    this.refreshCaptcha()
  },
  computed:{
    ...mapState({
      themeColor: state=> state.app.themeColor
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}

.login {
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -160px;
  width: 500px;
}
</style>
