import { Books } from "../../schema/Books.schema.js";

export const adminBooksModel = async (pageNo) => {
  pageNo = (Number(pageNo) - 1) * 20;
  let result;
  try {
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
    result = { success: true, status: 200, msg: "succuss", data:data[0] };
  } catch (error) {
    result = { success: false, status: 500, msg: "failed to Get data" };
  }
  return result;
};
