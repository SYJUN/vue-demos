<template>
  <div>
    <div v-show="istableDataShowOrHidden">
      <template>
        <div class="button-top">
          <el-button type="primary" icon="el-icon-plus" @click="addUserBtn"
            >添加用户</el-button
          >
        </div>
        <el-table :data="tableUserData" stripe style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="id">
            <template slot-scope="scope">{{ scope.row.ID }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="jobName" label="职位"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="openId" label="openId"> </el-table-column>
          <el-table-column label="操作">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              circle
              title="编辑用户"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              title="删除用户"
            ></el-button>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 添加用户的窗口 -->
    <div v-show="isAddUserShowOrHidden" class="addUser">
      <div class="addUser-border">
        <h1><i class="el-icon-plus"></i>添加用户</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="jobName">
            <el-input v-model="ruleForm.jobName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
           <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-sure-back">
          <el-button type="primary" @click="saveUserBtn">保存</el-button>
          <el-button type="info" @click="backBtn('ruleForm')">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      istableDataShowOrHidden: true,
      isAddUserShowOrHidden: false,
      tableUserData: [],
      ruleForm:{
        name: '',
        jobName: '',
        sex: 1,
        phone: '',
      },
      rules:{
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        jobName: [
            { required: true, message: '请输入职位', trigger: 'blur' },
        ],
        sex: [
            { required: true, message: '请选择性别', trigger: 'change' },
        ],
        phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
        ]
      }

    };
  },

  methods: {
    // 获取所有用户
    listAllUser() {
      this.$http.get('/api/staff/listAll').then( res => {
      })
    },
    // 添加用户
    addUserBtn() {
      this.istableDataShowOrHidden = false;
      this.isAddUserShowOrHidden = true;
    },
    // 返回
    backBtn(formName) {
      this.istableDataShowOrHidden = true;
      this.isAddUserShowOrHidden = false;
      this.$refs[formName].resetFields();
    },
    // 保存
    saveUserBtn() {}
  },
  mounted() {
    this.listAllUser();
  }
};
</script>

<style lang="scss" scoped>
.button-top {
  margin-bottom: 10px;
}
.button-sure-back {
  margin: 10px 20px;
}
.addUser {
  background-color: #fff;
  padding: 20px;
  .addUser-border {
    border: 1px solid #ededed;
    h1 {
      font-size: 16px;
      margin: 0;
      padding: 0 20px;
      background-color: #ededed;
    }
  }
}
.ruleForm{
  width: 600px;
  margin: 20px 0;
}
</style>
