<template>
  <div class="batch-user-container">
    <div class="batch-user-top">
      <div class="title">{{ title }}</div>
      <div class="setting-icon">
        <el-popover v-model="visible" placement="bottom-end" width="300" trigger="click">
          <batch-user-custom-field :action="action"
                                   :default-check-list="customFields"
                                   @save="onSettingFieldsSave"
                                   @cancel="onSettingFieldsCancel"></batch-user-custom-field>
          <i slot="reference" class="el-icon-s-tools"></i>
        </el-popover>
      </div>
    </div>
    
    <div class="batch-user-main">
      <el-table :data="list" style="width: 100%;">
        <template v-for="col in allFields">
          <!-- 用户名 -->
          <template v-if="col.prop === 'userName'">
            <el-table-column :prop="col.prop" :label="col.label" min-width="180px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
          </template>
  
          <!-- 真实姓名 -->
          <template v-else-if="col.prop === 'realname'">
            <el-table-column :prop="col.prop" :label="col.label" min-width="180px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.realname" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
          </template>
          
          <!-- 密码 -->
          <template v-else-if="col.prop === 'passwd'">
            <el-table-column :prop="col.prop" :label="col.label" min-width="180px">
              <template slot-scope="scope">
                <el-input type="passwd" v-model="scope.row.passwd" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
          </template>
          
          <!-- 非特殊字段 -->
          <template v-else>
            <el-table-column :prop="col.prop" :label="col.label" :width="col.width">
              <template slot-scope="scope">
                <template v-if="col.type === 'radio'">
                  <el-radio-group v-model="scope.row[col.prop]">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </template>
  
                <template v-else-if="col.type === 'input'">
                  <el-input v-model="scope.row[col.prop]" placeholder="请输入内容"></el-input>
                </template>
  
                <template v-else-if="col.type === 'select'">
                  <el-select v-model="scope.row[col.prop]" filterable :clearable="col.clearable" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                
                <template v-else-if="col.type === 'normal'">
                  <span>{{scope.row[col.prop]}}</span>
                </template>
              </template>
            </el-table-column>
          </template>
          
        </template>
  
      </el-table>
    </div>
    
    <div class="batch-user-footer">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="info" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import BatchUserCustomField from './batch-user-custom-field';

  export default {
    name: 'batch-user',
    
    components: {
      BatchUserCustomField,
    },

    props: {
      action: {
        type: String,
        default: 'create',
      },
      data: {
        type: Array,
        default: [],
      },
    },

    data() {
      return {
        list: [],
        allFields: [],
        systemFields: [],
        customFields: [],
        visible: false,
  
        // test: select field options
        options: [{
          value: '研发',
          label: '研发'
        }, {
          value: '主管',
          label: '主管'
        }, {
          value: '总经理',
          label: '总经理'
        }],
      };
    },

    methods: {
      /**
       * 保存
       */
      onSave() {
        this.$emit('save', this.list);
      },
      
      /**
       * 返回、取消操作
       */
      onCancel(event) {
        this.$emit('cancel', event);
      },
  
      /**
       * 自定义表单项配置保存回调
       */
      onSettingFieldsSave(checkFields) {
        this.visible = false;
        if (_.isArray(checkFields)) {
          this.allFields = [...this.systemFields, ...checkFields];
        }
      },
  
      onSettingFieldsCancel() {
        this.visible = false;
      },
  
      /**
       * 处理后的数据，用于页面渲染
       * @returns {Array}
       */
      _initBatchList() {
        if (this.action === 'create') {
          this.list = this._processBatchCreateList();
        } else if (this.action === 'edit') {
          this.list = this.data;
        }
        return this.list;
      },
      
      /**
       * 初始化批量新增数据
       */
      _processBatchCreateList() {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
          list.push({ realname: '', post: '', sex: '男', phone:'', passwd:'' });
        }
        return list;
      },
      
      /**
       * 处理默认字段
       */
      _processSystemFields() {
        this.systemFields = [
          // { label: '用户名', prop: 'userName', type: 'input' },
          { label: '真实姓名', prop: 'realname', type: 'input' },
          { label: '职位', prop: 'post', width: '120px', type: 'select', clearable: true },
          { label: '手机号', prop: 'phone', type: 'input', clearable: true },
        ];
        
        if (this.action === 'create') {
          this.systemFields.push(
            // { label: '权限分组', prop: 'limit', width: '120px', type: 'select', clearable: true },
            { label: '密码', prop: 'passwd', type: 'inputGroup', clearable: true },
          );
        } else if (this.action === 'edit') {
          this.systemFields.unshift({ label: 'ID', prop: 'id', width: '60px', type: 'normal' });
        }
      },
      
      /**
       * 处理自定义的字段
       */
      _processCustomFields() {
        this.customFields = [
          // { label: '所属部门', prop: 'ownDepartment', width: '180px', type: 'select' },
          // { label: 'QQ', prop: 'qq', width: '180px', type: 'input' },
          // { label: '微信', prop: 'weixin', width: '180px', type: 'input' },
          { label: '性别', prop: 'sex', width: '180px', type: 'radio' },
        ];
      },
    },

    computed: {
      /**
       * 根据操作类型显示对应的 title
       * @returns {string}
       */
      title() {
        switch (this.action) {
          case 'create':
            return '批量添加用户';
          case 'edit':
            return '批量编辑';
        }
        return '批量添加用户';
      },
    },
    
    created() {
      this._processSystemFields();
      this._processCustomFields();
  
      this.allFields = [...this.systemFields, ...this.customFields];
    },
    
    mounted() {
      this._initBatchList();
    },
    
    destroyed() {
    },
  }
</script>

<style lang="scss" scoped>
  .batch-user-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #3c4353;
    border-radius: 5px;
  }
  
  .batch-user-top {
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 34px;
    padding: 5px 20px;
    
    .title {
      float: left;
      font-size: 14px;
      font-weight: bold;
    }
    
    .setting-icon {
      float: right;
      cursor: pointer;
    }
  }
  
  .batch-user-main {
    padding: 12px 20px;
  }
  
  .batch-user-footer {
    padding: 10px 20px;
  }
</style>