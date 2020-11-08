const jwt = require('jsonwebtoken')
const User = require('../models/User')
const QuanTri = require('../models/QuanTri')

exports.isLogged = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect('/users/login')
  }
  const token = req.cookies.token
  try {
    const data = jwt.verify(token, process.env.SECRETKEY)
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    })
    if (!user) {
      console.log('run error')
      throw new Error()
    }
    res.locals.user = {
      _id: user._id,
      name: user.name,
      lanThi: user.lanThi,
      identity: user.identity, // Chứng minh nhân dân
      birthday: user.birthday,
      sex: user.sex,
      province: user.province, // Tỉnh
      district: user.district, // Huyện, Thị trấn, Xã: Huyện Đất Đỏ
      school: user.school, // Cấp THCS, THPT
      nameSchool: user.nameSchool, // THPT Võ Thị Sáu
      grade: user.grade, // Khối: 12
      classRoom: user.classRoom, // Tên lớp: 12A3
      email: user.email,
      role: user.role
    }
    next()
  } catch (error) {
    console.log(error)
    res.render('403.pug', { title: 'Forbidden' })
  }
}

exports.isAdmin = async (req, res, next) => {
  if (!req.cookies.isAdmin) {
    res.redirect('/admin/login')
  }
  const token = req.cookies.isAdmin
  try {
    const data = jwt.verify(token, process.env.SECRETKEY)
    const quanTriVien = await QuanTri.findOne({
      _id: data._id,
      'tokens.token': token
    })
    if (!quanTriVien) {
      console.log('run error')
      throw new Error()
    }
    res.locals.quanTriVien = {
      _id: quanTriVien._id,
      name: quanTriVien.name,
      username: quanTriVien.username,
      role: quanTriVien.role
    }
    if (quanTriVien.role === 'admin' || quanTriVien.role === 'root') {
      next()
    } else {
      res.render('403.pug', { title: 'Forbidden' })
    }
  } catch (error) {
    console.log(error)
    res.render('403.pug', { title: 'Forbidden' })
  }
}
