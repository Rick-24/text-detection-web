<template>
  <body>
  <section class="nav">
    <h1 class="Intro-h1">Text Detection</h1>
    <h3 class="span loader">
      <span class='m'>文</span>
      <span class='m'>本</span>
      <span class='m'>合</span>
      <span class='m'>规</span>
      <span class='m'>性</span>
      <span class='m'>&nbsp;</span>
      <span class='m'>检</span>
      <span class='m'>测</span>
      <span class='m'>系</span>
      <span class='m'>统</span>
    </h3>
    <div class="nav-container">
      <a class="nav-tab" href="#tab-pwa">项目介绍</a>
      <a class="nav-tab" href="#tab-graphql">功能计划</a>
      <a class="nav-tab" href="#tab-next">开发环境</a>
      <span class="nav-tab-slider"></span>
    </div>
  </section>

  <main class="main">
    <section class="slider" id="tab-pwa">
      <h1>项目介绍</h1>

      <h3>基于 Spring Boot、Spring Cloud、Vue、Element 的 Java EE 快速开发平台</h3>
      <h3>旨在提供一套简洁易用的解决方案，帮助用户有效降低项目开发难度和成本</h3>
      <h3>博客提供项目开发过程同步系列教程文章，手把手的教你如何开发同类系统</h3>

    </section>
    <section class="slider" id="tab-graphql">
      <h2></h2>
      <h1>功能计划</h1>
      <section class="slider-inner">
        <h3>✔ 系统登录：系统用户登录，系统登录认证（token方式）</h3>
        <h3>✔ 用户管理：新建用户，修改用户，删除用户，查询用户</h3>
        <h3>✔ 角色管理：新建角色，修改角色，删除角色，查询角色</h3>
        <h3>✔ 菜单管理：新建菜单，修改菜单，删除菜单，查询菜单</h3>
        <h3>✔ 数据监控：定制Druid信息，提供简洁有效的SQL监控</h3>
        <h3>✔ 主题切换：支持主题切换，自定主题颜色，一键换肤</h3>
        <h3>&nbsp;&nbsp;&nbsp; 记录管理：记录查看，删除记录，下载记录，查询记录</h3>
        <h3>&nbsp;&nbsp;&nbsp; 文件管理：文件查看，删除文件，下载文件，查询文件</h3>
      </section>
    </section>
    <section class="slider" id="tab-next">
      <h1>开发环境</h1>
      <section>
        <h3>IDE : eclipse 4.6.x。 JDK : JDK 1.8.x。</h3>
        <h3>Maven : Maven 3.5.x。 MySQL: MySQL 5.7.x。</h3>
        <h3>IDE : VS Code 1.27。 Webpack：webpack 3.2.x。</h3>
        <h3>NODE: Node 8.9.x。 NPM : NPM 6.4.x。</h3>
      </section>
    </section>

  </main>

  </body>
</template>

<script>
export default {
  components: {},
  methods: {}

}
</script>

<style lang="css">

body {
  font-family: "ROBOTO", sans-serif;
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  position: relative;
  background-color: #ffffff;
  text-align: center;
  padding: 0 2em;
}

.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-color: #ffffff;
  text-align: justify;
  padding: 0 7em;
}


.nav h1,
.slider h1 {
  font-family: "Josefin Sans", sans-serif;
  font-size: 5vw;
  margin: 0;
  padding-bottom: 0.5rem;
  letter-spacing: 0.3rem;
  color: #3B78D2;
  transition: all 0.3s ease;
  z-index: 3;
}

.Intro-h1:hover {
  transform: translate3d(0, -10px, 22px);
  color: #b6fbff;
}

.slider h2 {
  font-size: 2vw;
  letter-spacing: 0.3rem;
  font-family: "ROBOTO", sans-serif;
  font-weight: 300;
  color: #FF0080;
  z-index: 4;
}

.slider h3 {
  font-size: 2vw;
  font-family: "Arial", "微软雅黑", sans-serif;
  color: #303133;
  z-index: 4;
}

h3.span {
  font-size: 2vw;
  letter-spacing: 0.15rem;
  font-family: "ROBOTO", sans-serif;
  font-weight: 300;
  color: #20BDFF;
  z-index: 4;
}

.m:hover {
  color: #FF8C00;
  font-weight: 500;
  font-size: 2.2vw;
}

a {
  text-decoration: none;
}

.nav-container {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75px;
  /*box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);*/
  background: #ffffff;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-first {
  position: fixed;
  top: 75px;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-second {
  position: fixed;
  top: 0;
}

.nav-container--top-second {
  position: fixed;
  top: 0;
}

.nav-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #3B78D2;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 2vw;
}

.nav-tab:hover {
  color: #ffffff;
  background: #3B78D2;
  transition: all 0.5s ease;
}

.nav-tab-slider {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 5px;
  background: #03dac6;
  transition: left 0.3s ease;
}

.background {
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: auto;
}

@media (min-width: 800px) {
  .nav h1,
  .slider h1 {
    font-size: 5vw;
  }

  .nav h2,
  .slider h2 {
    font-size: 3vw;
  }

  .nav-tab {
    font-size: 3vw;
  }
}

@media screen only (min-width: 360px) {
  .nav h1,
  .slider h1 {
    font-size: 8vw;
  }

  .nav h2,
  .slider h2 {
    font-size: 2vw;
    letter-spacing: 0.2vw;
  }

  .nav-tab {
    font-size: 1.2vw;
  }
}

.background {
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.loader span {
  color: #fd1d1d;
  text-shadow: 0 0 0 #faebd7;
  -webkit-animation: loading 1s ease-in-out infinite alternate;
}

@-webkit-keyframes loading {
  to {
    text-shadow: 20px 0 70px #FF8C00;
    color: #FF8C00;
  }
}

.loader span:nth-child(2) {
  -webkit-animation-delay: 0.1s;
}

.loader span:nth-child(3) {
  -webkit-animation-delay: 0.2s;
}

.loader span:nth-child(4) {
  -webkit-animation-delay: 0.3s;
}

.loader span:nth-child(5) {
  -webkit-animation-delay: 0.4s;
}

.loader span:nth-child(6) {
  -webkit-animation-delay: 0.5s;
}

.loader span:nth-child(7) {
  -webkit-animation-delay: 0.6s;
}

.loader span:nth-child(8) {
  -webkit-animation-delay: 0.7s;
}

.loader span:nth-child(9) {
  -webkit-animation-delay: 0.8s;
}

.loader span:nth-child(10) {
  -webkit-animation-delay: 0.9s;
}

.loader span:nth-child(11) {
  -webkit-animation-delay: 1s;
}

.loader span:nth-child(12) {
  -webkit-animation-delay: 1.1s;
}

.loader span:nth-child(13) {
  -webkit-animation-delay: 1.2s;
}

.loader span:nth-child(14) {
  -webkit-animation-delay: 1.3s;
}

.loader span:nth-child(15) {
  -webkit-animation-delay: 1.4s;
}

.loader span:nth-child(16) {
  -webkit-animation-delay: 1.5s;
}

.loader span:nth-child(17) {
  -webkit-animation-delay: 1.6s;
}

.loader span:nth-child(18) {
  -webkit-animation-delay: 1.7s;
}

.loader span:nth-child(19) {
  -webkit-animation-delay: 1.8s;
}

.loader span:nth-child(20) {
  -webkit-animation-delay: 1.9s;
}

.loader span:nth-child(21) {
  -webkit-animation-delay: 2s;
}

.loader span:nth-child(22) {
  -webkit-animation-delay: 2.1s;
}

</style>
