
import { GetCountryTotalReview } from "../../model/main/getcountryTotalRev.js"
import { asyncWrapper } from "../../utils/asyncWrapper.js"

export const CountryTotalRev=asyncWrapper(async(req, res, next)=>{

   let response = await GetCountryTotalReview()
      let countryData={}
       response.forEach((data)=>{
          countryData[data._id] = data.totalReviews
       })

       response = countryData
   return res.status(200).json({ success: true, data: response });
})