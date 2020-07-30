<template>
  <div >
   <el-row type="flex" class="row-bg" justify="center">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
   </el-row>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">控制台</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/datasource">数据源</el-menu-item>
          <el-menu-item index="/prjectinfo">项目信息</el-menu-item>
          <el-menu-item index="/datatype">数据类型</el-menu-item>
          <el-menu-item index="/generator">代码生成</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/doc" >
        <i class="el-icon-document"></i>
        <span slot="title">说明文档</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <i class="el-icon-menu"></i>
        <span slot="title">关于</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return { };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style  scoped>
</style>>
