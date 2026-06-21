import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const adminBooksModel = async (pageNo) => {
  pageNo = (Number(pageNo) - 1) * 20;
    const data = await Books.aggregate([
      {
        $facet: {
          totalBooks: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
              },
            },
          ],
          BookData: [{ $skip: pageNo },{ $limit: 20 }],
        },
      },
      {
        $project: {
          totalBooks: { $arrayElemAt: ["$totalBooks.total", 0] },
          bookData: {
            $map: {
              input: "$BookData",
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
