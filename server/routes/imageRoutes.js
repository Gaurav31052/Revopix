import express from 'express'

import { generateImage, removeBackground } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'
import multer from 'multer'

const upload = multer({storage: multer.memoryStorage()})

const imageRouter = express.Router()

imageRouter.post('/generate-image',userAuth, generateImage)
imageRouter.post('/remove-background', upload.single('image'), userAuth, removeBackground)

export default imageRouter