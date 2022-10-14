import { Router } from 'express';
import { deleteUrls, getRank, getUrlById, openUrl, shortenUrl } from '../controllers/urlsController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import urlSchema from '../schemas/urlSchema.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateToken, validateSchema(urlSchema), shortenUrl);
urlsRouter.get('/urls/:id', getUrlById);
urlsRouter.get('/urls/open/:shortUrl', openUrl);
urlsRouter.delete('/urls/:id', validateToken, deleteUrls)
urlsRouter.get('/ranking', validateToken, getRank)

export default urlsRouter;