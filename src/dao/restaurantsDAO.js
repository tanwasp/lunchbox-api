import {sequelize, Op} from '../config/db.js';
import Restaurant from '../models/Restaurant.js'; 

export default class RestaurantsDAO {
  
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
    longitude = null,
    latitude = null,
    maxDistance = null // in kilometers
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

      // Add location filter if longitude, latitude, and maxDistance are provided
      // Add location filter if longitude, latitude, and maxDistance are provided
      if (longitude !== null && latitude !== null && maxDistance !== null) {
        whereClause[Op.and] = sequelize.where(
          sequelize.cast(sequelize.col('coordinates'), 'geography'),
          sequelize.fn(
            'ST_DWithin',
            sequelize.cast(sequelize.col('coordinates'), 'geography'),
            sequelize.cast(
              sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint', longitude, latitude), 4326),
              'geography'
            ),
            maxDistance * 1000 // Convert kilometers to meters
          ),
          true
        );
      }

      
  //   const restaurants = await sequelize.query(`
  //   SELECT
  //     "restaurantid",
  //     "foreignresid",
  //     "name",
  //     "address",
  //     "city",
  //     "state",
  //     "country",
  //     "postalcode",
  //     "coordinates",
  //     "stars",
  //     "pricerange",
  //     "cuisine"
  //   FROM
  //     "restaurants"
  //   WHERE
  //     ST_DWithin(
  //       CAST("coordinates" AS GEOGRAPHY),
  //       ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::GEOGRAPHY,
  //       :maxDistance * 1000
  //     )
  //   ORDER BY
  //     ST_Distance(
  //       CAST("coordinates" AS GEOGRAPHY),
  //       ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::GEOGRAPHY
  //     ) ASC
  //   LIMIT :limit OFFSET :offset
  // `, {
  //   replacements: {
  //     longitude,
  //     latitude,
  //     maxDistance,,
  //     limit: restaurantsPerPage,
  //     offset: restaurantsPerPage * page,
  //   },
  //   type: sequelize.QueryTypes.SELECT
  // });

      console.log('Querying with where clause:', whereClause);
  
      const restaurants = await Restaurant.findAll({
        where: whereClause,
        // Add raw order clause
        // order: sequelize.literal('ST_Distance(coordinates, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)) ASC'),
        limit: restaurantsPerPage,
        offset: restaurantsPerPage * page,
        // Bind longitude and latitude values to the query
        // replacements: { longitude, latitude },
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
