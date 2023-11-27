const Products=require("../model/ProductModel")

const Category=require("../model/CategoryModel")

const Review =require("../model/ReviewModel")


const getAllProducts=async(req,res)=>{

    try{

        let filter={}

        if(req.query.category){
            filter={category: req.query.category.split(',')} 
        }

         const products= await Products.find(filter).populate('category');

         if(!products){
            return res.status(400).json({message:"Products items Not Found",success:false})
         }

         res.status(200).json(products)      
    }
    catch(error){
            
 
        res.status(500).json({message:error.message,success:false})
    }

}

const getParticularProduct=async(req,res)=>{

    try {

        const {id}=req.params


        const Product=await Products.findById({_id:id}).populate('category').populate({path:'reviews',select:'user comment',populate:{path:'user',select:'name email'}})


        if(!Product){
            return res.status(400).json({message:"Products Not FOund with given Id",success:false})
        }
   
   
        res.status(200).json(Product)
        
    }catch(error){
            
 
        res.status(500).json({message:error.message,success:false})
    }

}

const addMultipleProducts=async(req,res)=>{

    try {
        const products=await Products.insertMany(req.body)

        if(!products){
            res.status(400).json({message:"Product not stored"})
        }

        res.status(201).json({message:"products added succesfully",success:true})
        
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

const addProduct=async(req,res)=>{
    try {
        
        const categoryData=await Category.findById(req.body.category)

        if (!categoryData) {
            return res.status(400).json({message:"Invalid Category"})
        }
    

     const product=await Products.create(req.body)


     if(!product){
        return res.status(400).json({message:"Products Not added",success:false})
     }


     res.status(201).json({message:"product added succesfully",success:true})


    }catch(error){
            
 
        res.status(500).json({message:error.message,success:false})
    }

}

const deleteProduct=async(req,res)=>{
   
    try {

        const {id}=req.params


        const deletedProduct=await Products.findByIdAndDelete({_id:id})


        if(!deletedProduct){
            return res.status(400).json({message:"Products Not Deleted",success:false})
        }
   
   
        res.status(200).json({message:"product deleted succesfully",success:true})
        
    }catch(error){
            
 
        res.status(500).json({message:error.message,success:false})
    }

}

const updateProduct=async(req,res)=>{

    try {

        const {id}=req.params

        if(req.body.category){

        const CategoryData=await Category.findById({_id:req.body.category})


        if(!CategoryData){

            return res.status(400).json({message:"Invalid Category Updated"})
        }

       }


        const updatedProduct=await Products.findByIdAndUpdate({_id:id},req.body)


        if(!updatedProduct){
            return res.status(400).json({message:"Products Not updated",success:false})
        }
   
   
        res.status(200).json({message:"product updated succesfully",success:true})
        
    }catch(error){
            
 
        res.status(500).json({message:error.message,success:false})
    }

}


const addReview=async(req,res)=>{

    try {

        const {id} =req.params

        const user=req.user;


        const product=await Products.findById({_id:id})

        if(!product){
            return res.status(400).json({message:"Product Not Found with given Id",success:false})
        }
   


        req.body.user=user._id

        const addedReview=await Review.create(req.body)

        
        if(!addedReview){
            return res.status(400).json({message:" Review not added to the Product with given Id",success:false})
        }
   


        product.reviews.push(addedReview._id)


        const saved=await product.save()


        if(!saved){
            return res.status(400).json({message:"Product not updated with the review",success:false})
        }

        res.status(200).send(saved)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
    
}

const getFeaturedProduct=async(req,res)=>{

    try {

        const topProducts=await Products.find({isFeatured:true}).limit(3)

        if(!topProducts){
            return res.status(400).json({message:"feautured products not found",success:false})
        }
        
        res.status(200).send(topProducts)

    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

}

module.exports={getAllProducts,getParticularProduct,addProduct,deleteProduct,updateProduct,addReview,getFeaturedProduct,addMultipleProducts}