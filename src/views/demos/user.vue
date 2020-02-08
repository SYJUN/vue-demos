<template>
  <div class="demos-user">
    <div class="top-btn">
      <el-button type="primary" icon="el-icon-plus" @click="onBatchCreateUsers">批量添加用户</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onCreateUser">添加用户</el-button>
      <el-button icon="el-icon-edit" @click="onBatchUserEdit">编辑</el-button>
    </div>
    
    <batch-user v-if="show" :action="batchUserAction" :data="batchUserFields" @cancel="onBatchUserBack" @save="onBatchUserSave"></batch-user>
  </div>
</template>

<script>
  import BatchUser from '../../components/batch-user';
  
  export default {
    components: {
      BatchUser,
    },
    data() {
      return {
        show: false,
        batchUserAction: 'create',
        batchUserFields: [],
      };
    },
    methods: {
      /**
       * 批量添加用户
       */
      onBatchCreateUsers() {
        this.batchUserAction = 'create';
        this.batchUserFields = [];
        this.show = true;
      },
  
      /**
       * 单个添加用户
       */
      onCreateUser() {
      
      },
  
      /**
       * 批量编辑
       */
      onBatchUserEdit() {
        if (this.show) return;
        this.show = true;
        this.batchUserAction = 'edit';
        this.batchUserFields = [
          { id: 1, userName: 'shinn1', realName: '焰1', sex: '男', post: '前端开发工程师' },
          { id: 2, userName: 'Tom', realName: 'Tom', sex: '男', post: '后端开发工程师' },
          { id: 3, userName: 'Alice', realName: 'Alice', sex: '女', post: '测试' },
        ];
      },
  
      /**
       * 批量操作返回回调
       */
      onBatchUserBack() {
        this.show = false;
      },
  
      /**
       * 批量操作保存
       * @param list
       */
      onBatchUserSave(list) {
        console.log(list);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .demos-user {
    /*margin-top: 10px;*/
  }
  
  .top-btn {
    margin-bottom: 10px;
  }
</style>