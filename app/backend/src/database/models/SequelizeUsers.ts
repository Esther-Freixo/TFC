import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from './index';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

SequelizeUsers.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  } }, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default SequelizeUsers;
