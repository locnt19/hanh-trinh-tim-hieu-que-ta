const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lanThi: {
      luotThi: { type: Number, default: 1 },
      phan1: { type: Boolean, default: false },
      phan2: { type: Boolean, default: false },
      phan3: { type: Boolean, default: false },
      phan4: { type: Boolean, default: false },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address." });
        }
      },
    },
    identity: {
      // Chứng minh nhân dân
      type: String,
      default: "123456789",
      // required: true
    },
    birthday: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      default: "Bà Rịa - Vũng Tàu",
      // required: true
    },
    district: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    nameSchool: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
    },
    classRoom: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    role: {
      type: String,
      default: "student",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    time: {
      type: Number,
      default: 0,
    },
    scope: {
      type: Number,
      default: 0,
    },
    dataDiem: {
      round1: {
        time: {
          type: Number,
        },
        scope: {
          type: Number,
        },
      },
      round2: {
        time: {
          type: Number,
        },
        scope: {
          type: Number,
        },
      },
      round3: {
        time: {
          type: Number,
        },
        scope: {
          type: Number,
        },
      },
      round4: {
        time: {
          type: Number,
        },
        scope: {
          type: Number,
        },
      },
    },
  },
  { timestamps: true }
);

// hash the password before saving the user model
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// generate an auth token for the user
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// search for a user by email and password
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Tài khoản không tồn tại.");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Sai mật khẩu.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
