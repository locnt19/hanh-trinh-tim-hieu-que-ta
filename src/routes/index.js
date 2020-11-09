const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');
const examRoutes = require('./exam');
const User = require('../models/User');
const BaiThi = require('../models/BaiThi');
const adminController = require('../controllers/adminController');

const indexController = require('../controllers/indexController');

router.get('/', auth.isLogged, indexController.templateTrangChu);

router.use('/admin', adminRoutes);

router.use('/questions', auth.isAdmin, questionRoutes);

router.use('/users', userRoutes);

router.use('/exams', auth.isLogged, examRoutes);

router.post('/api', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});

// router.get('/super-api/users', async (req, res) => {
//   const users = await User.find();
//   for (const iUser of users) {
//     iUser.lanThi = {
//       luotThi: 1,
//       phan1: false,
//       phan2: false,
//       phan3: false,
//       phan4: false,
//     };
//     await iUser.save();
//   }
//   res.json(users);
// });

router.get('/super-api/super-users', adminController.updatePointForUser);

router.put('/super-api/users/reset-lan-thi/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      lanThi: {
        luotThi: 2,
        phan1: false,
        phan2: false,
        phan3: false,
        phan4: false,
      },
    });
    res.json({ responsiveCode: 200 });
  } catch (error) {
    res.json(error);
  }
});

router.get('/super-api/users/:id', async (req, res) => {
  const users = await User.find({ _id: req.params.id });
  res.json(users);
});

