import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userName = req.body.name;
      const userId = req.body.user_id;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(restaurantId, userName, userId, review, date);
      if (reviewResponse && reviewResponse.reviewid) {
        res.json({ status: "success" });
      } else {
          throw new Error("Error adding review");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const userId = req.body.user_id;
      const date = new Date();

      const updatedRowCount = await ReviewsDAO.updateReview(reviewId, userId, text, date);

      if (updatedRowCount === 0) {
        throw new Error("Unable to update review - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;

      const deletedRowCount = await ReviewsDAO.deleteReview(reviewId, userId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete review or review not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
