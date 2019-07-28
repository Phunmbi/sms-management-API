import UserRouter from './User';
import ContactRouter from './Contact';

const apiPrefix = '/api/v1';

//aggregate all routes here
const routes = [
  UserRouter,
  ContactRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
