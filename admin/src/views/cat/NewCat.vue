<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form :model="form" class="demo-form-inline" label-position="right" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.parent" placeholder="请选择上级分类">
          <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="form.name" placeholder="分类名称" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{id?'修改':'提交'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    id: String
  },
  created() {
    this.id && this.fetchCatInfo(this.id);
    this.fetchParentOptions();
  },
  data() {
    return {
      form: {
        parent: "",
        name: ""
      },
      options: []
    };
  },
  // watch: {
  //   $route(to, from) {
  //     // 对路由变化作出响应...
  //     if (to.name === "new-cat") {
  //       this.form.name = "";
  //       this.form.parent = "";
  //     }
  //   }
  // },
  methods: {
    async fetchParentOptions() {
      // const { data } = await this.$http.get("/rest/categories/parents");
      const { data } = await this.$http.get("/rest/categories");
      this.options = data;
    },
    async fetchCatInfo(id) {
      const {
        data: { name, parent }
      } = await this.$http.get(`/rest/categories/${id}`);
      this.form.name = name;
      this.form.parent = parent;
    },
    async onSubmit() {
      let res = null;
      if (this.id) {
        res = await this.$http.put(`/rest/categories/${this.id}`, this.form);
      } else {
        res = await this.$http.post(
          "/rest/categories",
          this.form.parent ? this.form : { name: this.form.name }
        );
      }

      this.$router.push("/admin/categories/list");
      this.$message({
        type: "success",
        message: `${res.status}，${this.id ? "修改成功" : "保存成功"} `
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>
