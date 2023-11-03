import Review from '../models/Review.js';
import { sequelize } from '../config/db.js';

export default class ReviewsDAO {
  
  static async addReview(restaurantId, userName, userId, reviewText, date) {
    try {
      const reviewDoc = {
        username: userName,
        userid: userId,
        date: date,
        comment: reviewText,
        restaurantid: restaurantId
      };
      
      return await Review.create(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await Review.update(
        { comment: text, date: date },
        { where: { reviewid: reviewId, userid: userId } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await Review.destroy({
        where: { reviewid: reviewId, userid: userId }
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
