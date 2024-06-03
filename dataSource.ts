import { DataSource } from 'typeorm';
import Profile from './entities/profile';
import Follow from './entities/follow';
import Notification from './entities/notification';
import Channel from './entities/channel';
import Comment from './entities/comment';
import Role from './entities/role';

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: false,
  logging: true,
  entities: [
    Profile,
    Follow,
    Notification,
    Channel,
    Comment,
    Role,
  ],
  subscribers: [],
  migrations: ['./migrations/*'],
});

export default AppDataSource;
