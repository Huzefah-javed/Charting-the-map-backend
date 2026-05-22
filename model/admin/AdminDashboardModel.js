import { Books } from "../../schema/Books.schema.js";

export const adminDashboardModel = async () => {
  let result;
  try {
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
    result = { success: true, status: 200, data:data[0] };
  } catch (error) {
    result = {
      success: false,
      status: 500,
      msg: "something went wrong while getting book data",
    };
  }
  return result;
};

