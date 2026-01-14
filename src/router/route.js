import Router from "express";
import auth from "../controllers/user.controller.js"

const router = Router()


router.route("/auth").post(auth)




export default router