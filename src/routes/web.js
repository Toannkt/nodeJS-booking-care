import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) =>{
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);

    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayGetCrud);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD )
    router.get('/destroy-crud', homeController.destroyCRUD)


    router.post('/api/login', userController.handleLogin);
    return app.use('/', router);
}

module.exports = initWebRoutes;