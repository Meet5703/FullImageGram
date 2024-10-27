import { verifyToken } from "../utils/JWT.js";
//auth with headers
/*export const aunthenticate = (req, res, next) => {
  const user = req.headers["x-access-token"];

  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const verifyUser = verifyToken(user);
  req.user = verifyUser;

  next();
};
*/

//auth with cookies
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = verifyToken(token);
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};
