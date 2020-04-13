const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  title: { type: String },
  // 英雄的类型
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 英雄的评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      desc: { type: String },
      tips: { type: String }
    }
  ],
  // 顺风装备
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 逆风装备
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 搭档英雄
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      desc: { type: String }
    }
  ]
})
module.exports = mongoose.model('Heros', schema, 'heroes')
