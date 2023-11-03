import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Restaurant from './Restaurant.js';

const Review = sequelize.define('Review', {

  reviewid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   key: 'userid'
    // }
  },
  username: DataTypes.STRING,
  restaurantid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: 'restaurantid',
    }
  },
  rating: DataTypes.FLOAT,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  comment: DataTypes.TEXT,
  price: DataTypes.INTEGER
}, {
  timestamps: false,
  tableName: 'reviews'
});


export default Review;