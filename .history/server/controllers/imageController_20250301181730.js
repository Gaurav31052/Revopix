export const generateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.bo



    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}