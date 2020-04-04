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
    <x-card icon="menu" :title="'新闻资讯'">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link ">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link ">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link ">公告</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <!-- 对应三个nav -->
          <swiper-slide v-for="m in 3" :key="m">
            <div class="d-flex py-2" v-for="(item, index) in 5" :key="index">
              <span>【新闻】</span>
              <span>|</span>
              <span>王者大陆第一学院【楼下】档案</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
          <div class="swiper-pagination px-3 pb-1" slot="pagination"></div>
        </swiper>
      </div>
    </x-card>

    <x-card icon="card-hero" :title="'英雄列表'"> </x-card>
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
      }
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
