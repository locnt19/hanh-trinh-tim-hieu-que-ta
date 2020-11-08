const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const quanTriSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    default: 'admin'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true })

// hash the password before saving the QuanTri model
quanTriSchema.pre('save', async function (next) {
  const QuanTri = this
  if (QuanTri.isModified('password')) {
    QuanTri.password = await bcrypt.hash(QuanTri.password, 8)
  }
  next()
})

// generate an auth token for the QuanTri
quanTriSchema.methods.generateToken = async function () {
  const QuanTri = this
  const token = jwt.sign({ _id: QuanTri._id }, process.env.SECRETKEY)
  QuanTri.tokens = QuanTri.tokens.concat({ token })
  await QuanTri.save()
  return token
}

// search for a QuanTri by email and password
quanTriSchema.statics.findByCredentials = async function (username, password) {
  const QuanTri = await this.findOne({ username })
  if (!QuanTri) {
    throw new Error('Tài khoản không tồn tại.')
  }
  const isPasswordMatch = await bcrypt.compare(password, QuanTri.password)
  if (!isPasswordMatch) {
    throw new Error('Sai mật khẩu.')
  }
  return QuanTri
}

module.exports = mongoose.model('QuanTri', quanTriSchema, 'QuanTri')