<template>
  <div>
    <span>
      <!-- 为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 <slot> 元素的一个 attribute 绑定上去： -->
      <!-- 这个userProps就叫  插槽 prop -->
      <slot name="userxx" :userProps="user">{{ user.lastName }}</slot>
      <!-- <slot :xxxx="article"></slot> -->
      <slot :articleInfoProps="article"></slot>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: {
        firstName: 'chaos',
        lastName: 'li',
        foo: 'bar'
      },
      article: {
        title: 'title----lorem',
        content: 'aksdhfkhsdkfh'
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
