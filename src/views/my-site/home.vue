<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  metaInfo: {
    title: 'home',
  },
  beforeCreate() {
    // 这边的接口用于测试
    // this.$http.get('/api/jp/avlist/202861101/1/?callback=jsonp9').then((res) => {
    //   console.log('movie: ', res);
    // })
  },
}
</script>

<style lang="scss" scoped>

</style>
