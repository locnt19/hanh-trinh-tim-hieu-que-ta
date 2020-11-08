const router = require('express').Router()
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')

router.route('/')
  .get(auth.isAdmin, adminController.templateDashboard)
  // .get(auth.isAdmin, adminController.templateXepHang)

router.route('/login')
  .get(adminController.templateLogin)
  .post(adminController.loginQuanTri)

router.route('/logout')
  .get(auth.isAdmin, adminController.logoutQuanTri)

router.route('/quan-tri')
  .get(auth.isAdmin, adminController.templateQuanTri)
  .post(auth.isAdmin, adminController.createQuanTri)

router.route('/xep-hang')
  .get(auth.isAdmin, adminController.templateXepHang)

router.route('/xep-hang/don-vi/:donvi')
  .get(auth.isAdmin, adminController.templateXepHangDonVi)

router.route('/thoi-gian-thi')
  .get(auth.isAdmin, adminController.getThoiGianThi)
  .post(auth.isAdmin, adminController.setThoiGianThi)

router.route('/update-thoi-gian-thi/:id')
  .post(auth.isAdmin, adminController.updateThoiGianThi)


router.route('/create-tuan-hien-tai')
  .post(auth.isAdmin, adminController.createTuanHienTai)
router.route('/update-tuan-hien-tai')
  .post(auth.isAdmin, adminController.updateTuanHienTai)


router.route('/users')
  .get(auth.isAdmin, adminController.templateUsers)

router.route('/bai-thi')
  .get(auth.isAdmin, adminController.templateBaiThi)

module.exports = router