import Router from "express";
import {auth,logout,fetchData,getData} from "../controllers/user.controller.js"
import {authUser} from "../middleware/auth.middlware.js"
const router = Router()


router.route("/auth").post( auth)
router.route("/logout").post(authUser,logout)
router.route("/user").get(authUser,fetchData)
router.route("/getData").get(getData)




export default router