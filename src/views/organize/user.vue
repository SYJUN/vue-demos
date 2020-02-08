<template>
  <div>
    <div v-show="istableDataSOH">
      <template>
        <div class="button-top">
          <el-button type="primary" icon="el-icon-plus" @click="addBatchUserBtn"
            >批量添加用户</el-button
          >
          <el-button type="primary" icon="el-icon-plus" @click="addUserBtn()"
            >添加用户</el-button
          >
        </div>
        <el-table :data="tableUserData" stripe style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="id">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="realname" label="姓名"> </el-table-column>
          <el-table-column prop="post" label="职位"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="passwd" label="密码"> </el-table-column>
          <el-table-column prop="openid" label="openid"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              circle
              title="编辑用户"
              @click="addUserBtn(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              title="删除用户"
               @click="deleteUser(scope.row)"
            ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 添加单个用户的窗口 -->
    <div v-show="isAddUserSOH" class="addUser">
      <div class="addUser-border">
        <h1><i class="el-icon-plus"></i>添加用户</h1>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="ruleForm"
        >
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="ruleForm.realname"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="post">
            <el-input v-model="ruleForm.post"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input v-model="ruleForm.passwd"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-sure-back">
          <el-button type="primary" @click="saveUserBtn('ruleForm')"
            >保存</el-button
          >
          <el-button type="info" @click="backBtn('ruleForm')">返回</el-button>
        </div>
      </div>
    </div>
    <!-- 批量添加用户 -->
    <!-- <div v-show="isAddUserBatchSOH">
      <div>
        <el-table :data="addTableData" stripe style="width: 100%">
          <el-table-column prop="realname" label="姓名">
            <template slot-scope="scope"
              ><el-input
                v-model="scope.row.realname"
                placeholder="请输入内容"
              ></el-input
            ></template>
          </el-table-column>
          <el-table-column prop="post" label="职位">
            <template slot-scope="scope"
              ><el-input
                v-model="scope.row.post"
                placeholder="请输入内容"
              ></el-input
            ></template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话">
            <template slot-scope="scope"
              ><el-input
                v-model="scope.row.phone"
                placeholder="请输入内容"
              ></el-input
            ></template>
          </el-table-column>
          <el-table-column prop="passwd" label="密码">
            <template slot-scope="scope"
              ><el-input
                v-model="scope.row.passwd"
                placeholder="请输入内容"
              ></el-input
            ></template>
          </el-table-column>
        </el-table>
        <div class="button-sure-back">
          <el-button type="primary" @click="saveUserAllBtn()">
            保存
          </el-button>
          <el-button type="info" @click="backBatchBtn()">
            返回
          </el-button>
        </div>
      </div>
    </div> -->
    <batch-user v-if="isAddUserBatchSOH" :action="batchUserAction" :data="[]" @cancel="onBatchUserBack"  @save="saveUserAllBtn"></batch-user>
  </div>
</template>

<script>
  import * as _ from "lodash";
  import axios from "axios";
  import BatchUser from '../../components/batch-user';


export default {
  components: {
    BatchUser,
  },
  data() {
    return {
      istableDataSOH: true,
      isAddUserSOH: false,
      isAddUserBatchSOH: false,
      batchUserAction: 'create',
      tableUserData: [],
      addTableData: [],
      ruleForm: {
        realname: "",
        post: "",
        sex: "女",
        phone: "",
        passwd: ""
      },
      rules: {
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        post: [{ required: true, message: "请输入职位", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 获取所有用户
    listAllUser() {
      this.tableUserData = [{
            id:1,
            realname:'汪智玉',
            post:'职位',
            sex:'女',
            
          }]
      // this.$http.get("/api/staff/listAll").then(res => {
      //   if (res && res.data) {
      //     this.tableUserData = res.data;
      //   }
      // });
    },
    // 添加单个用户
    addUserBtn(row) {
      console.log(row)
      this.istableDataSOH = false;
      this.isAddUserSOH = true;
      if(row && row.id) {
         this.ruleForm.realname =row.realname;
         this.ruleForm.sex =row.sex;
         this.ruleForm.post =row.post;
         this.ruleForm.phone =row.phone;
         this.ruleForm.password =row.password;
      }
    },
    // 保存单个用户
    saveUserBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/staff/saveOne", this.ruleForm)
            .then(res => {
              if (!res.data) {
                this.istableDataSOH = true;
                this.isAddUserSOH = false;
                this.$refs[formName].resetFields();
                this.listAllUser();
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    },
    // 返回单个
    backBtn(formName) {
      this.istableDataSOH = true;
      this.isAddUserSOH = false;
      this.$refs[formName].resetFields();
    },
    // 删除单个用户
    deleteUser(row) {
       this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           axios.get('/api/staff/delete?id=' + row.id). then( res =>{
              this.listAllUser();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    // 批量添加用户
    addBatchUserBtn() {
      if (this.addTableData.length < 10) {
        for (let i = 0; i < 10; i++) {
          this.addTableData.push({
            realname: "",
            sex: "女",
            post: "",
            phone: "",
            passwd: ""
          });
        }
      }
      this.batchUserAction = 'create';
      this.istableDataSOH = false;
      this.isAddUserBatchSOH = true;
    },
    // 批量保存
    saveUserAllBtn(list) {
      const batchData = _.filter(list, function(item) {
        return item.realname && item.phone && item.passwd;
      });
      console.log(batchData)
      axios
        .post("/api/staff/saveAll", batchData)
        .then(res => {
          if (!res.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.listAllUser();
            this.resectNum();
            this.istableDataSOH = true;
            this.isAddUserBatchSOH = false;
          } else {
            this.$message({
              message: res.data,
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //  返回批量
    onBatchUserBack() {
      this.istableDataSOH = true;
      this.isAddUserBatchSOH = false;
    },
    // 重置批量添加的值
    resectNum() {
      const emptyEvery = _.each(this.addTableData, function(value) {
        value.realname = "" ;
        value.phone = "" ;
        value.passwd = "" ;
        value.sex = "女" ;
        value.post = "" ;
      });
      this.addTableData = emptyEvery;
    },
    // 批量删除
    deleteBatchUser() {
      
    }
    
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
.ruleForm {
  width: 600px;
  margin: 20px 0;
}
</style>
