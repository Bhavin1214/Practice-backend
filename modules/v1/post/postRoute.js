import express from "express";
import {createPost , updatePost, soft_delete, P_delete, getAllPost,getMyPost,getOtherPost,likeDislike,rePost } from "./postController.js"

const router = express.Router();

router.post("/createPost",createPost);
router.post("/updatePost",updatePost);
router.post("/softDelete",soft_delete);
router.post("/p_delete",P_delete);
router.get("/getAllPost",getAllPost);
router.get("/getMyPost",getMyPost);
router.get('/getOtherPost',getOtherPost);
router.get("/likeDislike",likeDislike);
router.post("/rePost",rePost);

export default router;