router.get('/super-api/users-top-30', async (req, res) => {
  const users = await User.find({
    $or: [
      // START CĐ-ĐH
      { email: 'tuyen.emma2000@gmail.com' },
      { email: 'thao01319@gmail.com' },
      { email: 'honglinhtranbvu@gmail.com' },
      { email: 'ngoctram0264@gmail.com' },
      { email: 'thanhmai1491@gmail.com' },
      { email: 'banhdau08@gmail.com' },
      { email: 'nguyenanhthy892@gmail.com' },
      { email: 'sallaely927@gmail.com' },
      { email: 'phamvanphuonglonghai@gmail.com' },
      { email: 'hoanglongpro9877@gmail.com' },
      { email: '0815448175@gmai.com' },
      { email: 'nguyenlequynhtram9@gmail.com' },
      { email: 'pthy107201@gmail.com' },
      { email: 'iris.huonggiang@gmail.com' },
      { email: 'minhthanhiphone12@gmail.com' },
      { email: 'asdhuynhlinh123@gmail.com' },
      { email: 'doanhongnambctech@gmail.com' },
      { email: 'maianh29082811@gmail.com' },
      { email: 'thanhchau160403@gmail.com' },
      { email: 'thaovy1299@gmail.com' },
      { email: 'tranhue04102002@gmail.com' },
      { email: 'dunghoangbrvt@gmail.com' },
      { email: 'nguyenttthuy1602@gmail.com' },
      { email: 'woainitd11a9@gmail.com' },
      { email: 'tuan789brvt@gmail.com' },
      { email: 'nguyencongnamcd19hanqt@gmail.com' },
      { email: 'ngonuhoanganh1032000@gmail.com' },
      { email: 'dangthianhtien2001@gmail.com' },
      { email: 'hientrang.040201@gmail.com' },
      { email: 'dangthithaod1nhvt@gmail.com' },
      // END CĐ-ĐH
      // START THPT
      { email: 'kim29042004@gmail.com' },
      { email: 'nguyenyennhi912005@gmail.com' },
      { email: 'tientran20le4@gmail.com' },
      { email: 'tungdinh1602@gmail.com' },
      { email: 'lehongdaiminh@gmail.com' },
      { email: 'dcpham310323@gmail.com' },
      { email: 'maianh76pt@gmail.com' },
      { email: 'kakaanhanh001@gmail.com' },
      { email: 'ngoclinhdo248@gmail.com' },
      { email: 'teresaphamm3@gmail.com' },
      { email: 'vanlee0201@gmail.com' },
      { email: 'nhtphuong.math@gmail.com' },
      { email: 'nhtphuong.mathematic@gmail.com' },
      { email: 'danhphamvts@gmail.com' },
      { email: 'hoangquyennan@gmail.com' },
      { email: 'ngannguyen05082005@gmail.com' },
      { email: 'hvpham1128@gmail.com' },
      { email: '12345lanthuy@gmail.com' },
      { email: 'cheesyfood123@gmail.com' },
      { email: 'minhthy2147@gmail.com' },
      { email: 'nguyendieuh6@gmail.com' },
      { email: 'thainhanlqd@gmail.com' },
      { email: 'hiubeotm@gmail.com' },
      { email: 'hoangdinhtruc1@gmail.com' },
      { email: 'thinksimpleornot@gmail.com' },
      { email: 'chauanhbleble@gmail.com' },
      { email: 'le03102003@gmail.com' },
      { email: 'nguyendt30102003@gmail.com' },
      { email: 'linhanhokiyune2004@gmail.com' },
      { email: 'tranngocnhuquynh2k5@gmail.com' },
      // END THPT
      // START THCS
      { email: 'tranhuubinhnguyen1604@gmail.com' },
      { email: 'nhtphuong.dulich@gmail.com' },
      { email: 'nhtphuong.tea@gmail.com' },
      { email: 'huychuongvang245@gmail.com' },
      { email: 'huynhha111597@gmail.com' },
      { email: 'trangiahao114@gmail.com' },
      { email: '2006tuancut@gmail.com' },
      { email: 'bichtram11032008@gmail.com' },
      { email: 'anhthu0306206@gmail.com' },
      { email: 'minhold0302@gmail.com' },
      { email: 'ledobaoanh12@gmail.com' },
      { email: 'hythieen@gmai.com' },
      { email: 'haicaosubaria@gmail.com' },
      { email: 'chauduc1902@gmail.com' },
      { email: 'lengocyen22042007@gmail.com' },
      { email: 'lunatran1206@gmail.com' },
      { email: 'giahan.14022006hh@gmai.com' },
      { email: 'tttdan2006@gmail.com' },
      { email: 'nguyenngocminhanh321@gmail.com' },
      { email: 'lekimkhanh1206@gmail.com' },
      { email: 'thiengiang28@gmail.com' },
      { email: 'mjin000000@gmail.com' },
      { email: 'duongchetni05062006@gmail.com' },
      { email: 'mytructran2008@gmail.com' },
      { email: 'tuananh15@gmail.com' },
      { email: 'tranhuunhattruong@gmail.com' },
      { email: 'trang111@gmail.com' },
      { email: 'btd01022006@gmail.com' },
      { email: 'ginanguyen1008a@gmail.com' },
      { email: 'y@gmail.com' },
      // END THCS
    ],
  });
  res.json(users);
});

router.get('/super-api/bai-thi', async (req, res) => {
  const baiThi = await BaiThi.find({ bestest: true });
  res.json(baiThi);
});

router.delete('/super-api/bai-thi-sai', (req, res) => {
  BaiThi.deleteMany({ bestest: false })
    .then(() => {
      res.json({ responsiveCode: 200, message: 'Delete successful.' });
    })
    .catch(error => {
      res.json({ responsiveCode: 200, message: error });
    });
});

router.get('/super-api/bai-thi/:id', async (req, res) => {
  const baiThi = await BaiThi.find({ user: req.params.id });
  res.json(baiThi);
});

router.delete('/super-api/bai-thi/:id', async (req, res) => {
  await BaiThi.findByIdAndDelete(req.params.id);
  res.json({ responsiveCode: 200 });
});

router.delete('/super-api/bai-thi/user/:user', async (req, res) => {
  await BaiThi.findOneAndDelete({ user: req.params.user });
  res.json({ responsiveCode: 200 });
});

router.get('/403', (req, res) => {
  res.render('403.pug', { title: 'Forbidden' });
});
router.get('/404', (req, res) => {
  res.render('404.pug', { title: 'Page not found' });
});
router.get('/500', (req, res) => {
  res.render('500.pug', { title: 'Internal server error' });
});

module.exports = router;
