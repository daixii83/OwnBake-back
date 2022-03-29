import orders from '../models/orders.js'
import users from '../models/users.js'

export const checkout = async (req, res) => {
  try {
    if (req.user.cart.length === 0) {
      res.status(400).send({ success: false, message: '購物車是空的' })
      return
    }
    const hasNotSell = await users.aggregate([
      {
        $project: {
          'cart.product': 1
        }
      }, {
        $lookup: {
          from: 'products',
          localField: 'cart.product',
          foreignField: '_id',
          as: 'cart.product'
        }
      }, {
        $match: {
          'cart.product.productSell': false
        }
      }
    ])
    if (hasNotSell.length > 0) {
      res.status(400).send({ success: false, message: '包含下架商品' })
      return
    }
    const result = await orders.create({ user: req.user._id, products: req.user.cart, order: req.body })
    req.user.cart = []
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: result._id })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ user: req.user._id }).populate('products.product')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await orders.find().populate('user', 'account').populate('products.product')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const completedOrders = async (req, res) => {
//   try {
//     const result = await orders.find().populate('user', 'account').populate('products.product')
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }

// export const completedOrders = async (req, res) => {
//   try {
//     const idx = req.order.findIndex(item => item.product.toString() === req.body.product)
//     if (idx > -1) {
//       req.user.cart[idx].quantity = req.body.quantity
//     }
//     await req.user.save()
//   } catch (error) {
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }

export const deleteOrders = async (req, res) => {
  try {
    await orders.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到訂單' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const cancelOrders = async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  const data = {
    orderStatus: req.body.orderStatus
  }
  try {
    await orders.findByIdAndUpdate(req.params.id, data)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到訂單' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const completedOrders = async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  const data = {
    orderStatus: req.body.orderStatus
  }
  try {
    await orders.findByIdAndUpdate(req.params.id, data)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到訂單' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
