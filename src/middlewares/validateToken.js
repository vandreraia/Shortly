import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send("Token inválido.");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = user;

    next();
  } catch (error) {
    res.status(401).send("Invalid format");
  }
}