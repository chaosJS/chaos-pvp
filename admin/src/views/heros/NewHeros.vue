<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form
      v-if="reFresh"
      :model="form"
      ref="heroForm"
      class="demo-form-inline"
      label-position="right"
      label-width="80px"
    >
      <!-- {{ form }} -->
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="英雄名称">
            <el-input
              v-model="form.name"
              placeholder="英雄名称"
              style="width:200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="英雄图标">
            <el-upload
              class="avatar-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :headers="genUploadHeaders()"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="form.icon" :src="form.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="英雄banner">
            <el-upload
              class="avatar-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :show-file-list="false"
              :on-success="res => (form.banner = res.url)"
              :headers="genUploadHeaders()"
            >
              <img v-if="form.banner" :src="form.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input
              v-model="form.title"
              placeholder="英雄称号"
              style="width:200px;"
            ></el-input>
          </el-form-item>

          <el-form-item label="英雄类型">
            <el-select v-model="form.categories" multiple>
              <el-option
                v-for="(item, index) in categories"
                :key="index"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄难度">
            <el-rate
              :max="9"
              show-score
              v-model="form.scores.difficult"
              style="margin-top: .6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="英雄技能">
            <el-rate
              :max="9"
              show-score
              v-model="form.scores.skills"
              style="margin-top: .6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="英雄攻击">
            <el-rate
              :max="9"
              show-score
              v-model="form.scores.attack"
              style="margin-top: .6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="英雄生存">
            <el-rate
              :max="9"
              show-score
              v-model="form.scores.survive"
              style="margin-top: .6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="form.items1" multiple>
              <el-option
                v-for="(item, index) in items"
                :key="index"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="form.items2" multiple>
              <el-option
                v-for="(item, index) in items"
                :key="index"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input
              v-model="form.usageTips"
              placeholder="英雄使用技巧"
              type="textarea"
              :autosize="{ minRows: 3 }"
              style="width:600px;"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="primary" @click="form.skills.push({})">{{
            '添加技能'
          }}</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item, index) in form.skills" :key="index">
              <el-form-item label="技能名称">
                <el-input v-model="item.name" placeholder="技能名称"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="`${$http.defaults.baseURL}/upload`"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :headers="genUploadHeaders()"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input
                  v-model="item.desc"
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  style="width:600px;"
                  placeholder="技能描述"
                ></el-input>
              </el-form-item>

              <el-form-item label="技能提示">
                <el-input
                  v-model="item.tips"
                  placeholder="技能小提示"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  round
                  @click="form.skills.splice(index, 1)"
                  >{{ '删除技能' }}</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="搭档" name="partners">
          <el-button type="primary" @click="form.partners.push({})">{{
            '添加搭档'
          }}</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col
              :md="12"
              v-for="(item, index) in form.partners"
              :key="index"
            >
              <el-form-item label="搭档名称">
                <el-select
                  filterable
                  clearable
                  v-model="item.hero"
                  placeholder="请选择搭档名称"
                >
                  <el-option
                    v-for="item in allHeros"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="item.name" placeholder="搭档名称"></el-input> -->
              </el-form-item>
              <el-form-item label="搭档描述">
                <el-input
                  v-model="item.desc"
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  style="width:600px;"
                  placeholder="搭档描述"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  round
                  @click="form.partners.splice(index, 1)"
                  >{{ '删除搭档' }}</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">{{
          id ? '修改' : '保存'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadHeaderMixin from '@/minxins/upload-header'
export default {
  components: {},
  props: {
    id: String
  },
  mixins: [uploadHeaderMixin],
  created() {
    this.fetchCatAndItemsAndHeros()
    this.id && this.fetchHeroInfo(this.id)
  },
  data() {
    return {
      reFresh: true,
      form: {
        name: '',
        icon: '',
        title: '',
        banner: '',
        categories: [],
        scores: {},
        skills: [],
        partners: []
      },
      categories: [],
      items: [],
      allHeros: []
    }
  },
  methods: {
    async fetchCatAndItemsAndHeros() {
      const res = await this.$http.get(`/rest/categories`)
      const itemsRes = await this.$http.get(`/rest/items`)
      const heroRes = await this.$http.get(`/rest/hero`)
      this.categories = res.data
      this.items = itemsRes.data
      this.allHeros = heroRes.data
    },
    async fetchHeroInfo(id) {
      const res = await this.$http.get(`/rest/heros/${id}`)
      this.form = Object.assign({}, this.form, res.data)
    },
    handleUploadSuccess(res) {
      this.form.icon = res.url
    },

    async onSubmit() {
      let res = null
      if (this.id) {
        res = await this.$http.put(`/rest/heros/${this.id}`, this.form)
      } else {
        res = await this.$http.post('/rest/heros', this.form)
      }

      this.$router.push('/admin/hero/list')
      this.$message({
        type: 'success',
        message: `${res.status}，${this.id ? '修改成功' : '保存成功'} `
      })
    }
  }
}
</script>

<style lang="less"></style>
