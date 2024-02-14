const appMiddleware=(req,res,next)=>{
     console.log("inside appMiddleware");
     next()
}

module.exports = appMiddleware