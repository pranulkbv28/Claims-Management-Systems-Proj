import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    // if (req.cookie.jwt === undefined) {
    //   console.log("The cookie is undefined");
    // }

    const token = req.cookies?.jwt;

    // console.log("This is the token: ", token);

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(401).json({
        error: "No such User Found!!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("ERROR IN PROTECTED_ROUTE!: ", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default protectedRoute;
