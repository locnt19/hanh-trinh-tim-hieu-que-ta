const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.templateLogin = (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("login.pug", { title: "Đăng nhập" });
};

exports.templateRegister = (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("register.pug", { title: "Đăng kí" });
  // res.render('403.pug', { title: 'Forbidden' });
};

exports.templateProfile = (req, res) => {
  res.render("me.pug", { title: "Thông tin cá nhân" });
};

exports.templateChangePassword = (req, res) => {
  res.render("change-password.pug", { title: "Đổi mật khẩu" });
};

exports.templateRanking = (req, res) => {
  res.render("ranking.pug", { title: "Xếp hạng của tôi" });
};

exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(400).send(error));
};

exports.setUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ email: req.body.email }, req.body);
    req.flash("message", "Chỉnh sửa thông tin thành công!");
    res.redirect("/users/me");
  } catch (error) {
    req.flash("message", error);
    res.render("me.pug", {
      message: req.flash(),
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      oldPassword: req.body.old_password,
      newPassword: req.body.new_password,
    };
    await User.findByCredentials(data.email, data.oldPassword); // check email và mật khẩu trên csdl nếu sai email và mật khẩu sẽ báo lỗi
    await User.findOneAndUpdate(
      { email: data.email },
      {
        password: bcrypt.hashSync(data.newPassword, 8),
      }
    );
    req.flash(
      "message",
      "Đổi mật khẩu thành công <br/> Vui lòng đăng nhập lại"
    );
    res.redirect("/users/logout");
  } catch (error) {
    req.flash("message", error);
    res.render("change-password.pug", {
      message: req.flash(),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) throw new Error("Email đã tồn tại.");
    for (key in req.body) {
      if (req.body[key].length === 0) {
        throw new Error("Vui lòng nhập đầy đủ thông tin.");
      }
    }
    console.log(req.body);
    user.birthday = `${req.body.dd}-${req.body.mm}-${req.body.yyyy}`;
    await user.save();
    req.flash("message", "Đăng kí thành công!");
    res.redirect("/users/login");
  } catch (error) {
    req.flash("message", error);
    res.render("register.pug", {
      message: req.flash(),
      values: req.body,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
    });
    req.flash("message", "Đăng nhập thành công!");
    res.redirect("/");
  } catch (error) {
    req.flash("message", error);
    res.render("login.pug", {
      message: req.flash(),
      values: req.body,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token,
    });
    user.tokens = user.tokens.filter((t) => {
      return t.token !== token;
    });
    await user.save();
    res.clearCookie("token");
    res.redirect("/users/login");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logoutAll = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token,
    });
    user.tokens.splice(0, user.tokens.length);
    await user.save();
    res.clearCookie("token");
    res.redirect("/users/login");
  } catch (error) {
    res.status(500).send(error);
  }
};
