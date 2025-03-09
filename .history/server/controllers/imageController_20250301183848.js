import axios from "axios";
import userModel from "../models/userModel";
import FormData from "form-data";
export const generateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({success: false, message: 'missing details'})
        }

        if(user.creditBalance ===0 || userModel.creditBalance<0){
            return res.json({success: false, message: 'insufficient credit balance', creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        await axios.post('')



    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}