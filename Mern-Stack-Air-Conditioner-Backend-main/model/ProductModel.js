const mongoose=require("mongoose")


const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter the product name"]
    },
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    images:[{
        type:String
    }],
    isFeatured:{
        type:Boolean
    },
    stock:{
        type:Number,
        required:true
    },
    highLightText:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    colours:[
        {
            type:String,
            required:true
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
},{
    timestamps:true
});


const Products=mongoose.model("Products",ProductSchema);


module.exports=Products