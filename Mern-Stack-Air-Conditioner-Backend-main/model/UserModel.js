const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is Required"],
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is Required"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"Phone Number is Required"]
    },
    role:{
        type:String,
        default:''
    }
}
);


userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();

    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.statics.login= async function(email,password){

    const user= await Users.findOne({email});

    if(user){

        const auth=await bcrypt.compare(password,user.password);

        if(auth){
            return user;
        }
        throw Error("incorrect password");
    }

    throw Error("incorrect Email");

}



const Users=mongoose.model("Users",userSchema);


module.exports=Users;



