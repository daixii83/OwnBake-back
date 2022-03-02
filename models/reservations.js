import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
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
      type: Number
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
