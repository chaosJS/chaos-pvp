<template>
  <x-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        v-for="(item, index) in catsData"
        class="nav-item"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
        :key="index"
      >
        <div class="nav-link ">{{ item.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(item, index) in catsData" :key="index">
          <!-- <div
            class="d-flex py-2"
            v-for="(cItem, cIindex) in item.list"
            :key="cIindex"
          >
            <span>【{{ cItem.catName }}】</span>
            <span>|</span>
            <span>{{ cItem.title }}</span>
            <span>{{ cItem.date }}</span>
          </div> -->
          <!-- 作用域插槽 -->
          <!-- <slot name="items" :items="item"></slot> 具名插槽 -->
          <slot :items="item"></slot>
        </swiper-slide>
        <div class="swiper-pagination px-3 pb-1" slot="pagination"></div>
      </swiper>
    </div>
  </x-card>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    catsData: Array
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style scoped lang="less"></style>
