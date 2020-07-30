<template>
  <div id="app">
    <el-container>
      <el-aside width="250px">
        <LayoutAside></LayoutAside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer height="30px">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutAside from "@/layout/aside.vue";

export default {
  name: "App",
  components: {
    LayoutAside
  }
};
</script>

<style >
body {
  margin: 0;
  padding: 0;
}
.el-container .is-vertical {
  height: calc(100vh);
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  text-align: center;
  
}

.el-aside {
  background-color: #ffffff;
  color: #333;
}

.el-main {
  background-color: #f3f4f5;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
