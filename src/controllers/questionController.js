const DeThi = require('../models/DeThi');


//#region Phần 1
exports.templateSection1 = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P01' })
  res.render('admin/section-1.pug', { deThi: deThi })
}

exports.templateSection1Create = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P01' })
  res.render('admin/section-1-create.pug', { deThi: deThi })
}

exports.templateSection1Edit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P01' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-1-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection1 = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-1
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body)
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      res.redirect('/questions/section-1/create')
    }
    else {
      // nếu tồn tại section-1 thì bổ sung câu hỏi
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      res.redirect('/questions/section-1/create')
    }
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-1-create.pug')
  }
}
//#endregion

//#region Phần 2
exports.templateSection2 = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P02' })
  res.render('admin/section-2.pug', { deThi: deThi })
}

exports.templateSection2Create = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P02' })
  res.render('admin/section-2-create.pug', { deThi: deThi })
}

exports.templateSection2Edit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P02' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-2-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection2 = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-2
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body)
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      res.redirect('/questions/section-2/create')
    } else {
      // nếu tồn tại section-2 thì bổ sung câu hỏi
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      res.redirect('/questions/section-2/create')
    }
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-2-create.pug')
  }
}
//#endregion

//#region Phần 3
exports.templateSection3 = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P03' })
  res.render('admin/section-3.pug', { deThi: deThi })
}

exports.templateSection3Create = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P03' })
  res.render('admin/section-3-create.pug', { deThi: deThi })
}

exports.templateSection3Edit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P03' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-3-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection3 = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-3
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body)
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      res.redirect('/questions/section-3/create')
    } else {
      // nếu tồn tại section-3 thì bổ sung câu hỏi
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      res.redirect('/questions/section-3/create')
    }
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-3-create.pug')
  }
}
//#endregion

//#region Phần 4
exports.templateSection4 = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P04' })
  res.render('admin/section-4.pug', { deThi: deThi })
}

exports.templateSection4Create = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P04' })
  res.render('admin/section-4-create.pug', { deThi: deThi })
}

exports.templateSection4Edit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P04' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-4-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection4 = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-4
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body)
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      // res.json(deThiMoi)
      res.redirect('/questions/section-4/create')
    } else {
      // nếu tồn tại section-4 thì bổ sung câu hỏi
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      // res.json(deThi)
      res.redirect('/questions/section-4/create')
    }
  } catch (error) {
    req.flash('message', error)
    // res.json(error)
    res.render('admin/section-4-create.pug')
  }
}

exports.editSection1234 = async (req, res) => {
  const data = req.body;
  const deThi = await DeThi.findOne({ code: data.codeDeThi });
  let index = 0;
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === data.idCauHoi) {
      deThi.questions[index].question = data.question;
      deThi.questions[index].true = data.true;
      deThi.questions[index].a = data.a;
      if (data.codeDeThi === 'P03') {
        deThi.questions[index].location = data.location;
      }
      if (data.codeDeThi !== 'P04') {
        deThi.questions[index].b = data.b;
        deThi.questions[index].c = data.c;
        deThi.questions[index].d = data.d;
      }
      cauHoi = deThi.questions[index];
      break;
    }
    index++;
  }
  await deThi.save();
  req.flash('message', 'Cập nhật thành công');
  switch (data.codeDeThi) {
    case 'P01':
      res.render('admin/section-1-edit.pug', { cauHoi: cauHoi, deThi: deThi });
      break;
    case 'P02':
      res.render('admin/section-2-edit.pug', { cauHoi: cauHoi, deThi: deThi });
      break;
    case 'P03':
      res.render('admin/section-3-edit.pug', { cauHoi: cauHoi, deThi: deThi });
      break;
    case 'P04':
      res.render('admin/section-4-edit.pug', { cauHoi: cauHoi, deThi: deThi });
      break;
    case 'P020':
      res.render('admin/section-2-hinh-nen-edit.pug', { cauHoi: cauHoi, deThi: deThi });
    case 'P030':
      res.render('admin/section-3-hinh-nen-edit.pug', { cauHoi: cauHoi, deThi: deThi });
      break;
    default:
      break;
  }
}
//#endregion

//#region Phần 2 Hình nền
exports.templateSection2HinhNen = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P020' })
  res.render('admin/section-2-hinh-nen.pug', { deThi: deThi })
}

exports.templateSection2HinhNenCreate = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P020' })
  res.render('admin/section-2-hinh-nen-create.pug', { deThi: deThi })
}

exports.templateSection2HinhNenEdit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P020' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-2-hinh-nen-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection2HinhNen = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-2-hinh-nen
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body);
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      res.redirect('/questions/section-2-hinh-nen/create')
    }
    else {
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      res.redirect('/questions/section-2-hinh-nen/create')
    }
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-2-hinh-nen-create.pug')
  }
}
//#endregion

//#region Phần 3 Hình nền
exports.templateSection3HinhNen = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P030' })
  res.render('admin/section-3-hinh-nen.pug', { deThi: deThi })
}

exports.templateSection3HinhNenCreate = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P030' })
  res.render('admin/section-3-hinh-nen-create.pug', { deThi: deThi })
}

exports.templateSection3HinhNenEdit = async (req, res) => {
  const deThi = await DeThi.findOne({ code: 'P030' });
  let cauHoi;
  for (const item of deThi.questions) {
    if (item._id.toString() === req.params.id) {
      cauHoi = item;
      break;
    }
  }
  res.render('admin/section-3-hinh-nen-edit.pug', { cauHoi: cauHoi, deThi: deThi });
}

exports.createSection3HinhNen = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-3-hinh-nen
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body);
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công')
      res.redirect('/questions/section-3-hinh-nen/create')
    }
    else {
      const deThi = await DeThi.findOne({ code: req.body.code })
      deThi.questions.push(req.body.questions[0])
      await deThi.save()
      // thông báo tạo thành công
      req.flash('message', 'Thêm thành công')
      res.redirect('/questions/section-3-hinh-nen/create')
    }
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-3-hinh-nen-create.pug')
  }
}
//#endregion