<template>
  <div class="demos-user">
    <div class="top-btn">
      <el-button type="primary" icon="el-icon-plus" @click="onBatchCreateUsers">批量添加用户</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onCreateUser">添加用户</el-button>
    </div>
    
    <batch-user v-if="show" :action="batchUserAction" :data="[]" @cancel="onBatchUserBack"></batch-user>
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
        batchUserData: [],
      };
    },
    methods: {
      /**
       * 批量添加用户
       */
      onBatchCreateUsers() {
        this.batchUserAction = 'create';
        this.show = true;
      },
  
      /**
       * 单个添加用户
       */
      onCreateUser() {
      
      },
  
      /**
       * 批量操作返回
       */
      onBatchUserBack() {
        this.show = false;
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