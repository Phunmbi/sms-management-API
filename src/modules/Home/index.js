import express from 'express';
import HomeController from './HomeController'

const HomeRouter = express.Router();

HomeRouter.get(
  '/',
  HomeController.home
);

export default HomeRouter;
