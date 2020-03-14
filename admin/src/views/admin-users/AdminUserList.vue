<template>
  <div>
    <h2>用户列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
      ></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button @click="editCat(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="delCat(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchCat()
  },
  monted() {},
  methods: {
    async fetchCat() {
      const res = await this.$http.get('/rest/admin_users')
      this.tableData = res.data
    },
    async delCat(row) {
      const res = await this.$http.delete(`/rest/admin_users/${row._id}`)
      this.$message({
        type: 'success',
        message: `${res.statusText}，删除成功`
      })
      this.fetchCat()
    },
    editCat({ _id }) {
      this.$router.push(`/admin/admin_users/edit/${_id}`)
    }
  }
}
</script>

<style scoped lang="less"></style>
