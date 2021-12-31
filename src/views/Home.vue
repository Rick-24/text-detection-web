<template>
  <div class="container">
<!--    &lt;!&ndash; 导航菜单栏 &ndash;&gt;-->
<!--    <nav-bar></nav-bar>-->
    <!-- 头部区域 -->
    <head-bar></head-bar>
<!--    &lt;!&ndash; 主内容区域 &ndash;&gt;-->
<!--    <main-content></main-content>-->
    </div>
</template>

<script>
import HeadBar from "./HeadBar"
export default {
  components:{
    HeadBar,


  }
};
</script>

<style scoped lang="scss">
.container {
  position:absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  // background: rgba(224, 234, 235, 0.1);
}
</style>
