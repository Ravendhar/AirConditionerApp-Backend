const Category =require("../model/CategoryModel")


const showAllCategory=async(req,res)=>{

    try {
        
        const categories=await Category.find()


        if(!categories){
           return res.status(400).json({message:"No categories Found",success:false})
        }

        res.status(200).json(categories)

    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
}

const getParticularCategory=async(req,res)=>{

    try {
        
        const {id}=req.params

        const category=await Category.findById({_id:id})

        if(!category){
            return res.status(400).json({message:"category Not Found With the Given Id",success:false})
         }
 
         res.status(200).json(category)

    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

}



const addCategory=async(req,res)=>{

    try {

        const addedCategory=await Category.create(req.body)


        if(!addedCategory)
        {
            return res.status(400).json({message:"Category Not Added Successfully",success:false})
        }
        
        res.status(201).json({message:"added successfully",success:true})

    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
}



const updateCategory=async(req,res)=>{

    try {
        
        const {id}=req.params

        const updatedCategory=await Category.findByIdAndUpdate({_id:id},req.body,{new:true})

        if(!updatedCategory){
            return res.status(400).json({message:"category Not Found With the Given Id",success:false})
         }
 
         res.status(200).json({message:"updated successfully",success:true})

    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
}

const deleteCategory=async(req,res)=>{

    try {
        
        const {id}=req.params

        const deletedCategory=await Category.findByIdAndDelete({_id:id},req.body,{new:true})

        if(!deletedCategory){
            return res.status(400).json({message:"category Not Found With the Given Id",success:false})
         }
 
         res.status(200).json({message:"deleted successfully",success:true})

    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
}


module.exports={addCategory,deleteCategory,updateCategory,showAllCategory,getParticularCategory}


