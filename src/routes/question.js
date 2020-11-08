const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.route('/section-1')
  .get(questionController.templateSection1)

router.route('/section-1/create')
  .get(questionController.templateSection1Create)
  .post(questionController.createSection1)

router.route('/section-1/edit/:id')
  .get(questionController.templateSection1Edit)
  .post(questionController.editSection1234)

router.route('/section-2')
  .get(questionController.templateSection2)

router.route('/section-2/create')
  .get(questionController.templateSection2Create)
  .post(questionController.createSection2)

router.route('/section-2/edit/:id')
  .get(questionController.templateSection2Edit)
  .post(questionController.editSection1234)

router.route('/section-3')
  .get(questionController.templateSection3)

router.route('/section-3/create')
  .get(questionController.templateSection3Create)
  .post(questionController.createSection3)

router.route('/section-3/edit/:id')
  .get(questionController.templateSection3Edit)
  .post(questionController.editSection1234)

router.route('/section-4')
  .get(questionController.templateSection4)

router.route('/section-4/create')
  .get(questionController.templateSection4Create)
  .post(questionController.createSection4)

router.route('/section-4/edit/:id')
  .get(questionController.templateSection4Edit)
  .post(questionController.editSection1234)

router.route('/section-2-hinh-nen')
  .get(questionController.templateSection2HinhNen)

router.route('/section-2-hinh-nen/create')
  .get(questionController.templateSection2HinhNenCreate)
  .post(questionController.createSection2HinhNen)

router.route('/section-2-hinh-nen/edit/:id')
  .get(questionController.templateSection2HinhNenEdit)
  .post(questionController.editSection1234)

module.exports = router