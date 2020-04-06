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
      <template #default="{  items:newsList }">
        <!-- {{ newsList }} -->
        <div
          class="d-flex py-2"
          v-for="(item, index) in newsList.list"
          :key="index"
        >
          <span>【{{ item.catName }}】</span>
          <span>|</span>
          <span>{{ item.title }}</span>
          <span>{{ item.date }}</span>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newsData: [
        {
          name: '热门',
          list: new Array(5).fill({}).map((item, index) => ({
            catName: '热门',
            title: `王者大陆第一学院【楼下】档案${index}`,
            date: '06/02'
          }))
        },
        {
          name: '新闻',
          list: new Array(5).fill({}).map((item, index) => ({
            catName: '新闻',
            title: `王者大陆第一学院【楼下】档案${index}`,
            date: '06/03'
          }))
        },
        {
          name: '公告',
          list: new Array(5).fill({}).map((item, index) => ({
            catName: '公告',
            title: `王者大陆第一学院【楼下】档案${index}`,
            date: '06/04'
          }))
        }
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {}
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
