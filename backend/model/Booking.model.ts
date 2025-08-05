
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User.model';

export const Booking = sequelize.define('Booking', {
  movie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theater: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seats: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
