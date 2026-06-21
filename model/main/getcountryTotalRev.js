import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const GetCountryTotalReview = async () => {
  const data = await Books.aggregate([
    { $match: { status: "publish" } },
    { $unwind: "$countries" },
    {
      $group: {
        _id: "$countries",
        totalReviews: { $sum: 1 },
      },
    },
  ]);
  if (data.length === 0) new AppError("No data found", 401);
  return data;
};
