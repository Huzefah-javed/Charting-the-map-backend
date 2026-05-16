import jwt from "jsonwebtoken"


export const jwtVerification = (req, res, next)=>{
    const jwtCookie = req.cookies.authCookie
    if (jwtCookie) {
    try {
        const token = jwt.verify(jwtCookie, process.env.JWT_SECRET)
        req.user = token
        return next()
    } catch (error) {
        error.status=401
        error.msg="This cookie is not valid"
        return next(error)
    }
    }else{
       const msg = "Unauthorized, No cookie found"
       const status = 401
       return next({msg, status})
    }    
    }