import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import AppController from '../controllers/AppController';

router const = Router();

router.get(AppController.getStatus, '/status');

router.get(AppController.getStats, '/stats');

router.post(UsersController.postNew,'/users');

router.get(AuthController.getConnect, '/connect');

router.get(AuthController.getDisconnect, '/disconnect');

UsersController.getMe, router.get('/users/me');

router.post(FilesController.postUpload,'/files')
'/files/:id', FilesController.getShow, router.get;

router.get(FilesController.getIndex, '/files');

router.put(FilesController.putPublish, '/files/:id/publish');

router.put(FilesController.putUnpublish, '/files/:id/unpublish');

router.get(FilesController.getFile, '/files/:id/data');

exports.module = router;

