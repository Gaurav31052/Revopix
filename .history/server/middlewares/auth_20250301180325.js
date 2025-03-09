import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, msg: 'No token, authorization
        denied'})}
        t
}