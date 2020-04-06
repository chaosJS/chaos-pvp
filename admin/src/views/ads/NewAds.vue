<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form
      :model="form"
      class="demo-form-inline"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input
          v-model="form.name"
          placeholder="广告名称"
          style="width:200px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" @click="form.items.push({})">{{
          '添加广告'
        }}</el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="12" v-for="(item, index) in form.items" :key="index">
            <el-form-item label="链接">
              <el-input v-model="item.url" placeholder="链接url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="`${$http.defaults.baseURL}/upload`"
                :show-file-list="false"
                :on-success="res => $set(item, 'img', res.url)"
                :headers="genUploadHeaders()"
              >
                <img v-if="item.img" :src="item.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                round
                @click="form.items.splice(index, 1)"
                >{{ '删除广告' }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
import uploadHeaderMixin from '@/minxins/upload-header'
export default {
  components: {},
  props: {
    id: String
  },
  mixins: [uploadHeaderMixin],
  created() {
    this.id && this.fetchCatInfo(this.id)
  },
  data() {
    return {
      form: {
        name: '',
        items: []
      }
    }
  },
  // watch: {
  //   $route(to, from) {
  //     // 对路由变化作出响应...
  //     if (to.name === 'new-ads') {
  //       this.form.name = ''
  //     }
  //   }
  // },
  methods: {
    async fetchCatInfo(id) {
      const res = await this.$http.get(`/rest/ads/${id}`)
      this.form = Object.assign({}, this.from, res.data)
    },
    async onSubmit() {
      let res = null
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.form)
      } else {
        res = await this.$http.post('/rest/ads', this.form)
      }

      this.$router.push('/admin/ads/list')
      this.$message({
        type: 'success',
        message: `${res.status}，${this.id ? '修改成功' : '保存成功'} `
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
