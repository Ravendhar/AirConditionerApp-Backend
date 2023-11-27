const Users=require("../model/UserModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const secreat=process.env.SECREAT;
const maxAge= 3*24*60*60 ;

const createToken=(id,email)=>{

    const user={id,email};

   return  jwt.sign(user,secreat,{
        expiresIn:maxAge
    })

}


const handleError=(err)=>{

    let errors={email:"",password:""};

    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
      }
    
      if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
      }

    if(err.code === 11000){
        errors.email="User Email Is Already Registered"

        return errors;
    }

    if(err.message.includes('Users validation failed')){

        Object.values(err.errors).forEach(({properties})=>{
          
            errors[properties.path]=properties.message;
        })
    }

    return errors;
}

const login=async(req,res,next)=>{

    try {

        const {email,password}=req.body;
        const user =await Users.login(email,password);


        const token= createToken(user._id,user.email);



        res.cookie("jwt",token,{
           withCredential:true,
           httpOnly:true,
           maxAge:maxAge * 1000,
           sameSite: 'None'
        })


        res.status(201).json({token,user:user.name,success:true})
       
   } catch (error) {
     

       const errors=handleError(error)

       res.json({errors,success:false})
   }

}

const logout = (req, res, next) => {
    try {
        res
          .status(200)
          .cookie("jwt", "", {
            expires: new Date(Date.now()),
          })
          .send({
            success: true,
            message: "Logout SUccessfully",
          });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In LOgout API",
          error,
        });
      }
  };


const register=async(req,res,next)=>{

    try {

         const {email,password,phoneNumber,name}=req.body;
         const user =await Users.create({email,password,phoneNumber,name});


         const token= createToken(user._id,user.email);


         res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:true,
            maxAge:maxAge * 1000,
            sameSite: 'None'
         })

        

         return res.status(201).json({user:user.name,created:true})
        
    } catch (error) {
       

        const errors=handleError(error)

        res.json({errors,created:false})
    }

}



const getAllUsers=async(req,res)=>{

    try {

        const AllUsers=await Users.find().select("name email phoneNumber");


        if(!AllUsers){
          return  res.status(400).json({message:"No users Found",success:false})
        }

        res.status(200).send(AllUsers)
        
    } catch (error) {
        
        res.status(500).json({message:error.message ,success:false})
    }


}


const getUser=async(req,res)=>{


    try {
         const User=await Users.findById({_id:req.user._id}).select("name email phoneNumber")

        if(!User){
            res.status(400).json({message:"User Profile not found with the given id",success:false})
        }

        res.status(200).send(User)
        
    } catch (error) {

        res.status(500).json({message:error.message ,success:false})
        
    }
}





const updatePassword=async(req,res)=>{

    try {

        
        const {oldPassword,newPassword}=req.body

        if (!oldPassword || !newPassword) {
            return res.status(500).send({
              success: false,
              message: "Please provide old or new password",
            });
          }

    

        const user=req.user


         const isAuth=await bcrypt.compare(oldPassword,user.password);


         if(!isAuth){
          return res.status(400).json({message:"Old Password is Incorrect"})
         }


        const getHashPassword=async function(next){
                const salt=await bcrypt.genSalt();
            
                 return await bcrypt.hash(newPassword,salt);
            
        }
         
        const hashed= await getHashPassword()
    
    
        const updatedPassword=await Users.findByIdAndUpdate({_id:user._id},{password:hashed},{new:true})


    
        if(!updatedPassword)
        {
            res.status(400).json({message:"User Password is not updated",success:false})
        }

        res.status(200).send("password updated successfully")
  
        
    } catch (error) {
        res.status(500).json({message:error.message ,success:false})
    }
}




const updateProfile=async(req,res)=>{

    try {

       

        const {id}=req.params

    
        const updatedUser=await Users.findByIdAndUpdate({_id:id},req.body,{new:true})

        
    
        if(!updatedUser){
            res.status(400).json({message:"User Profile not found with the given id",success:false})
        }

        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({message:error.message ,success:false})
    }


}

const deleteParticularUser=async(req,res)=>{

    try {

        const {id}=req.params

        const deleteUser=await Users.findByIdAndDelete({_id:id})

        

        if(!deleteUser){
            res.status(400).json({message:"User Profile not found with the given id",success:false})
        }

        res.status(200).json({message:"user is deleted successfully",success:true})

        
    } catch (error) {
        res.status(500).json({message:error.message ,success:false})
    }


}


module.exports={login,register,getAllUsers,updateProfile,deleteParticularUser,getUser,updatePassword,logout};


