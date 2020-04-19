<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        ><img
          src="https://ossweb-img.qq.com/upload/adw/image/20200324/71ca15b117ea503f20141296b1861092.jpeg"
          alt=""
          class="w-100"
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://ossweb-img.qq.com/upload/adw/image/20200324/71ca15b117ea503f20141296b1861092.jpeg"
          alt=""
          class="w-100"
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://ossweb-img.qq.com/upload/adw/image/20200324/71ca15b117ea503f20141296b1861092.jpeg"
          alt=""
          class="w-100"
      /></swiper-slide>
      <div class="swiper-pagination px-3 pb-1" slot="pagination"></div>
    </swiper>

    <!-- 图标导航 -->
    <div class="nav-icons"></div>
    <!-- card -->
    <list-card icon="menu" :title="'新闻资讯'" :catsData="newsData">
      <!--父组件不需要子组件的布局，但是需要子组件的数据 -->
      <template #default="{  items:newsCat }">
        <router-link
          tag="div"
          :to="`/article/${item._id}`"
          class="d-flex py-2"
          v-for="(item, index) in newsCat.newsList"
          :key="index"
        >
          <span class="text-info text-center" style="width:40px;"
            >[{{ item.categoryName }}]</span
          >
          <span class="">|</span>
          <span class="text-ellipsis pr-2">{{ item.title }}</span>
          <span class="text-gray" style="margin-left:auto;">{{
            item.createdAt | formatDate
          }}</span>
        </router-link>
      </template>
    </list-card>

    <list-card icon="card-hero" :title="'英雄列表'" :catsData="heroList">
      <!--父组件不需要子组件的布局，但是需要子组件的数据 -->
      <!-- todo flex 布局最后一行左对齐的方案 -->
      <template #default="{  items:heroCat }">
        <div class="d-flex flex-wrap jc-between">
          <router-link
            tag="div"
            class="py-2 text-center"
            style="width:19%;"
            v-for="(item, index) in heroCat.heroList"
            :to="`/hero/${item._id}`"
            :key="index"
          >
            <img :src="item.icon" alt="" width="100%" />
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs'
export default {
  name: 'Home',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newsData: [],
      heroList: []
    }
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    this.fetchNewsCat()
    this.fetchHeroCat()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    async fetchNewsCat() {
      const res = await this.$http.get('/news/list')
      this.newsData = res.data
    },
    async fetchHeroCat() {
      const res = await this.$http.get('/heros/list')
      this.heroList = res.data
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/styles/variables.scss';
.swiper-pagination {
  text-align: right;
  .swiper-pagination-bullet {
    background: map-get($colors, 'white');
  }
}
</style>
