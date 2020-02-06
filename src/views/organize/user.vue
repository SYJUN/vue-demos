<template>
  <div>
    <template v-show="isDataShowOrHidden">
      <div class="button-top">
        <el-button type="primary" icon="el-icon-plus">添加用户</el-button>
      </div>
      <el-table
        :data="tableUserData"
        stripe
        style="width: 100%"
      >
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
          <el-button type="primary" icon="el-icon-edit-outline" circle  title="编辑用户"></el-button>
          <el-button type="primary" icon="el-icon-delete" circle  title="删除用户"></el-button>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableUserData: [
        {
          ID: "1",
          name: "汪智玉",
          jobName: "研发",
          sex: "女",
          phone: "18255472916",
          openId: "124548797974994wxaaa"
        },
        {
          ID: "1",
          name: "王小虎",
          jobName: "研发",
          sex: "男",
          phone: "18255472916",
          openId: "124548797974994wxaaa"
        },
      ]
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.button-top {
  margin-bottom: 10px;
}
</style>
