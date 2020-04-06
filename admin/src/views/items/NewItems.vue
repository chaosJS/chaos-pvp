<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form
      :model="form"
      class="demo-form-inline"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="物品名称">
        <el-input
          v-model="form.name"
          placeholder="物品名称"
          style="width:200px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="`${$http.defaults.baseURL}/upload`"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :headers="genUploadHeaders()"
        >
          <img v-if="form.icon" :src="form.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          id ? '修改' : '保存'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadHeaderMixin from '@/minxins/upload-header'
export default {
  components: {},
  props: {
    id: String
  },
  mixins: [uploadHeaderMixin],
  created() {
    this.id && this.fetchCatInfo(this.id)
    // this.fetchParentOptions();
  },
  data() {
    return {
      form: {
        // parent: "",
        name: '',
        icon: ''
      },
      options: []
    }
  },
  // watch: {
  //   $route(to, from) {
  //     // 对路由变化作出响应...
  //     // if (to.name === "new-cat") {
  //     this.form.name = ''
  //     this.form.icon = ''
  //     // }
  //   }
  // },
  methods: {
    // async fetchParentOptions() {
    //   // const { data } = await this.$http.get("/rest/categories/parents");
    //   const { data } = await this.$http.get("/rest/items");
    //   this.options = data;
    // },
    handleUploadSuccess(res) {
      console.log('uploadImgRes::', res)
      this.form.icon = res.url
    },
    async fetchCatInfo(id) {
      const {
        data: { name, icon }
      } = await this.$http.get(`/rest/items/${id}`)
      this.form.name = name
      this.form.icon = icon
    },
    async onSubmit() {
      let res = null
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.form)
      } else {
        res = await this.$http.post('/rest/items', this.form)
      }

      this.$router.push('/admin/items/list')
      this.$message({
        type: 'success',
        message: `${res.status}，${this.id ? '修改成功' : '保存成功'} `
      })
    }
  }
}
</script>

<style lang="less"></style>
