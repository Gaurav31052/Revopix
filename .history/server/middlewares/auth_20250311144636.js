import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: 'Please first login'})  
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId =tokenDecode.id;
            const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
        }
        else{
            return res.json({success: false, message: 'No authorized login again'})
        }
        next();
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default userAuth;