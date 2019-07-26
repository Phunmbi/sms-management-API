import express from 'express';
import cors from 'cors';

// create new express instance
const app = express();

// setup express middleware
express.json();
express.urlencoded({ extended:false });
app.use(cors());

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found. Use /api/v1 to access the Api'
  });
});

export default app;
