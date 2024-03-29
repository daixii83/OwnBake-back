import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/user.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import reservationsRouter from './routes/reservations.js'

mongoose.connect(process.env.DB_URL, () => {
  console.log('MongoDB Connected')
})

const app = express()

app.use(cors({
  origin (origin, callback) {
    if (origin === undefined || origin.includes('github') || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Access Not allowed'), false)
    }
  }
}))

app.use(express.json())

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/reservations', reservationsRouter)

app.get('/alive', (req, res) => {
  res.status(200).json({ success: true, message: 'Service is alive' })
})

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.use((_, req, res, next) => {
  res.status(403).send({ success: false, message: '請求被拒絕' })
})

app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '資料格式錯誤' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started')
})
