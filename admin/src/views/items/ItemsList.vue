<template>
  <div>
    <h2>物品列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="物品名称" width="120"></el-table-column>
      <el-table-column prop="icon" label="物品icon">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt width="120px" height="120px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button @click="editCat(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delCat(scope.row)" type="text" size="small">删除</el-button>
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
    };
  },
  created() {
    this.fetchCat();
  },
  monted() {},
  methods: {
    async fetchCat() {
      const res = await this.$http.get("/rest/items");
      this.tableData = res.data;
    },
    async delCat(row) {
      const res = await this.$http.delete(`/rest/items/${row._id}`);
      this.$message({
        type: "success",
        message: `${res.statusText}，删除成功`
      });
      this.fetchCat();
    },
    editCat({ _id }) {
      this.$router.push(`/admin/items/edit/${_id}`);
    }
  }
};
</script>

<style scoped lang="less">
</style>
