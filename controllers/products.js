import products from '../models/products.js'

export const create = async (req, res) => {
  try {
    const result = await products.create({ ...req.body, productImage: req.file.path })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.error[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getProducts = async (req, res) => {
  try {
    const result = await products.find({ productSell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    if (result) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const searchProducts = async (req, res) => {
  try {
    const query = {
      $and: [],
      $or: [
        { productName: { $in: [] } },
        { productDescription: { $in: [] } }
      ]
    }

    if (req.query.productPrice_gte) {
      if (isNaN(req.query.productPrice_gte)) {
        res.status(400).send({ success: false, message: '輸入的格式錯誤' })
        return
      } else {
        query.$and.push({ productPrice: { $gte: parseInt(req.query.productPrice_gte) } })
      }
    }

    if (req.query.productPrice_lte) {
      if (isNaN(req.query.productPrice_lte)) {
        res.status(400).send({ success: false, message: '輸入的格式錯誤' })
        return
      } else {
        query.$and.push({ productPrice: { $lte: parseInt(req.query.productPrice_lte) } })
      }
    }

    if (query.$and.length === 0) {
      delete query.$and
    }

    if (req.query.keywords) {
      const keywords = req.query.keywords.split(',').map(keyword => {
        return new RegExp(keyword, 'i')
      })
      query.$or[0].productName.$in = keywords
      query.$or[1].productDescription.$in = keywords
    } else {
      // 如果沒有關鍵字，把 $or 清空，否則會找不到東西
      delete query.$or
    }

    const result = await products.find(query)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const updateProductById = async (req, res) => {
  const data = {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDescription: req.body.productDescription,
    productSell: req.body.productSell,
    productCategories: req.body.productCategories
  }

  if (req.file) {
    data.image = req.file.path
  }
  try {
    const result = await products.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteProducts = async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
