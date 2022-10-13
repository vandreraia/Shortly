import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser
} from '../controllers/userController.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import signinSchema from '../schemas/signinSchema.js';
import signupSchema from '../schemas/signupSchema.js';

const userRouter = Router();

userRouter.post('/signin', validateSchema(signinSchema), getUser);
userRouter.get('/users/me', getUsers);
userRouter.post('/signup', validateSchema(signupSchema), createUser);

export default userRouter;