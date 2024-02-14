const projects = require('../Model/projectSchema')

exports.adduserproject=async(req,res)=>{
    console.log("inside at user project");
    // res.status(200).json("add")
    const userId=req.payload
    const {title,language,github,link,overview} = req.body
    projectImage = req.file.filename

    try{
        const existingproject = await projects.findOne({github})
        if(existingproject){
            res.status(404).json('project already exist')
        }else{
           const newproject = new projects({title,language,github,link,overview,projectImage,userId}) 
           await newproject.save()
           res.status(200).json(newproject)
        }
    }
          catch(err){
        res.status(404).json({message:err.message})
    }
}

exports.getUserProject = async(req,res)=>{
    const userId = req.payload
    try{
        const userProject = await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}

exports.getAllProjects = async(req,res)=>{
    const searchKey=req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const AllProject = await projects.find(query)
        res.status(200).json(AllProject)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
exports.getHomeProject = async(req,res)=>{
    try{
        const HomeProject = await projects.find().limit(3)
        res.status(200).json(HomeProject)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}

exports.editProject = async(req,res)=>{
    const {title,language,github,link,overview,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage;
    const userId=req.payload;
    const {id}=req.params
    try{
         const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
          await updateProject.save()
          res.status(200).json(updateProject)
    }

    catch(err){
        res.status(401).json(err)
    }

}

exports.deleteProject = async(req,res)=>{
    const {id}=req.params
    try{
         const deleteData = await projects.findByIdAndDelete({_id:id})
          res.status(200).json(deleteData)
    }

    catch(err){
        res.status(401).json(err)
    }

}