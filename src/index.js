import app from './app';
import http from 'http';
import { port } from './config/environmentSetup';

const setPort = port || '3400';

app.set('port', setPort);

let server = http.createServer(app);

app.listen(setPort, () => {
  console.log(`App is now listening on port ${setPort}`)
});

export default server;
