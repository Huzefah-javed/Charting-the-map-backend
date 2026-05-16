
export const logoutController=async(req, res, next)=>{
    res.clearCookie("authCookie")
   return res.json({msg:"logout successfully"})
}