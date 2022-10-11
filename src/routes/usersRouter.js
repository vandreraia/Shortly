import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser
} from '../controllers/userController.js';
import { validateUser } from '../middlewares/userValidator.js';

const userRouter = Router();

userRouter.get('/signin', getUser);
userRouter.get('/users/me', getUsers);
userRouter.post('/signup', validateUser, createUser);

export default userRouter;