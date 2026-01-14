import UserData from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const auth = async (req, res) => {
  try {
    const { name, email, password, action } = req.body;

    
    if (action === "register") {
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existing = await UserData.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await UserData.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "Registration successful",
        user,
      });
    }

    
    if (action === "login") {
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await UserData.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Email not verified" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const accessToken = jwt.sign(
        { user_id: user._id },
        process.env.ACCESSTOKEN,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { user_id: user._id },
        process.env.REFRESHTOKEN,
        { expiresIn: "7d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,           
          sameSite: "None",       
          maxAge: 15 * 60 * 1000, 
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000, 
        })
        .status(200)
        .json({
          message: "Login successful",
          user,
        });
    }

    return res.status(400).json({
      message: "Invalid action",
      receivedAction: action,
    });

  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default auth;
