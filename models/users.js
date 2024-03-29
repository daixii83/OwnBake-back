import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: [2, '用戶名必須 2 個字以上'],
    maxlength: [20, '用戶名必須 20 個字以內'],
    required: [true, '用戶名不能為空格']
  },
  account: {
    type: String,
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號必須 20 個字以內'],
    unique: true,
    required: [true, '帳號欄位不能為空格']
  },
  password: {
    type: String,
    required: [true, '密碼欄位不能為空格']

  },
  email: {
    type: String,
    unique: true,
    required: [true, '信箱欄位不能為空格'],
    validator: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  role: {
    // 0 = 一般會員
    // 1 = 管理員
    type: Number,
    default: 0
  },
  tokens: {
    type: [String]
  },
  cart: {
    type: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: 'products',
          required: [true, '缺少商品 ID']
        },
        quantity: {
          type: Number,
          required: [true, '缺少商品數量']
        }
      }
    ]
  },
  reservation: {
    type: [
      {
        reservation: {
          type: mongoose.ObjectId,
          ref: 'reservations',
          required: [true, '缺少訂單 ID']
        }
      }
    ]
  }
}, { versionKey: false })

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password.length >= 4 && user.password.length <= 20) {
    user.password = md5(user.password)
  } else {
    const error = new mongoose.Error.ValidationError(null)
    error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
    next(error)
    return
  }
  next()
})

export default mongoose.model('users', userSchema)
