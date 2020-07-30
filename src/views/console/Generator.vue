<template>
  <div>
    <el-card class="box-card" style="min-height:600px">
      <!-- <div slot="header" class="clearfix"></div> -->
      <el-row>
        <el-form :inline="true" status-icon :rules="rules" :model="form" class="demo-form-inline">
          <el-row>
            <el-col :span="7">
              <el-form-item label="表名">
                <el-input v-model="form.tableName" @change="fetchData" placeholder="搜索"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="数据源" prop="pollName">
                <el-select v-model="form.pollName" style="width:90%" placeholder="请选择数据源">
                  <el-option
                    v-for="(item,index) in pollNameList"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="数据库" prop="dbType">
                <el-select v-model="form.dbType" style="width:90%" placeholder="请选择数据库">
                  <el-option
                    v-for="(item,index) in dbTypeList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="success" @click="fetchData" plain>查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="项目信息" prop="projectInfoId">
                <el-select v-model="form.projectInfoId" style="width:100%" placeholder="请选择项目信息">
                  <el-option
                    v-for="(item,index) in projectInfoList"
                    :key="index"
                    :label="item.mainPath+'.'+item.packageName+'.'+item.moduleName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="模板" prop="templatePath">
                <el-select v-model="form.templatePath" style="width:100%" placeholder="请选择模板">
                  <el-option
                    v-for="(item,index) in templateList"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="3" :offset="7">
              <el-button type="primary" @click="handleGeneratorCode" plain>生成</el-button>
            </el-col>
          </el-row>
        </el-form>

        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" prop="tableName" width="60" fixed="left"></el-table-column>
          <el-table-column prop="tableName" label="表名"></el-table-column>
          <el-table-column prop="tableComment" label="表备注"></el-table-column>
          <el-table-column prop="engine" label="存储引擎"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
        </el-table>
        <el-col :span="24" class="el-table_footertoolbar">
          <el-pagination
            layout="total, sizes, jumper, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="total"
            style="float:right;"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<script>
import { MessageBox, Message } from "element-ui";
import { findTemplateList } from "@/api/console/template";
import { findProjectInfoList } from "@/api/console/projectInfo";
import { findDataSourceList } from "@/api/console/dataSources";
import { findGeneratorTableList, generatorCode } from "@/api/console/generator";
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      tableData: [],
      templateList: [],
      pollNameList: [],
      projectInfoList: [],
      form: {
        pollName: "",
        dbType: "",
        tables: "",
        tableName: "",
        projectInfoId: 1,
      },
      dbTypeList: [
        { name: "Oracle", value: "oracle" },
        { name: "MySQL", value: "mysql" },
        { name: "SQLServer", value: "sqlserver" },
        { name: "PostgreSQL", value: "postgresql" },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      rules: {
        projectInfoId: [
          { required: true, message: "请选择项目配置信息", trigger: "blur" },
        ],
        templatePath: [
          { required: true, message: "请选择模板", trigger: "blur" },
        ],
        pollName: [
          { required: true, message: "请选择数据源", trigger: "blur" },
        ],
        dbType: [{ required: true, message: "请选择数据库", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // this.fetchData();
    this.fetchTemplate();
    this.fetchProjectInfo();
    this.fetchPollName();
  },
  methods: {
    fetchTemplate() {
      findTemplateList(this.formsearch).then((res) => {
        this.templateList = res.data;
      });
    },
    fetchPollName() {
      findDataSourceList(this.formsearch).then((res) => {
        this.pollNameList = res.data;
      });
    },
    fetchProjectInfo() {
      findProjectInfoList({}).then((res) => {
        this.projectInfoList = res.data.list;
      });
    },
    fetchData() {
      this.form.pageNum = this.pageNum;
      this.form.pageSize = this.pageSize;
      if (!this.form.pollName || this.form.pollName == "master") {
        Message({
          message: "请选择非master的数据源",
          type: "warning",
          duration: 1 * 1000,
        });
        return false;
      }
      findGeneratorTableList(this.form).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      let arr3 = this.multipleSelection.map(function (item, index) {
        return item.tableName;
      });
      this.form.tables = arr3.join(",");
    },
    handleGeneratorCode() {
      if (!this.form.dbType) {
        Message({
          message: "请选择数据库类型",
          type: "warning",
          duration: 1 * 1000,
        });
        return false;
      }
      if (!this.form.projectInfoId) {
        Message({
          message: "请选择项目配置信息",
          type: "warning",
          duration: 1 * 1000,
        });
        return false;
      }
      if (!this.form.templatePath) {
        Message({
          message: "请选择模板",
          type: "warning",
          duration: 1 * 1000,
        });
        return false;
      }
      if (!this.form.tables) {
        Message({
          message: "请选择需要生成代码的表",
          type: "warning",
          duration: 1 * 1000,
        });
        return false;
      }
      generatorCode(this.form).then((res) => {});
    },
  },
};
</script>

<style scope>
.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
}
</style>

