import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    Title:{
        type:String,
        required:true
    },
    Content:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true,
        enum:["Public","Private"],
        default:"Public"
    },
    Likes:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    Reposts : [{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }],
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const Post = mongoose.model("Post",postModel);
export default Post