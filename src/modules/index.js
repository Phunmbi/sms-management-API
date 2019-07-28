import HomeRouter from './Home';
import UserRouter from './User';
import ContactRouter from './Contact';
import MessageRouter from './Message';

const apiPrefix = '/api/v1';

//aggregate all routes here
const routes = [
  HomeRouter,
  UserRouter,
  ContactRouter,
  MessageRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
