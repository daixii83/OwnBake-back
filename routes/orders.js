import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  checkout,
  getMyOrders,
  getAllOrders,
  deleteOrders,
  cancelOrders
  // completedOrders
} from '../controllers/orders.js'

const router = express.Router()

router.post('/', auth, content('application/json'), checkout)
router.get('/me', auth, getMyOrders)
router.get('/all', auth, admin, getAllOrders)
// router.patch('/all', auth, admin, completedOrders)
router.delete('/:id', auth, admin, deleteOrders)
router.patch('/:id', auth, content('application/json'), cancelOrders)

export default router
