<template>
  <div class="custom-field-container">
    <div class="title">自定义表单项</div>
    
    <div class="content">
      <el-checkbox-group class="checkbox-group-box" v-model="checkList">
        <el-checkbox class="checkbox-item" v-for="item in allFields" :label="item.label"></el-checkbox>
      </el-checkbox-group>
    </div>
    
    <div class="btns">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
      <el-button @click="onReset">恢复默认</el-button>
    </div>
  </div>
</template>

<script>
  import * as _ from 'lodash';

  export default {
    name: 'batch-user-custom-field',
    
    props: {
      action: {
        type: String,
        default: 'create',
      },
      defaultCheckList: {
        type: Array,
        default: [],
      },
    },
    
    data() {
      return {
        checkList: [],
        allFields: [],
      };
    },
    
    methods: {
      /**
       * 保存
       */
      onSave() {
        const checkFields = _.filter(this.allFields, field => _.includes(this.checkList, field.label));
        this.$emit('save', checkFields);
      },
  
      /**
       * 取消
       */
      onCancel() {
        this.$emit('cancel');
      },
  
      /**
       * 恢复默认
       */
      onReset() {
        this.$emit('reset');
      },
      
      _initCheckList() {
        if (this.action === 'create') {
          this.allFields = [
            { prop: 'ownDepartment', label: '所属部门', width: '140px', type: 'select', clearable: false },
            { prop: 'email', label: '邮箱', width: '120px', type: 'input' },
            { prop: 'sex', label: '性别', width: '180px', type: 'radio' },
            { prop: 'rootCodeAccount', label: '源代码账号', width: '120px', type: 'input' },
            { prop: 'dateOfEntry', label: '入职日期', width: '120px', type: 'input' },
  
            { prop: 'skype', label: 'Skype', width: '120px', type: 'input' },
            { prop: 'qq', label: 'QQ', width: '120px', type: 'input' },
            { prop: 'dingding', label: '钉钉', width: '120px', type: 'input' },
            { prop: 'weixin', label: '微信', width: '120px', type: 'input' },
            { prop: 'phone', label: '手机', width: '120px', type: 'input' },
            { prop: 'slack', label: 'Slack', width: '120px', type: 'input' },
            { prop: 'whatsApp', label: 'WhatsApp', width: '120px', type: 'input' },
            { prop: 'tel', label: '电话', width: '120px', type: 'input' },
            { prop: 'address', label: '通讯地址', width: '120px', type: 'input' },
            { prop: 'postcode', label: '邮编', width: '120px', type: 'input' },
          ];
        } else if (this.action === 'edit') {
          this.allFields = [
            { prop: 'ownDepartment', label: '所属部门', width: '140px', type: 'select', clearable: false },
            { prop: 'email', label: '邮箱', width: '120px', type: 'input' },
            { prop: 'rootCodeAccount', label: '源代码账号', width: '120px', type: 'input' },
            { prop: 'skype', label: 'Skype', width: '120px', type: 'input' },
            { prop: 'qq', label: 'QQ', width: '120px', type: 'input' },
            { prop: 'dingding', label: '钉钉', width: '120px', type: 'input' },
            { prop: 'weixin', label: '微信', width: '120px', type: 'input' },
            { prop: 'phone', label: '手机', width: '120px', type: 'input' },
            { prop: 'slack', label: 'Slack', width: '120px', type: 'input' },
            { prop: 'whatsApp', label: 'WhatsApp', width: '120px', type: 'input' },
            { prop: 'tel', label: '电话', width: '120px', type: 'input' },
            { prop: 'address', label: '通讯地址', width: '120px', type: 'input' },
            { prop: 'postcode', label: '邮编', width: '120px', type: 'input' },
          ];
        }
      },
  
      /**
       * 选中默认字段
       * @private
       */
      _processCheckDefaultFields() {
        if (this.defaultCheckList) {
          this.checkList = _.map(this.defaultCheckList, item => item.label);
        }
      },
    },
    
    created() {
      this._initCheckList();
      this._processCheckDefaultFields();
    }
  }
</script>

<style lang="scss" scoped>
  .custom-field-container {
    width: 100%;
    
    .title {
      font-size: 14px;
    }
    
    .content {
      padding: 5px 0;
      
      .checkbox-group-box {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 3px;
      }
      
      .checkbox-item {
        flex: 0 1 auto;
        width: 50%;
        margin: 3px 0;
        font-size: 12px;
      }
    }
    
    .btns {
    
    }
  }
</style>