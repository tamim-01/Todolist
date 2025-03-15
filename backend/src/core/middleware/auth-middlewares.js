import { jwtValidate } from "../auth/jwt-auth.js";

const authValidationMiddleware = (req, res, next) => {
  try {
    // Read the token from cookies
    const jwtToken = req.cookies.token;

    if (!jwtToken) {
      throw new Error("JWT Token is missing!");
    }

    // Validate the token and decode its payload
    const tokenData = jwtValidate(jwtToken);

    // Attach the decoded token data to the request object
    req.user = tokenData;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: error.message });
  }
};

export { authValidationMiddleware };
