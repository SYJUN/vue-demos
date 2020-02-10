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
        <el-table :data="tableUserData" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="id">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="realName" label="姓名"> </el-table-column>
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
        <div class="table-footer" v-show = "isShowTableFooter">
          <el-button  @click="editAllTableBtn">编辑</el-button>
          <el-button  @click="deleteAllTableBtn">删除</el-button>
        </div>
      </template>
    </div>
    <!-- 添加单个用户的窗口 -->
    <div v-show="isAddUserSOH" class="addUser">
      <div class="addUser-border">
        <h1><i class="el-icon-plus"></i>{{addorEdiTitle}}</h1>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="ruleForm"
        >
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="ruleForm.realName"></el-input>
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
    
    <!-- 批量添加、编辑用户 -->
    <batch-user v-if="isShowBatchUserCom" :action="batchUserAction" :data="batchUserFields" @cancel="onBatchUserBack"  @save="saveUserAllBtn"></batch-user>
  </div>
</template>

<script>
  import * as _ from "lodash";
  import BatchUser from '../../components/batch-user';


export default {
  components: {
    BatchUser,
  },
  data() {
    return {
      istableDataSOH: true,
      isAddUserSOH: false,
      isShowBatchUserCom: false,
      isShowTableFooter: false,
      batchUserAction: 'create',
      addorEdiTitle:'添加用户',
      tableUserData: [],
      ruleForm: {
        realName: "",
        post: "",
        sex: "女",
        phone: "",
        passwd: ""
      },
      rules: {
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        post: [{ required: true, message: "请输入职位", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      editAllTable :[],
      batchUserFields: [],
    };
  },

  methods: {
    // 获取所有用户
    listAllUser() {
      this.tableUserData = [
        {
          id:2,
          realName:'汪智玉',
          post:'职位',
          sex:'女',
          phone:'19234212221',
        },
        {
          id:4,
          realName:'汪智玉',
          post:'职位',
          sex:'女',
          phone:'19234212221',
        },
        {
          id:5,
          realName:'汪智玉',
          post:'职位',
          sex:'女',
          phone:'19234212221',
        }
      ]
      // this.axios.get("/api/staff/listAll").then(res => {
      //   if (res && res.data) {
      //     this.tableUserData = res.data;
      //   }
      // });
    },
    // 添加单个用户
    addUserBtn(row) {
      this.istableDataSOH = false;
      this.isAddUserSOH = true;
      if(row && row.id) {
        this.addorEdiTitle = '编辑用户' ;
         this.ruleForm.realName =row.realName;
         this.ruleForm.sex =row.sex;
         this.ruleForm.post =row.post;
         this.ruleForm.phone =row.phone;
         this.ruleForm.password =row.password;
      }else{
        this.addorEdiTitle = '添加用户' ;
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
         this.axios.get('/api/staff/delete?id=' + row.id). then( res =>{
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
      this.batchUserAction = 'create';
      this.istableDataSOH = false;
      this.isShowBatchUserCom = true;
      this.batchUserFields = [];
    },
    // 批量保存
    saveUserAllBtn(list) {
      const batchData = _.filter(list, function(item) {
        return item.realName && item.phone && item.password;
      });
      
      // 处理表单提交的数据
      const savedData = batchData.map(item => {
        item.realname = item.realName;
        item.passwd = item.password;

        delete item.realName;
        delete item.password;
        return item;
      });
  
      this.axios
        .post("/api/staff/saveAll", savedData)
        .then(res => {
          if (!res.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.listAllUser();
            this.istableDataSOH = true;
            this.isShowBatchUserCom = false;
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
      this.isShowBatchUserCom = false;
    },
    // 获取选中的对象
    handleSelectionChange(val) {
      console.log('val==>', val)
      if(val && val.length > 0){
        this.editAllTable = val;
        this.isShowTableFooter = true;
      }else{
          this.isShowTableFooter = false;
      }
    },
    // 批量编辑
    editAllTableBtn() {
      console.log("this.editAllTable", this.editAllTable)
      if (this.isShowBatchUserCom) return;
      this.isShowBatchUserCom = true;
      this.istableDataSOH = false;
      this.batchUserAction = 'edit';
      this.batchUserFields = this.editAllTable;
    },
    // 批量删除
    deleteAllTableBtn() {
      console.log(this.editAllTable)
       const ids =  _.map(this.editAllTable, item=> {
          return item.id
        })
      console.log(ids.join(','))
       this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.axios.get('/api/staff/delete?id=' + ids.join(',')). then( res =>{
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
.table-footer{
  width: 100%;
  padding: 0px 10px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
</style>
