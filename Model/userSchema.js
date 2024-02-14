const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    username:{
         type:String,
         require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
       
    },
    link:{
        type:String
        

    },
    profile:{
        type:String
       
    }
})

const users = moongose.model('users',userSchema)

module.exports=users