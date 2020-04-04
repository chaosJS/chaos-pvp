<template>
  <div class="card bg-white mt-3 p-3">
    <div class="card-header  d-flex ai-center pb-2">
      <i :class="['iconfont', `icon-${icon}`]"></i>
      <div class="fs-xl flex-grow-1 px-1">{{ title }}</div>
      <i class="iconfont icon-moreread"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String
  },
  components: {},
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.card {
  .card-header {
    border-bottom: 1px solid map-get($colors, gray);
  }
}
</style>
