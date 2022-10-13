import { Router } from 'express';
import { getUrlById, openUrl, shortenUrl } from '../controllers/urlsController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import urlSchema from '../schemas/urlSchema.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateToken, validateSchema(urlSchema), shortenUrl);
urlsRouter.get('/urls/:id', getUrlById);
urlsRouter.get('/urls/open/:shortUrl', openUrl);

export default urlsRouter;