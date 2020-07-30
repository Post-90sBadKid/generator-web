<template>
  <div>
    <el-card class="box-card" style="min-height:600px">
      <!-- <div slot="header" class="clearfix"></div> -->
      <el-row>
        <el-form :inline="true" :model="formsearch" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formsearch.searchValue" @change="fetchData" placeholder="搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="fetchData" plain>查询</el-button>
            <el-button type="primary" @click="dialogVisible = true" plain>添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="mainPath" label="项目路径"></el-table-column>
          <el-table-column prop="packageName" label="项目名称"></el-table-column>
          <el-table-column prop="moduleName" label="模块名称"></el-table-column>
          <el-table-column prop="author" label="作者"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="tablePrefix" label="去除表前缀"></el-table-column>
          <el-table-column prop="name" label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" plain @click="handleRemove(scope.row.id)">删除</el-button>
              <el-button size="mini" type="warning" plain @click="handleUpdate(scope.row)">修改</el-button>
            </template>
          </el-table-column>
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
    <el-dialog title :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px">
        <el-form-item label="项目路径" prop="mainPath">
          <el-input v-model="form.mainPath" placeholder="com.example"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="packageName">
          <el-input v-model="form.packageName" placeholder="demo"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="form.moduleName" placeholder="log"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="Mr.Wang"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="wry10150@163.com"></el-input>
        </el-form-item>
        <el-form-item label="去除表前缀">
          <el-input v-model="form.tablePrefix" placeholder="sys_,table_"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleResetForm('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { MessageBox, Message } from "element-ui";
import {
  findProjectInfoList,
  addProjectInfo,
  updateProjectInfo,
  removeProjectInfo,
} from "@/api/console/projectInfo";

export default {
  data() {
    return {
      tableData: [],
      templateList: [],
      formsearch: { pollName: "", dbType: "" },
      form: {
        id: "",
        searchValue: "",
        mainPath: "",
        packageName: "",
        moduleName: "",
        author: "",
        email: "",
        tablePrefix: "",
      },
      isUpdate: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      rules: {
        mainPath: [
          { required: true, message: "请填写项目路径", trigger: "blur" },
        ],
        moduleName: [
          { required: true, message: "请填写模块名称", trigger: "blur" },
        ],
        author: [{ required: true, message: "请填写作者", trigger: "blur" }],
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.fetchData();

  },
  methods: {
    fetchData() {
      this.formsearch.pollName = "default";
      this.formsearch.dbType = "default";
      this.formsearch.pageNum = this.pageNum;
      this.formsearch.pageSize = this.pageSize;
      findProjectInfoList(this.formsearch).then((res) => {
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
    handleRemove(id) {
      removeProjectInfo(id).then((res) => {
        Message({
          message: res.msg,
          type: "success",
          duration: 1 * 1000,
        });
        this.fetchData();
      });
    },
    handleUpdate(obj) {
      let searchValue = this.form.searchValue;
      this.form = obj;
      this.form.searchValue = searchValue;
      this.isUpdate = true;
      this.dialogVisible = true;
    },
    handleSubmitForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isUpdate) {
            addProjectInfo(this.form).then((res) => {
              Message({
                message: res.msg,
                type: "success",
                duration: 1 * 1000,
              });
              this.fetchData();
            });
          } else {
            updateProjectInfo(this.form).then((res) => {
              Message({
                message: res.msg,
                type: "success",
                duration: 1 * 1000,
              });
              this.fetchData();
              this.isUpdate = false;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleResetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

