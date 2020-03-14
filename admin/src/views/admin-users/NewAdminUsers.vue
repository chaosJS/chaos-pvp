<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
    <el-form
      :model="form"
      class="demo-form-inline"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="form.userName"
          placeholder="用户名"
          style="width:500px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          show-password
          v-model="form.password"
          placeholder="密码"
          style="width:500px;"
        ></el-input>
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
export default {
  props: {
    id: String
  },
  created() {
    this.id && this.fetchCatInfo(this.id)
  },
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (to.name === 'new-users') {
        this.form.userName = ''
        this.form.password = ''
      }
    }
  },
  methods: {
    async fetchCatInfo(id) {
      const {
        data: { userName, password }
      } = await this.$http.get(`/rest/admin_users/${id}`)
      this.form.userName = userName
      this.form.password = password
    },
    async onSubmit() {
      let res = null
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.form)
      } else {
        res = await this.$http.post('/rest/admin_users', this.form)
      }

      this.$router.push('/admin/admin_users/list')
      this.$message({
        type: 'success',
        message: `${res.status}，${this.id ? '修改成功' : '保存成功'} `
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
