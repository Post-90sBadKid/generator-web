<template>
  <div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">数据源配置</div> -->
      <el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="index" label="序号"></el-table-column>
              <el-table-column prop="name" label="数据源名称"></el-table-column>
              <el-table-column prop="name" label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.name!='master'"
                    size="mini"
                    type="warning"
                    plain
                    @click="removeDataSourceHandle(scope.row.name)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="14">
            <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px">
              <el-form-item label="数据库类型">
                <el-select
                  v-model="form.dbVersion"
                  style="width: 100%;"
                  @change="dbVersionChangeHandle"
                  placeholder="请选择数据库类型"
                >
                  <el-option label="MySQL8" value="mysql8"></el-option>
                  <el-option label="MySQL5" value="mysql5"></el-option>
                  <el-option label="Oracle" value="oracle"></el-option>
                  <el-option label="SQLServer" value="sqlserver"></el-option>
                  <el-option label="PostgreSQL" value="postgresql"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据源名称" prop="pollName">
                <el-input v-model="form.pollName" placeholder="数据源主键(不可重复)"></el-input>
              </el-form-item>
              <el-form-item label="IP地址">
                <el-col :span="12">
                  <el-form-item prop="ip">
                    <el-input
                      v-model="form.ip"
                      placeholder="IP地址"
                      @blur="getUrlHandle(form.dbVersion)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">:</el-col>
                <el-col :span="11">
                  <el-form-item prop="port">
                    <el-input
                      v-model="form.port"
                      placeholder="端口"
                      @blur="getUrlHandle(form.dbVersion)"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="数据库名称" prop="dbName">
                <el-input
                  v-model="form.dbName"
                  placeholder="数据库名称"
                  @blur="getUrlHandle(form.dbVersion)"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="连接数据用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="form.password"
                  placeholder="连接数据密码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="JDBC驱动" prop="driverClassName">
                <el-input v-model="form.driverClassName" placeholder="连接数据库驱动"></el-input>
              </el-form-item>
              <el-form-item label="URL" prop="url">
                <el-input v-model="form.url" placeholder="连接数据URL" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')" plain>立即创建</el-button>
                <el-button plain @click="resetForm('form')">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>


<script>
import { MessageBox, Message } from 'element-ui'
import {
  findDataSourceList,
  addDataSource,
  removeDataSource
} from "@/api/console/dataSources";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入URL"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      form: {
        driverClassName: "",
        username: "",
        password: "",
        pollName: "",
        url: "",
        dbVersion: "mysql8",
        ip: "127.0.0.1",
        port: "",
        dbName: ""
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        url: [{ required: true, validator: validateUrl, trigger: "blur" }],
        pollName: [
          { required: true, message: "请填写数据源名称", trigger: "blur" }
        ],
        driverClassName: [
          { required: true, message: "请填写连接数据库驱动", trigger: "blur" }
        ],
        ip: [{ required: true, message: "请填写IP", trigger: "blur" }],
        port: [{ required: true, message: "请填写端口", trigger: "blur" }],
        dbName: [{ required: true, message: "请填写数据库", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.dbVersionChangeHandle(this.form.dbVersion);
    this.fetchData();
  },
  methods: {
    getUrlHandle(dbVersion) {
      let dbDriverClassArray = [
        {
          dbType: "mysql",
          dbVersion: "mysql8",
          driverClassName: "com.mysql.cj.jdbc.Driver",
          port: 3306,
          url: `jdbc:mysql://${this.form.ip}:${
            this.form.port == "" ? 3306 : this.form.port
          }/${
            this.form.dbName
          }?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai`
        },
        {
          dbType: "mysql",
          dbVersion: "mysql5",
          driverClassName: "com.mysql.jdbc.Driver",
          port: 3306,
          url: `jdbc:mysql://${this.form.ip}:${
            this.form.port == "" ? 3306 : this.form.port
          }/${
            this.form.dbName
          }?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai`
        },
        {
          dbType: "oracle",
          dbVersion: "oracle",
          driverClassName: "oracle.jdbc.OracleDriver",
          port: 1521,
          url: `jdbc:oracle:thin:@${this.form.ip}:${
            this.form.port == "" ? 1521 : this.form.port
          }:${this.form.dbName}`
        },
        {
          dbType: "sqlserver",
          dbVersion: "sqlserver",
          driverClassName: "com.microsoft.sqlserver.jdbc.SQLServerDriver",
          port: 1433,
          url: `jdbc:sqlserver://${this.form.ip}:${
            this.form.port == "" ? 1433 : this.form.port
          };DatabaseName=${this.form.dbName}`
        },
        {
          dbType: "postgresql",
          dbVersion: "postgresql",
          driverClassName: "org.postgresql.Driver",
          port: 5432,
          url: `jdbc:postgresql://${this.form.ip}:${
            this.form.port == "" ? 5423 : this.form.port
          }/${this.form.dbName}`
        }
      ];
      dbDriverClassArray.forEach(item => {
        if (item.dbVersion === dbVersion) {
          this.form.driverClassName = item.driverClassName;
          this.form.port = item.port;
          this.form.url = item.url;
        }
      });
    },
    fetchData() {
      this.tableData = [];
      findDataSourceList().then(res => {
        res.data.forEach((item, index) => {
          this.tableData.push({ index: index + 1, name: item });
        });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addDataSource(this.form).then(res => {
            Message({
              message: res.msg,
              type: "success",
              duration: 1 * 1000
            });
            this.fetchData();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dbVersionChangeHandle(value) {
      console.log(value);
      this.form.port = "";
      this.getUrlHandle(value);
    },
    removeDataSourceHandle(name) {
      removeDataSource(name).then(res => {
        Message({
          message: res.msg,
          type: "success",
          duration: 1 * 1000
        });
        this.fetchData();
      });
    }
  }
};
</script>

<style  scoped>
</style>

