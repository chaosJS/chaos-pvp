<template>
  <div class="page-article">
    <div class="d-flex ai-center px-1 py-3">
      <i class="iconfont icon-fanhui"></i>
      <span class="flex-grow-1">
        {{ articleInfo.title }}
      </span>
      <span>
        2020-10-09
      </span>
    </div>
    <div
      v-html="articleInfo.content || '未编辑'"
      class="article-content px-2 py-1"
    ></div>
    <ul class="px-2">
      <router-link
        tag="li"
        v-for="(item, index) in articleInfo.related"
        :to="`/article/${item._id}`"
        :key="index"
        class="py-1"
      >
        {{ item.title }}
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      articleInfo: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchArticle(this.id)
  },
  methods: {
    async fetchArticle(id) {
      const res = await this.$http.get(`/article/${id}`)
      this.articleInfo = res.data
    }
  }
}
</script>

<style lang="scss">
.article-content {
  img {
    width: 100%;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
