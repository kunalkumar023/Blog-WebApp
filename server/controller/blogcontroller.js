import authModel from "../models/authModel.js";
import blogModel from "../models/blogModel.js"

class BlogController{
    static getAllBlogs= async (req,res)=>{
        
        try {
            
            const fetchAllBlogs = await blogModel.find({})
            
            return res.status(200).json(fetchAllBlogs)
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
            })
        }
    };
    static addBlogs= async (req,res)=>{
        const {title,category,description} = req.body;
        try {
            if(title && category && description){
                const newblog= new blogModel({
                    title:title,
                    category:category,
                    description:description,
                    thumbnail: req.file.filename,
                    user:req.user._id,
                });
                const saveBlog = await newblog.save()
                if(saveBlog){
                    return res.status(200).json({
                        message:"Blog added successfully"
                    })
                }
            }
            else{
                return res.status(200).json({message:"all fields are required",
            "name":title,
             "cat":category,
            "des":description                   })
            }
        } catch (error) {
            return res.status(400).json({
                message:error.message,
            })
        }
    };
    static getSigleBlogs= async (req,res)=>{
        const {id} = req.params;
        
        try {
            if(id)
            {
                const fetchblog = await blogModel.findById(id);

                return res.status(200).json(fetchblog);
            }
            else{
                return res.status(400).json({
                    message:"invalid url"
                })
            }
        } catch (error) {
            return res.status(400).json({
                message:error.message
            })
        }
    }

}

export default BlogController;