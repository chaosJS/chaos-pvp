<template>
  <div>
    <div class="topbar bg-dark py-1 text-white px-2 d-flex ai-center">
      <img src="@/assets/logo.png" alt="" width="30" />
      <div class="pl-1 ai-stretch flex-grow-1">
        <div class="text-white fs-md">王者荣耀</div>
        <div class="text-grey fs-sm">团队成就更多</div>
      </div>
      <button class="button text-dark bg-primary px-2 py-1">立即下载</button>
    </div>
    <div class="bg-primary py-2">
      <ul class="nav nav-inverse jc-around pt-1  ai-center ">
        <li class="nav-item  active">
          <router-link :to="'/'">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/'">攻略中心</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/'">赛事中心</router-link>
        </li>
      </ul>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
