import Router from "express";
import {auth,logout,fetchData,getData} from "../controllers/user.controller.js"
import {authUser} from "../middleware/auth.middlware.js"

import {CreateTask ,updateTaks,deleteTask} from "../controllers/task.controller.js"

const router = Router()


router.route("/auth").post( auth)
router.route("/logout").post(authUser,logout)
router.route("/user").get(authUser,fetchData)
router.route("/getData").get(getData)

// Task route 

router.route("/createTask").post(authUser ,CreateTask)
router.route("/updateTaks/:id").put(authUser ,updateTaks)
router.route("/deleteTask/:id").delete(authUser,deleteTask)


export default router