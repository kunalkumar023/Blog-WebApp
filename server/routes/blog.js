import  express from "express";
import AuthController from "../controller/authcontroller.js";
import BlogController from "../controller/blogcontroller.js";
import CatogeryController from "../controller/catogeryController.js";
import multer from "multer";
import checkuser from "../middleware/authMiddleware.js"

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'public/upload/');
        
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now}-${file.originalname}`)
    }
})

const upload = multer({storage:storage});
const router = express.Router();


router.post("/user/register",AuthController.userRegistration)
router.post("/user/login",AuthController.userLogin)


router.get("/get/allblogs",checkuser,BlogController.getAllBlogs)
router.post("/add/blog",checkuser,upload.single("thumbnail"),BlogController.addBlogs)
router.get("/get/blog/:id",checkuser,BlogController.getSigleBlogs)


router.get("/get/allcategories",checkuser,CatogeryController.getAllCategories)
router.post("/add/category",checkuser,CatogeryController.addCategory)

export default router;