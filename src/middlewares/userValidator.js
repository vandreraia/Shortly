import userSchema from "../schemas/usersSchema.js";

export function validateUser(req, res, next) {
  const user = req.body;
  const validation = userSchema.validate(user);
  if (user.password !== user.confirmPassword) {
    return res.sendStatus(422);
  }
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}