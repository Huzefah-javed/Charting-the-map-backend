import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const getFavBookModel = async (userId, pageNo) => {

  pageNo = (pageNo - 1) * 20;

    const userObjId = new mongoose.Types.ObjectId(userId);
    const data = await UserFavorite.aggregate([
      { $match: { userId: userObjId } },
      {
        $lookup: {
          localField: "bookId",
          from: "books_reviews",
          foreignField: "_id",
          as: "book_data",
        },
      },
      { $unwind: "$book_data" },
      {
        $facet: {
          totalFavBookCount:[{$group:{_id:null, total:{$sum:1}}}],
          paginationData: [{ $skip: pageNo }, { $limit: 20 }],
          metaData:[{
              $group: {
                _id: "$book_data.genre",
                count: { $sum: 1 },                
              }
            },
            { $sort: { count: -1 } },
          ]
        },
        
      },
      {$project:{
        "paginationData.userId":0,
        "paginationData.bookId":0,
        "paginationData.createdAt":0,
        "paginationData.updatedAt":0,
        "paginationData.book_data.review_html":0,
        "paginationData.book_data.category":0,
        "paginationData.book_data.category":0,
        "paginationData.book_data.languages":0,
        "paginationData.book_data.review_date":0,
        "paginationData.book_data.tags":0,
        "paginationData.book_data.countries":0,
        "paginationData.book_data.book_url":0,
        "totalFavBookCount._id":0
      }}
    ]);
    
    if(data.length === 0) new AppError("No more data found")
  return data[0];
};
