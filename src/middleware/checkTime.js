const ThoiGianThi = require('../models/ThoiGianThi')
const TuanHienTai = require('../models/TuanHienTai')
const moment = require('moment')

const checkTime = async (req, res, next) => {
  // const tuanHienTai = await TuanHienTai.find({})
  // res.locals.tuanHienTai = tuanHienTai[0].tenTuan
  // res.locals.dotHienTai = tuanHienTai[0].tenDot
  // const time = await ThoiGianThi.findOne({ name: tuanHienTai[0].tenDot })
  // const startTime = moment(`${time.startDate} ${time.startTime} ${time.timeZone}`, 'YYYY-MM-DD HH:mm ZZ')
  // const currentTime = moment().format()
  // const chenhLech = startTime.diff(currentTime, 'seconds')

  // // const finishTime = moment(`${time.finishDate} ${time.finishTime} ${time.timeZone}`, 'YYYY-MM-DD HH:mm ZZ')

  // // const distance = finishTime.diff(startTime, 'weeks')
  // // console.log(distance)
  // if (chenhLech > 0) {
  //   res.redirect('/exams/coming-soon')
  // }
  next()
}

module.exports = checkTime