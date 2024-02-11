
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

<<<<<<< HEAD
// const allowedOrigins = ['https://daixii83.github.io/']
// set header
// app.use((req, res, next) => {
// const origin = req.headers.origin
// if (allowedOrigins.indexOf(origin) > -1) {
// res.setHeader('Access-Control-Allow-Origin', origin)
// }
// res.header('Access-Control-Allow-Credentials', true)
// })

=======
>>>>>>> 1a3f12dc831c34e1cb9782e0ae76e3e5498cda72
app.use(cors({
  origin (origin, callback) {
    if (origin === undefined || origin.includes('github') || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Access Not allowed'), false)
    }
  }
}))

app.use((_, req, res, next) => {
  res.status(403).send({ success: false, message: '請求被拒絕' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '資料格式錯誤' })
})

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/reservations', reservationsRouter)

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started')
})
