const mongoose = require('mongoose');

const thoiGianThiSchema = mongoose.Schema({
  name: {
    type: String
  },
  startDate: {
    type: String
  },
  startTime: {
    type: String
  },
  finishDate: {
    type: String
  },
  finishTime: {
    type: String
  },
  timeZone: {
    type: String,
    default: 'UTC+7'
  }
}, { timestamps: true });

module.exports = mongoose.model('ThoiGianThi', thoiGianThiSchema, 'ThoiGianThi');