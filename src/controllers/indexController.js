const ThoiGianThi = require('../models/ThoiGianThi');
const moment = require('moment');
const User = require('../models/User');
const BaiThi = require('../models/BaiThi');

exports.templateTrangChu = async (req, res) => {
  const thoiGianThi = await ThoiGianThi.findOne({ name: 'Đợt 1' });
  const formatedThoiGianThiFinishDate = moment(thoiGianThi.finishDate).format('YYYY-MM-DD');
  thoiGianThi.startDate = moment(thoiGianThi.startDate).format('DD-MM-YYYY');
  thoiGianThi.finishDate = moment(thoiGianThi.finishDate).format('DD-MM-YYYY');
  const baiThiTotNhat = await BaiThi.find({
    user: res.locals.user._id,
    bestest: true,
  }).sort({ exam: 1 });

  let summaryScore = 0;
  let summaryTime = 0;

  for (const iBaiThi of baiThiTotNhat) {
    summaryScore += iBaiThi.scope;
    summaryTime += iBaiThi.time;
  }

  res.render('index.pug', {
    title: 'Home - Stepping back in History',
    thoiGianThi: thoiGianThi,
    formatedThoiGianThiFinishDate: formatedThoiGianThiFinishDate,
    baiThiTotNhat: baiThiTotNhat,
    summaryScore: summaryScore,
    summaryTime: summaryTime,
  });
};
