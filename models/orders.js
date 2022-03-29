import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  products: {
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
  order: {
    delivery: {
      type: String
    },
    pay: {
      type: String
    },
    recipient: {
      type: String
    },
    mobile: {
      type: Number
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    remark: {
      type: String
    },
    card: {
      type: String
    },
    cardHolder: {
      type: String
    },
    cardExpiry: {
      type: String
    },
    cardCSC: {
      type: Number
    },
    receipt: {
      type: String
    },
    receiptCarrier: {
      type: String
    },
    code: {
      type: String
    }
  },
  orderStatus: {
    type: String,
    default: '處理中'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default mongoose.model('orders', orderSchema)
