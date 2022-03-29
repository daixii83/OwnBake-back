import reservations from '../models/reservations.js'

export const reserve = async (req, res) => {
  try {
    const result = await reservations.create({ user: req.user._id, reservation: req.body })
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

export const getMyReservations = async (req, res) => {
  try {
    const result = await reservations.find({ user: req.user._id }).populate('reservation')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllReservations = async (req, res) => {
  try {
    const result = await reservations.find().populate('user', 'account').populate('reservation')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const cancelReservations = async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  const data = {
    title: req.body.title,
    color: req.body.color
  }
  try {
    await reservations.findByIdAndUpdate(req.params.id, data)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到預約' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteReservations = async (req, res) => {
  try {
    await reservations.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到預約' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
