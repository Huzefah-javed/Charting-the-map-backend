import { assignJWTCookie } from "../../cookies/assignCookie.js"
import { login } from "../../model/main/login.model.js"

export const loginController=async(req, res, next)=>{
    const {email,password, role} = req.body
    const response = await login(email, password, role)
    if (!response.success) return next({status:response.status, msg:response.msg})
    assignJWTCookie(response.data, res)
   return res.status(response.status).json({msg:response.msg, data:response.data})
}
