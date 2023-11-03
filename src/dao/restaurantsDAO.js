import {sequelize, Op} from '../config/db.js';
import Restaurant from '../models/Restaurant.js'; 

export default class RestaurantsDAO {
  
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    try {
      let whereClause = {};
  
      if (filters) {
        if ("name" in filters) {
          whereClause.name = { [Op.like]: `%${filters.name}%` };
        } else if ("cuisine" in filters) {
          whereClause.cuisine = filters.cuisine;
        } else if ("zipcode" in filters) {
          whereClause.postalcode = filters.zipcode;
        }
      }
  
      const restaurants = await Restaurant.findAll({
        where: whereClause,
        limit: restaurantsPerPage,
        offset: restaurantsPerPage * page
      });
  
      const totalNumRestaurants = await Restaurant.count({ where: whereClause });
  
      return { restaurantsList: restaurants, totalNumRestaurants };
    } catch (e) {
      console.error(`Unable to get restaurants, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
  

  static async getRestaurantByID(id) {
    try {
      const restaurant = await Restaurant.findByPk(id, {
        include: 'reviews' // Assuming you've set up associations correctly
      });
      return restaurant;
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }
  

  static async getCuisines() {
    try {
      const distinctCuisines = await Restaurant.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('cuisine')), 'cuisine']]
      });
      return distinctCuisines.map(row => row.cuisine);
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return [];
    }
  }
  
}
