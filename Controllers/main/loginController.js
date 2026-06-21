import { assignJWTCookie } from "../../cookies/assignCookie.js"
import { login } from "../../model/main/login.model.js"
import { asyncWrapper } from "../../utils/asyncWrapper.js"

export const loginController=asyncWrapper(async(req, res, next)=>{
    const {email,password, role} = req.body
    const response = await login(email, password, role)
    assignJWTCookie(response, res)
   return res.status(200).json({msg:"Login successful", data:response})
})
