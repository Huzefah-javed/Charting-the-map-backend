import jwt from "jsonwebtoken";

export  function assignJWTCookie(data, res){
   const payload={
    _id: data._id.toString(),
    name:data.name,
    email:data.email,
    role:data.role
   }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

   return res.cookie("authCookie", token, {
        httpOnly: true,           
         secure: true,      
         sameSite: "none", 
         path: "/",
        maxAge: 3 * 60 * 60 * 1000  
    })
}