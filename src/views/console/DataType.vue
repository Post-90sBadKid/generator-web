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
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="dbType" label="数据库类型"></el-table-column>
          <el-table-column prop="javaType" label="JAVA类型"></el-table-column>
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
        <el-form-item label="数据库类型" prop="dbType">
          <el-input v-model="form.dbType" placeholder="VARCHAR"></el-input>
        </el-form-item>
        <el-form-item label="JAVA类型" prop="javaType">
          <el-input v-model="form.javaType" placeholder="String"></el-input>
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
  findDataTypeList,
  addDataType,
  updateDataType,
  removeDataType,
} from "@/api/console/dataType";

export default {
  data() {
    return {
      tableData: [],
      formsearch: { pollName: "", dbType: "" },
      form: {
        id: "",
        searchValue: "",
        dbType: "",
        javaType: "",
      },
      isUpdate: false,
      pageNum: 1,
      pageSize:10,
      total: 0,
      dialogVisible: false,
      rules: {
        dbType: [
          { required: true, message: "请填写数据库类型", trigger: "blur" },
        ],
        javaType: [
          { required: true, message: "请填写JAVA类型", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.formsearch.pageNum = this.pageNum;
      this.formsearch.pageSize = this.pageSize;
      findDataTypeList(this.formsearch).then((res) => {
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
      removeDataType(id).then((res) => {
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
            addDataType(this.form).then((res) => {
              Message({
                message: res.msg,
                type: "success",
                duration: 1 * 1000,
              });
              this.fetchData();
            });
          } else {
            updateDataType(this.form).then((res) => {
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

