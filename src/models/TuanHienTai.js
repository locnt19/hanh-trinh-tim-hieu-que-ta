const mongoose = require('mongoose');

const tuanHienTaiSchema = mongoose.Schema({
  tenDot: { type: String },
  tenTuan: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TuanHienTai', tuanHienTaiSchema, 'TuanHienTai');