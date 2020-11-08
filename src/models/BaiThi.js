const mongoose = require('mongoose');

const baiThiSchema = mongoose.Schema({
  user: { type: String },
  lanThi: { type: Number },
  exam: { type: String },
  time: { type: Number, default: 0 },
  scope: { type: Number, default: 0 },
  bestest: { type: Boolean },
  answers: [{
    code: { type: String, default: null },
    answer: { type: String, default: null },
    star: { type: String, default: null }
  }],
  answersTrue: [{
    code: { type: String },
    answer: { type: String },
    star: { type: String }
  }
  ]
}, { timestamps: true });

module.exports = mongoose.model('BaiThi', baiThiSchema, 'BaiThi');