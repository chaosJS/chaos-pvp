<template>
  <div>
    <el-card header="请先登录" style="width:500px; margin:10em auto;">
      <el-form @submit.native.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post('/login', this.form)
      const { token, user_name } = res.data
      localStorage.token = token
      this.$message({
        type: 'success',
        message: `${user_name}，欢迎登录`
      })
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped lang="sass"></style>
