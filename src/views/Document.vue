<template>
  <div>
    <!-- <mavon-editor v-model="value" />
    <article v-html="value"></article>-->
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>使用说明文档</span>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="项目说明" name="1">
            <div>代码生成器是Spring Boot开发的项目，直接运行main方法，就可以通过http://localhost:8011/ 打开.</div>
          </el-collapse-item>
          <el-collapse-item title="基本配置" name="2">
            <div>配置包名、作者信息、表前缀、类型转换。如果有缺少的类型，可自行在generator.properties文件中补充。</div>
            <div>类型转换是指，MySQL中的类型与JavaBean中的类型，是怎么一个对应关系。</div>
            <div>如果有缺少的类型，可自行在generator.properties文件中补充。</div>
          </el-collapse-item>
          <el-collapse-item title="项目配置" name="3">
            <div>application.yml配置文件，我们只要修改数据库名、账号、密码，就可以了。</div>
            <div>其中，数据库名是指待生成的表，所在的数据库。</div>
          </el-collapse-item>
          <el-collapse-item title="感谢使用" name="4">
            <article v-html="value"></article>
          </el-collapse-item>
        </el-collapse>
        <div class="text item"></div>
        <div class="text item"></div>
        <div class="text item"></div>
      </el-card>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeNames: ["1","2","3","4"],
      value: `<section id="nice" data-tool="mdnice编辑器" data-website="https://www.mdnice.com" style="font-size: 16px; padding: 0 10px; word-spacing: 0px; word-break: break-word; word-wrap: break-word; text-align: left; line-height: 1.25; color: #2b2b2b; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; letter-spacing: 2px; background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%); background-size: 20px 20px; background-position: center center;"><h1 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 25px;"><span class="prefix" style="font-weight: bold; color: #40B8FA; display: none;"></span><span class="content" style="display: inline-block; font-weight: bold; color: #40B8FA;">基于Spring Boot实现Mybatis的多数据源切换和动态数据源加载</span><span class="suffix" style="display: inline-block; font-weight: bold; color: #40B8FA;"></span></h1>
<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;">本文主要就mybatis的多数据源切换和动态数据源加载的实现原理做分享；对于mybatis的基础可自行百度。由于在开始学习的时候，发现网上有很多人把多数据源切换和动态数据源加载混为一谈，导致在实现动态加载的时候，所很苦恼。所以有必要在这里做以简要说明：</p>
<ul data-tool="mdnice编辑器" style="margin-top: 8px; margin-bottom: 8px; padding-left: 25px; font-size: 15px; color: #595959; list-style-type: circle;">
<li><section style="margin-top: 5px; margin-bottom: 5px; line-height: 26px; text-align: left; font-size: 14px; font-weight: normal; color: #595959;"><strong style="color: #3594F7; font-weight: bold;"><span>「</span>多数据源切换<span>」</span></strong>：<br>
指项目所需要不止一个数据库的连接信息，eg：同一数据库地址下的不同库或者压根连地址都不同。</section></li><li><section style="margin-top: 5px; margin-bottom: 5px; line-height: 26px; text-align: left; font-size: 14px; font-weight: normal; color: #595959;"><strong style="color: #3594F7; font-weight: bold;"><span>「</span>动态加载<span>」</span></strong>：<br>
指所需要的数据所在的数据库信息在项目启动前并不知道，只有在项目运行后根据业务逻辑获取到对应的数据库信息，并在代码的运行过程中，向Spring Boot中添加一个或多个mybatis实例。</section></li></ul>
<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;">参考项目：https://github.com/YHYR/Mybatis</p>
</section>`
    };
  },
  method: {}
};
</script>
