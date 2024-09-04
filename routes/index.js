// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, authenticateWithXToken } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  api.get('/connect', basicAuthenticate, AuthController.getConnect);
  api.get('/disconnect', authenticateWithXToken, AuthController.getDisconnect);

  api.post('/users', UsersController.postNew);
  api.get('/users/me', authenticateWithXToken, UsersController.getMe);

  api.post('/files', authenticateWithXToken, FilesController.postUpload);
  api.get('/files/:id', authenticateWithXToken, FilesController.getShow);
  api.get('/files', authenticateWithXToken, FilesController.getIndex);
  api.put('/files/:id/publish', authenticateWithXToken, FilesController.putPublish);
  api.put('/files/:id/unpublish', authenticateWithXToken, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);

  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  api.use(errorResponse);
};

export default injectRoutes;
