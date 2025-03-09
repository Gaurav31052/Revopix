import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'


const PORT = process.env.PORT || 4000
const app = express()
await

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> res.send("ApI Working"))

app.listen(PORT, ()=> console.log("server running on PORT " + PORT))