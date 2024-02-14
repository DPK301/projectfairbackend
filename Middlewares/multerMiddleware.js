const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    const allowMimeTypes=["image/png","image/jpeg","image/jpg"];
    if(allowMimeTypes.includes(file.mimetype)){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('invalid file type... must be png or jpeg or jpg'))
    }
} 

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig