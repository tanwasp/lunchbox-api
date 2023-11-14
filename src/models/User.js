import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    firebaseUid: {
        primaryKey: true,
        type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    dateJoined: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  });
  
