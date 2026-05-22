import { Books } from "../../schema/Books.schema.js";

export const adminCategoryModel = async () => {
  let result;
  try {
    const data = await Books.aggregate([
      {
        $facet: {
          totalGenre: [
            {
              $group: {
                _id: "$genre",
                totalReviews: { $sum: 1 },
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