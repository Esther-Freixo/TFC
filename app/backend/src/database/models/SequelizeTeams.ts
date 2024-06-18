import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from './index';

class SequelizaTeams extends Model<InferAttributes<SequelizaTeams>,
InferCreationAttributes<SequelizaTeams>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizaTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default SequelizaTeams;
