<template>
  <x-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        v-for="(item, index) in catsData"
        class="nav-item"
        :class="{ active: index === currentIndex }"
        @click="
          () => {
            $refs.listSwiper.$swiper.slideTo(index)
          }
        "
        :key="index"
      >
        <div class="nav-link ">{{ item.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="listSwiper"
        :options="{ autoHeight: true }"
        @slide-change="
          () => {
            currentIndex = $refs.listSwiper.$swiper.realIndex
          }
        "
      >
        <swiper-slide v-for="(item, index) in catsData" :key="index">
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

<style scoped lang="scss"></style>
