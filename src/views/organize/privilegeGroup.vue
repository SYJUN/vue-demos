<template>
  <div class="container">
     <div class="button-top">
        <el-button type="primary" @click="assignAuthority()"
            >按模块分配权限</el-button
          >
          <el-button type="primary" icon="el-icon-plus" @click="addGroup('0','ruleForm')"
            >新增分组</el-button
          >
        </div>
    <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="编号" width="80px">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="groupName" label="分组名称"> </el-table-column>
          <el-table-column prop="groupDesc" label="分组描述"> </el-table-column>
          <el-table-column prop="userList" label="用户列表"> </el-table-column>
          <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              circle
              title="编辑用户"
              @click="addGroup(scope.row,'ruleForm')"
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
        <el-dialog
          :title="groupTitle"
          :visible.sync="dialogVisible"
          width="30%"
          >
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分组名称" prop="groupName">
              <el-input v-model="ruleForm.groupName"></el-input>
            </el-form-item>
            <el-form-item label="分组描述" prop="groupDesc">
              <el-input type="textarea" v-model="ruleForm.groupDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="groupSure('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        groupTitle:'add',
        tableData: [],
        ruleForm: {
          groupName:'',
          groupDesc:''
        },
        rules:{
          groupName: [
            { required: true, message: '请输入分组名称', trigger: 'blur' },
          ],
        }

      };
    },
    methods: {
      listData() {
        this.tableData = [
          {id: 1, groupName: '项目经理',groupDesc:'项目经理', userList: '王志宇，网址皇冠，哇全球道德和'}
        ]
      },
      // 按模块分配权限
      assignAuthority() {

      },
      // 添加分组
      addGroup(rows,formName) {
        if( this.$refs[formName] != undefined){ 
           this.$refs[formName].resetFields();
        }
        if(rows === '0'){
          this.groupTitle = '新增分组' ;
      
        }else{
          this.groupTitle =rows.groupName+ '> 编辑分组';
          this.ruleForm.groupName = rows.groupName;
          this.ruleForm.groupDesc = rows.groupDesc;
        }
        this.dialogVisible = true;
       
      },
      // 分组的确定按钮
      groupSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log('ruleForm==>',this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
    },
    mounted() {
      this.listData();
    }
  }
</script>

<style lang="scss" scoped>
  .button-top{
    margin-bottom:10px;
  }
</style>