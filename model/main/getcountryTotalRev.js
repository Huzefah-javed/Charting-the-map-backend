import { Books } from "../../schema/Books.schema.js"

export const GetCountryTotalReview=async()=>{
    let result;
    try {

          const data =  await Books.aggregate([
                { $unwind: "$countries" },
                {$group:{
                    _id:"$countries",
                    totalReviews: { $sum: 1 }
                }}
            ])
            result = { success: true, status: 200, msg: "succuss", data };
        } catch (error) {
            result = { success: false, status: 500, msg: "Failed to get data" };     
    }
    return result
}