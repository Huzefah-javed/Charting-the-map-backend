import { asyncWrapper } from "../../utils/asyncWrapper.js"

export const logoutController=asyncWrapper(async(req, res, next)=>{
    res.clearCookie("authCookie")
   return res.json({msg:"logout successfully"})
})