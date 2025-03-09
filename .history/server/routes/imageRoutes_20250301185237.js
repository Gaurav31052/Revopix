import express from 'express'

import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

export deconst imageRouter = express.Router()

imageRouter.post('/generate-image',userAuth, generateImage)