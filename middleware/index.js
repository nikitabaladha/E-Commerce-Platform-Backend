const jwt = require("jsonwebtoken");

const secretKey = "12345";

function middleware(req, res, next) {
  const accessToken = req.headers.access_token;

  if (!accessToken) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Please provide a valid access token",
    });
  }

  try {
    const userDetails = jwt.verify(accessToken, secretKey);

    if (!userDetails) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Access token expired or invalid",
      });
    }

    req.user = userDetails;
    next();
  } catch (error) {
    console.error("Error decrypting access token:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to process access token",
    });
  }
}

module.exports = middleware;
