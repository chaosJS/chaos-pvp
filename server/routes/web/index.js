// 给前端页面的接口
module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const ArticleModel = mongoose.model('Article')
  const CategoryModel = mongoose.model('Category')
  const HeroModel = mongoose.model('Heros')
  // 新建一个临时的接口用来录入初始化新闻数据
  router.get('/news/init', async (req, res) => {
    const newsCat = await CategoryModel.findOne({ name: '新闻分类' })
    // 不加 lean 查出来的是 Mongoose 文档，
    // 加 lean 查询出来的文档是普通的 JavaScript 对象，
    // 从而没有 save 方法，没有 getters 和 setters，因此会有更高的性能。
    const cats = await CategoryModel.find({ parent: newsCat }).lean()

    const newsTitles = [
      '蔡文姬繁星吟游皮肤，史诗升级进行时！',
      '冷艳御姐是如何练成的？参与「镜」主题创作赢荣耀水晶',
      '廉颇重塑计划爆料',
      '正式服预告④丨新版本倒数3天，战场升级计划即将启动',
      '正式服预告③丨新英雄镜即将登场，将军白起优化升级！',
      '4月5日开服及奖励通知',
      '4月4日全服停机更新公告',
      '全国哀悼日停服公告',
      '4月4日体验服停机更新公告',
      '4月3日体验服停机更新公告',
      '【预告】荣耀中国节·轻风戏纸鸢，参与必得纸鸢回城特效（永久）',
      '参与“S19战令集结号”，赢80级直升经验大礼',
      '【镜界诞生 见证觉醒】活动公告',
      'S19赛季来临 多重好礼邀你开启全新赛季',
      '抢先服更新 S19赛季开启',
      'KPL王者荣耀职业联赛4月4日比赛停赛公告',
      '《王者荣耀》城市赛选手看过来！新版本“玄雍危机”热门英雄玩法盘点',
      '【KPL今日预报】武汉ES vs 重庆QG，武汉eStar春季赛首秀能否首胜？',
      '高校联赛解说大赛正式开启报名',
      '【KPL今日预报】WE vs 成都AG超玩会，成都AG能否收获三连胜？'
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        title,
        // 随机取出分类
        categories: randomCats.slice(0, 2)
      }
    })
    // 先全部删除
    await ArticleModel.deleteMany({})
    // 再插入所有的初始化文章数据
    await ArticleModel.insertMany(newsList)
    res.send('ok')
  })
  // 新建一个临时的接口用来录入初始化英雄数据

  // 浏览器直接爬数据的方法
  router.get('/heros/init', async (req, res) => {
    await HeroModel.deleteMany()
    const rawData = require('../../mock/heros.js')
    for (let cat of rawData) {
      if (cat.name === '热门') {
        continue
      }
      const category = await CategoryModel.findOne({ name: cat.name })
      cat.heros = cat.heros.map(hero => {
        hero.categories = [category]
        return hero
      })
      await HeroModel.insertMany(cat.heros)
    }
    res.send(await HeroModel.find())
  })
  // $$('.hero-nav>li').map((item, i) => {
  //   return {
  //     name: item.innerText,
  //     heros: $$('li', $$('.hero-list')[i]).map(el => {
  //       return {
  //         name: $$('h3', el)[0].innerText,

  //         avatar: $$('img', el)[0].src
  //       }
  //     })
  //   }
  // })
  //

  // 展示新闻列表
  router.get('/news/list', async (req, res) => {
    // 以分类为主体，关联分类相关的新闻列表
    // 1. 先找出顶级分类
    // const parentCat = await CategoryModel.findOne({
    //   name: '新闻分类'
    // })
    //   .populate({ path: 'children', populate: { path: 'newsList' } })
    //   .lean()
    const parentCat = await CategoryModel.findOne({
      name: '新闻分类'
    })
    const cats = await CategoryModel.aggregate([
      { $match: { parent: parentCat._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await ArticleModel.find()
        .where({
          categories: { $in: subCats }
        })
        .populate({
          path: 'categories'
        })
        .limit(5)
        .lean()
    })
    cats.map(item => {
      item.newsList.map(news => {
        news.categoryName =
          item.name === '热门' ? news.categories[0].name : item.name
        return news
      })

      return item
    })
    res.send(cats)
  })

  app.use('/web/api', router)
}
