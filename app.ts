import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
dotenv.config();

import profileApi from './apis/profile';
import followApi from './apis/follow';
import channelApi from './apis/channel';
import AppDataSource from './dataSource';

const app = express();
const port = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to db');
  })
  .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  next();
});
app.use('/api/profile', profileApi);
app.use('/api/follow', followApi);
app.use('/api/channel', channelApi);

app.listen(port, () => console.log(`Server is running on port ${port}`));
