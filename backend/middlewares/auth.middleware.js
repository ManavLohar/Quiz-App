import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token!",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("Error from verify token: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
