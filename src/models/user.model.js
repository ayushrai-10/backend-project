import mongoose, {Schema} from "mongoose";

import jwt from "jsonwebtoken";

import bcypt from "bcryptjs";


const userSchema = new Schema({
username : {
    type : String,
    required : true,
    unique : true,
    index : true,
    lowercase : true,
    trim : true



},
email: {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true



},
avatar : {
    type : String, // cloudinary url
    required : true,

},
coverimage : {
    type : String, // cloudinary url
    
},

watchHistory : [{
    type : Schema.types.objectId,
    ref : "watchhistory"
}
],
password : {
    type : String,
    required : [true, "password is required"]
},
refreshToken : {
    type : String,

}
},


{
    timestamps : true
})

userSchema.pre("save", async function(next){
    if(!this.ismodified("password")) return next()
    this.password  = bcrypt.hashSync(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname,


        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
           

        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
}
export const user = mongoose.model("User" , userSchema)