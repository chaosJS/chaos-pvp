<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form
      :model="form"
      class="demo-form-inline"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="所属分类">
        <el-select
          v-model="form.categories"
          placeholder="请选择所属分类"
          multiple
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          v-model="form.title"
          placeholder="标题"
          style="width:500px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章内容">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="form.content"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          id ? '修改' : '提交'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: { VueEditor },
  props: {
    id: String
  },
  created() {
    this.id && this.fetchInfo(this.id)
    this.fetchCate()
  },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      categories: []
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.form.title = ''
    }
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)

      this.$http
        .post('/upload', formData)
        .then(result => {
          let url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    },
    async fetchCate() {
      // const { data } = await this.$http.get("/rest/categories/parents");
      const { data } = await this.$http.get('/rest/categories')
      this.categories = data
    },
    async fetchInfo(id) {
      const res = await this.$http.get(`/rest/articles/${id}`)
      this.form = res.data
    },
    async onSubmit() {
      let res = null
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.form)
      } else {
        res = await this.$http.post('/rest/articles', this.form)
      }

      this.$router.push('/admin/articles/list')
      this.$message({
        type: 'success',
        message: `${res.status}，${this.id ? '修改成功' : '保存成功'} `
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
