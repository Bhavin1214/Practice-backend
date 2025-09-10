import express from "express"
import { signup , login, logout,getProfile, profileUpdate,soft_delete,p_delete} from "../controllers/authcontroller.js";
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/userProfile",getProfile)
router.post("/profileUpdate",profileUpdate)
router.post("/softDelete",soft_delete)
router.post("/p_delete",p_delete)

export default router