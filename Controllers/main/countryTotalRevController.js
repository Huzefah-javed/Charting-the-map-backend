
import { GetCountryTotalReview } from "../../model/main/getcountryTotalRev.js"

export const CountryTotalRev=async(req, res, next)=>{

   const response = await GetCountryTotalReview()
    if(!response.success) return next({status: response.status, msg:response.msg})
      const countryData={}
       response.data.forEach((data)=>{
          countryData[data._id] = data.totalReviews
       })

       response.data = countryData
  
  return res.json(response).status(response.status)

}