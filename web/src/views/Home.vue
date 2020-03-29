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
    <div class="nav-icons">
      
    </div>
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
