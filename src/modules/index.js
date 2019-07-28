import UserRouter from './User';

const apiPrefix = '/api/v1';

//aggregate all routes here
const routes = [
  UserRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
