import { sequelize } from '../config/db.js';
// import User from './User.js';
import Review from './Review.js';
import Restaurant from './Restaurant.js';

// Set up associations
// User.hasMany(Review, { foreignKey: 'userid' });
// Review.belongsTo(User, { foreignKey: 'userid' });

Restaurant.hasMany(Review, { foreignKey: 'restaurantid', as: 'reviews' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantid' });

// Export models and sequelize instance
export { sequelize, Review, Restaurant };
