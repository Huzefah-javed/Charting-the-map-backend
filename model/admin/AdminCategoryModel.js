import { Books } from "../../schema/Books.schema.js";

export const adminCategoryModel = async () => {
    const data = await Books.aggregate([
      {
        $facet: {
          totalGenre: [
            {
              $group: {
                _id: "$genre",
                totalReviews: { $sum: 1 },
                avgRating:{$avg: '$rating'}
              },
            },
          ],
          totalBooks: [
            {
              $group: {
                _id: null,
                totalReviews: { $sum: 1 },
              },
            },
          ],

        },
      },
      {
        $project: {
          totalBooks: {
            $arrayElemAt: ["$totalBooks.totalReviews", 0],
          },
          totalGenre:"$totalGenre"
         },
      },
    ]);
        if(data.length === 0) new AppError("No more category data found", 401)
  return data[0];
};