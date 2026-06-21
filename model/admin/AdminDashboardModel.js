import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const adminDashboardModel = async () => {
    const data = await Books.aggregate([
      {
        $facet: {
          totalBooks: [
            {
              $group: {
                _id: null,
                totalReviews: { $sum: 1 },
              },
            },
          ],
          totalCountries: [
            { $unwind: "$countries" },
            {
              $group: {
                _id: "$countries",
                count: { $sum: 1 },
              },
            },
          ],
          averageRating: [
            {
              $group: {
                _id: null,
                average: { $avg: "$rating" },
              },
            },
          ],
          recentReviews: [{ $sort: { _id: -1 } }, { $limit: 5 }],
        },
      },
      {
        $project: {
          totalBooks: {
            $arrayElemAt: ["$totalBooks.totalReviews", 0],
          },
          totalCountries: { $size: "$totalCountries._id" },
          averageRating: {
            $arrayElemAt: ["$averageRating.average", 0],
          },
          recentReviews: {
            $map: {
              input: "$recentReviews",
              as: "review",

              in: {
                _id: "$$review._id",
                rating: "$$review.rating",
                title: "$$review.title",
                author: "$$review.author",
                genre: "$$review.genre",
                status: "$$review.status",
                publishYear: "$$review.publish_year",
              },
            },
          },
        },
      },
    ]);
    
        if(data.length === 0) new AppError("No more data found", 401)
  return data[0];
};

