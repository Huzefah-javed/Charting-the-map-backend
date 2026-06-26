import { client } from "../../config/redis.config.js";
import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const GetCountryTotalReview = async () => {

   const result = await client.get("reviewPerCountry")
    if(result) return JSON.parse(result);
      

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

  if (data.length === 0) throw new AppError("No data found", 401);
  await client.set("reviewPerCountry", JSON.stringify(data))
  return data;
};
