import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  reserve,
  getMyReservations,
  getAllReservations
} from '../controllers/reservations.js'

const router = express.Router()

router.post('/', auth, content('application/json'), reserve)
router.get('/me', auth, getMyReservations)
router.get('/all', auth, admin, getAllReservations)

export default router
