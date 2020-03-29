<template>
  <div class="about">
    <h1>具名插槽</h1>
    <hr />
    <base-layout>
      <!--  v-slot 只能添加在 <template> 上 -->
      <!-- `v-slot:` 完全可以简写为 #   只在其有参数的时候才可用-->
      <!-- v-slot 关联同名插槽 -->
      <template #footer>
        <footer>@copyright</footer>
      </template>
      <!-- 任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。 -->
      <p>main content</p>
      <p>asfaf</p>
      <template #header>
        <h1>头部</h1>
      </template>
    </base-layout>
    <hr />
    <h1>作用域插槽</h1>
    <hr />
    <current-user>
      <!-- 在这里可以使用带值的 v-slot 来自定义子组件提供的插槽 prop 的名字： userInfoProps-->
      <template #userxx="userInfoProps">
        {{ userInfoProps }}
      </template>

      <!-- <template #default="articleInfoProps">
        {{ articleInfoProps }}
      </template> -->
      <!-- <template v-slot="articleInfoProps"> -->
      <!-- <template v-slot="{ articleInfoProps }"> -->
      <!-- 重新命名 -->
      <template #default="{ articleInfoProps: articleInfo }">
        {{ articleInfo }}
      </template>
    </current-user>
  </div>
</template>
<script>
import BaseLayout from '@/components/BaseLayout'
import CurrentUser from '@/components/CurrentUser'

export default {
  components: {
    BaseLayout,
    CurrentUser
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less"></style>
