import jwt  from "jsonwebtoken"
import authModel from "../models/authModel.js"
// import Cookies from 'js-cookie'

const checkuser = async(req,res,next)=>{
    // const token=req.cookies.token;
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
      
    try{
        token = authorization.split(" ")[1];
        const user = jwt.verify(token,"kunalprajapati")
        // console.log(userID)
      req.user = await authModel.findById(user.usetID).select("--password")
    //   console.log(req.user)
        next()
    }catch(error){
        return res.status(401).json({
            message:error.message
        })
    }
}else{
        return res.status(401).json({message:"unAuthorized User"})
    }

}

export default checkuser;