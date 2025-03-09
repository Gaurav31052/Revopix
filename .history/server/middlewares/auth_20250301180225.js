import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next)=>{
    const {token} = req.headers;
    if(!token) return res.status(401).json({msg: 'No token, authorization
        denied'});
        t
}