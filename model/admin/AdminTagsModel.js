import { Books } from "../../schema/Books.schema.js";

export const adminTagsModel = async () => {
  let result;
  try {
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
    result = { success: true, status: 200, data
      
     };
  } catch (error) {
    result = {
      success: false,
      status: 500,
      msg: "something went wrong while getting book data",
    };
  }
  return result;
};
