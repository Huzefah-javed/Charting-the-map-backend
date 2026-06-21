import { Books } from "../../schema/Books.schema.js";

export const adminTagsModel = async () => {
  const data = await Books.aggregate([
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        totalTags: { $sum: 1 },
      },
    },
    {
      $project: {
        totalGenre: "$totalTags",
      },
    },
  ]);
  if (data.length === 0) new AppError("No data found", 401);
  return data;
};
