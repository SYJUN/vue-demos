<template>
  <div class="container">
     <div class="button-top">
        <el-button type="info" @click="assignAuthority()"
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
              title="编辑分组"
              @click="addGroup(scope.row,'ruleForm')"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-s-custom"
              circle
              title="成员维护"
              @click="memberMaintenance(scope.row,'ruleForm')"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              title="删除分组"
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

        <el-dialog title="权限维护" :visible.sync="dialogVisible2" width="50%" >
         <div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <h5>模块</h5>
                  <el-card class="box-card">
                    <div v-for="(item,index) in provilageDataList" :key="index" @click="onFirstModule(item)" class="text item" :class="item.selected?'blue-selected':''">
                      {{item.moduleName }}
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <h5>方法</h5>
                  <el-card class="box-card">
                    <div v-for="item in provilageDataList" :key="item.id">
                      <div v-if="item.selected">
                        <div v-for="sub in item.methodsDataList" :key="sub.id" class="text item" @click="onSecondMethods(sub)" :class="sub.selected?'blue-selected':''">
                          {{sub.methodsName}}
                        </div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <h5>权限分组</h5>
                    <el-card class="box-card">
                      <div v-for="(item,index) in tableData" :key="index" class="text item" @click="onThirdPrivilage(item,index)" :class="{'blue-selected':keyIndex===index}"> 
                        {{ item.groupName }}
                      </div>
                    </el-card>
                </div>
              </el-col>
            </el-row>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 成员维护 -->
        <el-dialog
          :title="memberTitle"
          :visible.sync="dialogVisible3"
          width="60%"
          >
          <el-form label-width="80px">
              <el-form-item label="组内用户" v-if="groupForm.isGroupData.length>0">
                <el-checkbox :indeterminate="groupForm.isIndeterminate" v-model="groupForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="groupForm.checkdGroupData" @change="handleCheckedChange">
                  <el-checkbox v-for="item in groupForm.isGroupData" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="组外用户" v-if="outOfGroupForm.isGroupData.length>0">
                <el-checkbox :indeterminate="outOfGroupForm.isIndeterminate" v-model="outOfGroupForm.checkAll" @change="handleCheckAllOutChange">全选</el-checkbox>
                <el-checkbox-group v-model="outOfGroupForm.checkdGroupData" @change="handleCheckedOutChange">
                  <el-checkbox v-for="item in outOfGroupForm.isGroupData" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        groupTitle:'add',
        memberTitle:'',
        keyIndex:'',
        tableData: [],
        // 权限维护
        provilageDataList:[
          { 
            id: 1, 
            moduleName: '首页',
            selected: true,
            methodsDataList: [
              { id:11, methodsName: '首页首页首页' , selected: false,},
            ]
          },
          { 
            id: 2, 
            moduleName: '我的地盘',
            selected: false,
            methodsDataList: [
              { id:21, methodsName: '首页', selected: false},
              { id:22, methodsName: '我的待办',selected: false,},
              { id:23, methodsName: '我的任务', selected: false},
              { id:24, methodsName: '我的Bug', selected: false},
              { id:25, methodsName: '我的版本', selected: false},
              { id:26, methodsName: '我的用例', selected: false},
              { id:27, methodsName: '我的需求', selected: false},
            ]
          },
          { 
            id: 3, 
            moduleName: '待办',
            selected: false,
            methodsDataList: [
              { id:31, methodsName: '添加待办', selected: false},
              { id:32, methodsName: '批量添加', selected: false},
              { id:33, methodsName: '编辑待办', selected: false},
              { id:34, methodsName: '批量编辑', selected: false},
              { id:35, methodsName: '待办详情', selected: false},
              { id:36, methodsName: '删除待办', selected: false},
              { id:37, methodsName: '导出待办', selected: false},
            ]
          }
        ],
        ruleForm: {
          groupName:'',
          groupDesc:''
        },
        rules:{
          groupName: [
            { required: true, message: '请输入分组名称', trigger: 'blur' },
          ],
        },
        groupForm:{
            isIndeterminate: false,
            checkAll:true,
            isGroupData:[],
            checkdGroupData:[]
        },
        outOfGroupForm:{
            isIndeterminate: false,
            checkAll:false,
            isGroupData:[],
            checkdGroupData:[]
        },
      };
    },
    methods: {
      listData() {
        this.tableData = [
          {id: 1, groupName: '项目经理',groupDesc:'项目经理', userList: '王志宇,网址皇冠,哇全球道德和', outOfGroupUser:['王志宇','小王']},
          {id: 2, groupName: '测试',groupDesc:'测试', userList: ' 往后这样',outOfGroupUser:['王志宇2','小王2']}
        ]
      },
      // 按模块分配权限
      assignAuthority() {
        this.dialogVisible2 = true;
        this.provilageDataList.forEach((item,index) => {
            item.selected = index === 0
            item.methodsDataList.forEach (sub=>{
             sub.selected = false
           })
        });
        this.keyIndex = '';
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

      onFirstModule(currentItem) {
        this.provilageDataList.forEach(item => {
            item.selected = item.id === currentItem.id;
            item.methodsDataList.forEach (sub=>{
             sub.selected = false;
           })
        });
      },
      onSecondMethods(currentItem){
         this.provilageDataList.forEach(item => {
           item.methodsDataList.forEach (sub=>{
             sub.selected = sub.id === currentItem.id;
           })
          
        });
      },
      onThirdPrivilage(currentItem,index){
        this.keyIndex = index
      },

      // 成员维护
      memberMaintenance(row) {
        console.log(row)
        this.dialogVisible3 = true;
        this.memberTitle = row.groupName
        if(row && row.userList) {
          this.groupForm.checkdGroupData = this.groupForm.isGroupData = row.userList.split(',')
          console.log(this.groupForm.checkdGroupData)
        }
        if(row && row.outOfGroupUser) {
          this.outOfGroupForm.isGroupData = row.outOfGroupUser
          console.log(this.outOfGroupForm.checkdGroupData)
        }
      },
      handleCheckedChange(value){
        console.log('value==>', value)
        let checkedCount = value.length;
        this.groupForm.checkAll = checkedCount == this.groupForm.isGroupData.length;
        this.groupForm.isIndeterminate = checkedCount > 0 && checkedCount < this.groupForm.isGroupData.length;
      },
      handleCheckAllChange(val) {
        console.log('val==>', val)
        this.groupForm.checkdGroupData = val ? this.groupForm.isGroupData : [];
        this.groupForm.isIndeterminate = false;
      },
      handleCheckedOutChange(value){
        console.log('value==>', value)
        let checkedCount = value.length;
        this.outOfGroupForm.checkAll = checkedCount == this.outOfGroupForm.isGroupData.length;
        this.outOfGroupForm.isIndeterminate = checkedCount > 0 && checkedCount < this.outOfGroupForm.isGroupData.length;
      },
      handleCheckAllOutChange(val) {
        console.log('val==>', val)
        this.outOfGroupForm.checkdGroupData = val ? this.outOfGroupForm.isGroupData : [];
        this.outOfGroupForm.isIndeterminate = false;
      }
      
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
  .grid-content{
    & .box-card{
      max-height:300px;
      overflow-y:auto;
    }
    & h5{
      margin:0;
      padding:0;
      font-size:16px;
      line-height:30px;
      text-align:center;
    }
    & .text{
      padding:4px 10px;
      cursor:pointer;
    }
    & .blue-selected {
      background-color:#5692ff;
      color:#fff;
    }
  }
</style>