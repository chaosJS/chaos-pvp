<template>
  <div class="page-hero">
    <div
      class="top"
      :style="{
        'background-image': `url(${heroInfo.banner})`
      }"
    >
      <div class="info text-white p-2 h-100 d-flex flex-column jc-end">
        <p>{{ heroInfo.title }}</p>
        <p>{{ heroInfo.name }}</p>
        <p>
          {{
            heroInfo.categories &&
              heroInfo.categories.map(v => v.name).join('/')
          }}
        </p>

        <p>
          <span>
            难度
            {{ heroInfo.scores && heroInfo.scores.difficult }}
          </span>
          <span>
            技能
            {{ heroInfo.scores && heroInfo.scores.skills }}
          </span>
          <span>
            攻击
            {{ heroInfo.scores && heroInfo.scores.attack }}
          </span>
          <span>
            生存
            {{ heroInfo.scores && heroInfo.scores.survive }}
          </span>
        </p>
      </div>
    </div>

    <div>
      <ul class="skills-icon p-2 d-flex flex-wrap jc-around">
        <li
          v-for="(item, index) in heroInfo.skills"
          :key="index"
          :class="activeSkillIndex === index ? 'active' : ''"
          @click="handleSkillChange(index)"
        >
          <img :src="item.icon" alt="" />
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in heroInfo.skills" :key="index">
          <template v-if="index === activeSkillIndex">
            <div class="p-2">
              <p class="py-2">
                {{ item.name }}
                <span>{{ item.tips }}</span>
              </p>
              <p>
                {{ item.desc }}
              </p>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      heroInfo: {},
      activeSkillIndex: 0
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchHero(this.id)
  },
  methods: {
    handleSkillChange(index) {
      this.activeSkillIndex = index
    },
    async fetchHero(id) {
      const res = await this.$http.get(`/hero/${id}`)
      this.heroInfo = res.data
    }
  }
}
</script>

<style lang="scss">
.page-hero {
  .top {
    height: 16.666667rem;
    background: #fff no-repeat top center;
    background-size: cover;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .skills-icon {
    img {
      width: 5.416667rem;
      height: 5.416667rem;
      border-radius: 50%;
      border: 2px solid transparent;
    }
    > li {
      &.active {
        img {
          border: 2px solid #d59b40;
        }
      }
    }
  }
}
</style>
