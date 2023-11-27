const Users=require("../model/UserModel")
const jwt=require("jsonwebtoken")



const verifyToken=async(req,res,next)=>{


    const token=req.cookies.jwt;

    if(token){

        jwt.verify(token,process.env.SECREAT,async(err,decodedToken)=>{

            if(err){
                res.status(400).json({message:err.message,status:false});
                next();
            }
            else{
                const user=await Users.findById(decodedToken.id);

      

                if(user){

                   req.user=user
                   next()
                    
                }
                else{
                   return res.status(400).json({status:false,message:"user not found in the id in token"});
                

                }
            }
        })

    }
    else{
        return res.status(400).json({success:false,message:"token not found"})
    
    }
}


const isAdmin = async (req, res, next) => {

    if (req.user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "admin only",
      });
    }
    next();
  };

  module.exports={isAdmin,verifyToken};