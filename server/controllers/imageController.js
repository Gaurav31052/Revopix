import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";


export const generateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({success: false, message: 'missing details'})
        }

        if(user.creditBalance ===0 || user.creditBalance<0){
            return res.json({success: false, message: 'insufficient credit balance', creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
            'x-api-key': process.env.CLIPDROP_API,
             },
             responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance-1})

        res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance-1, resultImage})



    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export const removeBackground = async (req, res)=>{
    try {
        const {userId} = req.body
        
         const image = req.file.buffer

        console.log("hello");

        console.log(image);

        const user = await userModel.findById(userId)

        if(!user || !image){
            return res.json({success: false, message: 'missing details'})
        }

        if(user.creditBalance === 0 || user.creditBalance<0){
            return res.json({success: false, message: 'insufficient credit balance', creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append(
  "image_file",
  req.file.buffer,
  req.file.originalname
);

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                 ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API,
             },
             responseType: 'arraybuffer'
        })


        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`
        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance-1})

        res.json({success: true, message: "Background Removed", creditBalance: user.creditBalance-1, resultImage})

    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message})
    }
}