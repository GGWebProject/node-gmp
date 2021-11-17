import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

const dbOptions = {
  dbName: process.env.DB_NAME,
  dbUrl: process.env.DB_URL,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};

const { dbName, dbUrl, dbPort, dbUser, dbPassword } = dbOptions;

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbUrl}:${dbPort}/${dbName}`,
);

export interface IUserModelAttributes {
  user_id: number;
  login: string;
  password: string;
  age: number;
}

interface IUserModelCreationAttributes
  extends Optional<IUserModelAttributes, 'user_id'> {}

export class UserModel extends Model<
  IUserModelAttributes,
  IUserModelCreationAttributes
> {}

UserModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user', tableName: 'users', timestamps: false },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('all is fine');
  })
  .then(async () => {
    await UserModel.sync();
  })
  .catch(console.log);
