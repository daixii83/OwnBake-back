import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, '商品名不能為空格']
  },
  productPrice: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '商品價格不能為空格']
  },
  productDescription: {
    type: String
  },
  productImage: {
    type: String
  },
  productSell: {
    type: Boolean,
    default: false
  },
  productCategories: {
    type: String,
    enum: {
      values: ['蛋糕', '餅乾', '塔&派', '點心'],
      message: '商品分類不存在'
    }
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
