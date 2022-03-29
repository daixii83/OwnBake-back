import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '已確認預約'
  },
  color: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  reservation: {
    date: {
      type: String
    },
    time: {
      type: String
    },
    adultNum: {
      type: Number
    },
    childNum: {
      type: Number
    },
    name: {
      type: String
    },
    gender: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    remark: {
      type: String
    }
  }
}, { versionKey: false })

export default mongoose.model('reservations', reservationSchema)
