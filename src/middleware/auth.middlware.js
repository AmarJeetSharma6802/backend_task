import UserData from "../model/user.model.js";
import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Token" });
    }

    const decoded = jwt.verify(token, process.env.ACCESSTOKEN);

    const user = await UserData.findById(decoded.user_id).select(
      "-password -refreshToken -__v"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
