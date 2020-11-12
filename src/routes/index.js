const router = require("express").Router();
const auth = require("../middleware/auth");
const userRoutes = require("./user");
const questionRoutes = require("./question");
const adminRoutes = require("./admin");
const examRoutes = require("./exam");
const User = require("../models/User");
const BaiThi = require("../models/BaiThi");
const DeThi = require("../models/DeThi");
const adminController = require("../controllers/adminController");

const indexController = require("../controllers/indexController");

router.get("/", auth.isLogged, indexController.templateTrangChu);

router.use("/admin", adminRoutes);

router.use("/questions", auth.isAdmin, questionRoutes);

router.use("/users", userRoutes);

router.use("/exams", auth.isLogged, examRoutes);

router.post("/api", (req, res) => {
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

// router.get('/super-api/super-users', adminController.updatePointForUser);

router.get("/super-api/tim-de-thi-theo-id/:id", async (req, res) => {
  const deThi = await DeThi.find({ _id: req.params.id });
  res.json(deThi);
});

router.get("/super-api/tim-de-thi-theo-code/:code", async (req, res) => {
  const deThi = await DeThi.find({ code: req.params.code });
  res.json(deThi);
});

router.get("/super-api/tim-bai-thi-theo-id/:id", async (req, res) => {
  const baiThi = await BaiThi.find({ _id: req.params.id });
  res.json(baiThi);
});

router.get("/super-api/users/:id", async (req, res) => {
  const users = await User.find({ _id: req.params.id });
  res.json(users);
});

router.get("/super-api/bai-thi-tot-nhat", async (req, res) => {
  const baiThi = await BaiThi.find({ bestest: true });
  res.json(baiThi);
});

router.get("/super-api/bai-thi-theo-id-user/:id", async (req, res) => {
  const baiThi = await BaiThi.find({ user: req.params.id });
  res.json(baiThi);
});

router.get("/super-api/bai-thi-tot-nhat-theo-id-user/:id", async (req, res) => {
  const baiThi = await BaiThi.find({ user: req.params.id, bestest: true });
  res.json(baiThi);
});

router.put(
  "/super-api/users/reset-lan-thi-theo-id-user/:id",
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        lanThi: {
          luotThi: 1,
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
  }
);

router.put(
  "/super-api/users/reset-lan-thi-luot-thi-theo-id-user/:id/:number",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.lanThi.luotThi = req.params.number;
      await user.save();
      res.json({ responsiveCode: 200 });
    } catch (error) {
      res.json(error);
    }
  }
);

router.put(
  "/super-api/users/reset-lan-thi-phan-1-theo-id-user/:id",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.lanThi.phan1 = false;
      await user.save();
      res.json({ responsiveCode: 200 });
    } catch (error) {
      res.json(error);
    }
  }
);

router.put(
  "/super-api/users/reset-lan-thi-phan-2-theo-id-user/:id",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.lanThi.phan2 = false;
      await user.save();
      res.json({ responsiveCode: 200 });
    } catch (error) {
      res.json(error);
    }
  }
);

router.put(
  "/super-api/users/reset-lan-thi-phan-3-theo-id-user/:id",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.lanThi.phan3 = false;
      await user.save();
      res.json({ responsiveCode: 200 });
    } catch (error) {
      res.json(error);
    }
  }
);

router.put(
  "/super-api/users/reset-lan-thi-phan-4-theo-id-user/:id",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.lanThi.phan4 = false;
      await user.save();
      res.json({ responsiveCode: 200 });
    } catch (error) {
      res.json(error);
    }
  }
);

router.put(
  "/super-api/users/reset-lan-thi-tat-ca-phan-thi-theo-id-user/:id",
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        lanThi: {
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
  }
);

router.delete("/super-api/xoa-tat-ca-user-tru-id/:id", async (req, res) => {
  await User.deleteMany({ _id: { $ne: req.params.id } });
  res.json({ responsiveCode: 200 });
});

router.delete("/super-api/xoa-bai-thi-theo-id/:id", async (req, res) => {
  await BaiThi.findByIdAndDelete(req.params.id);
  res.json({ responsiveCode: 200 });
});

router.delete("/super-api/xoa-bai-thi-du-thua", (req, res) => {
  BaiThi.deleteMany({ bestest: false })
    .then(() => {
      res.json({ responsiveCode: 200, message: "Delete successful." });
    })
    .catch((error) => {
      res.json({ responsiveCode: 200, message: error });
    });
});

router.delete(
  "/super-api/xoa-tat-ca-bai-thi-theo-id-user/:id",
  async (req, res) => {
    BaiThi.deleteMany({ user: req.params.id })
      .then(() => {
        res.json({ responsiveCode: 200, message: "Delete successful." });
      })
      .catch((error) => {
        res.json({ responsiveCode: 200, message: error });
      });
  }
);

router.delete("/super-api/xoa-tat-ca-bai-thi", async (req, res) => {
  BaiThi.deleteMany()
    .then(() => {
      res.json({ responsiveCode: 200, message: "Delete successful." });
    })
    .catch((error) => {
      res.json({ responsiveCode: 200, message: error });
    });
});

router.get("/403", (req, res) => {
  res.render("403.pug", { title: "Forbidden" });
});
router.get("/404", (req, res) => {
  res.render("404.pug", { title: "Page not found" });
});
router.get("/500", (req, res) => {
  res.render("500.pug", { title: "Internal server error" });
});

module.exports = router;
