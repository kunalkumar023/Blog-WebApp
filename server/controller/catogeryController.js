import categoryModel from "../models/categoryModel.js"

class CatogeryController{
    static getAllCategories= async (req,res)=>{
        // console.log(req.user)
        const fetchallcategories = await categoryModel.find({});
        res.status(200).json({
            fetchallcategories,
        })
    };

    static addCategory= async (req,res)=>{
        const {title} = req.body;
        const newcategory = new categoryModel({
            title
        });
        const savecategory = await newcategory.save();
        if(savecategory)
        {
            res.status(200).json({
                message:"Category added successfully"
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"can't added"
            })
        }
    }
}

export default CatogeryController;